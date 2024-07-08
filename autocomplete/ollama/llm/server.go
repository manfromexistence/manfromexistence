package llm

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"log/slog"
	"math/rand"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/ollama/ollama/api"
	"github.com/ollama/ollama/format"
	"github.com/ollama/ollama/gpu"
)

// LlamaServer is an instance of the llama.cpp server
type LlamaServer struct {
	port    int
	cmd     *exec.Cmd
	done    chan error // Channel to signal when the process exits
	status  *StatusWriter
	options api.Options
}

func NewLlamaServer(model string, adapters, projectors []string, opts api.Options) (*LlamaServer, error) {
	f, err := os.Open(model)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	ggml, _, err := DecodeGGML(f)
	if err != nil {
		return nil, err
	}

	if opts.NumCtx > int(ggml.KV().ContextLength()) {
		slog.Warn("requested context length is greater than model max context length", "requested", opts.NumCtx, "model", ggml.KV().ContextLength())
		opts.NumCtx = int(ggml.KV().ContextLength())
	}

	if opts.NumCtx < 4 {
		opts.NumCtx = 4
	}

	memoryAvailable, _ := gpu.CheckVRAM()
	info := gpu.GetGPUInfo()

	memoryMinimum := info.MinimumMemory
	for _, projector := range projectors {
		memoryMinimum += projectorMemoryRequirements(projector)

		// multimodal models require at least 2048 context
		opts.NumCtx = max(opts.NumCtx, 2048)
	}

	// fp16 k,v = (1 (k) + 1 (v)) * sizeof(float16) * n_ctx * n_layer * n_embd / n_head * n_head_kv
	var kv uint64 = 2 * 2 * uint64(opts.NumCtx) * ggml.KV().BlockCount() * ggml.KV().EmbeddingLength() / ggml.KV().HeadCount() * ggml.KV().HeadCountKV()

	graphPartialOffload, graphFullOffload := ggml.GraphSize(uint64(opts.NumCtx), uint64(min(opts.NumCtx, opts.NumBatch)))
	if graphPartialOffload == 0 {
		graphPartialOffload = ggml.KV().GQA() * kv / 6
	}

	if graphFullOffload == 0 {
		graphFullOffload = graphPartialOffload
	}

	// memoryRequiredTotal represents the memory required for full GPU offloading (all layers)
	memoryRequiredTotal := memoryMinimum + graphFullOffload

	// memoryRequiredPartial represents the memory required for partial GPU offloading (n > 0, n < layers)
	memoryRequiredPartial := memoryMinimum + graphPartialOffload

	if info.Library != "metal" {
		if memoryRequiredPartial > memoryAvailable {
			info.Library = "cpu"
		}
	}

	var layerCount int
	layers := ggml.Tensors().Layers()
	for i := 0; i < int(ggml.KV().BlockCount()); i++ {
		memoryLayer := layers[fmt.Sprintf("%d", i)].size()

		// KV is proportional to the number of layers
		memoryLayer += kv / ggml.KV().BlockCount()

		memoryRequiredTotal += memoryLayer
		if memoryAvailable > memoryRequiredPartial+memoryLayer {
			memoryRequiredPartial += memoryLayer
			layerCount++
		}
	}

	memoryLayerOutput := layers["output"].size()
	memoryRequiredTotal += memoryLayerOutput
	if memoryAvailable > memoryRequiredTotal {
		layerCount = int(ggml.KV().BlockCount()) + 1
		memoryRequiredPartial = memoryRequiredTotal
	}

	if opts.NumGPU < 0 {
		opts.NumGPU = layerCount
	}

	slog.Info(
		"offload to gpu",
		"reallayers", opts.NumGPU,
		"layers", layerCount,
		"required", format.HumanBytes2(memoryRequiredTotal),
		"used", format.HumanBytes2(memoryRequiredPartial),
		"available", format.HumanBytes2(memoryAvailable),
		"kv", format.HumanBytes2(kv),
		"fulloffload", format.HumanBytes2(graphFullOffload),
		"partialoffload", format.HumanBytes2(graphPartialOffload),
	)

	if len(adapters) > 1 {
		return nil, errors.New("ollama supports only one lora adapter, but multiple were provided")
	}

	availableServers := availableServers()
	servers := serversForGpu(info)

	demandLib := os.Getenv("OLLAMA_LLM_LIBRARY")
	if demandLib != "" {
		serverPath := availableServers[demandLib]
		if serverPath == "" {
			slog.Info(fmt.Sprintf("Invalid OLLAMA_LLM_LIBRARY %s - not found", demandLib))
		} else {
			slog.Info("user override", "OLLAMA_LLM_LIBRARY", demandLib, "path", serverPath)
			servers = []string{demandLib}
		}
	}

	if len(servers) == 0 {
		return nil, fmt.Errorf("no servers found for %v", info)
	}

	params := []string{
		"--model", model,
		"--ctx-size", fmt.Sprintf("%d", opts.NumCtx),
		"--batch-size", fmt.Sprintf("%d", opts.NumBatch),
		"--embedding",
	}
	if debug := os.Getenv("OLLAMA_DEBUG"); debug != "" {
		params = append(params, "--log-format", "json")
	} else {
		params = append(params, "--log-disable")
	}

	if opts.NumGPU >= 0 {
		params = append(params, "--n-gpu-layers", fmt.Sprintf("%d", opts.NumGPU))
	}

	if debug := os.Getenv("OLLAMA_DEBUG"); debug != "" {
		params = append(params, "--verbose")
	}

	if opts.MainGPU > 0 {
		params = append(params, "--main-gpu", fmt.Sprintf("%d", opts.MainGPU))
	}

	if len(adapters) > 0 {
		// TODO: applying multiple adapters is not supported by the llama.cpp server yet
		params = append(params, "--lora", adapters[0])
	}

	if len(projectors) > 0 {
		// TODO: applying multiple projectors is not supported by the llama.cpp server yet
		params = append(params, "--mmproj", projectors[0])
	}

	if opts.NumThread > 0 {
		params = append(params, "--threads", fmt.Sprintf("%d", opts.NumThread))
	}

	if !opts.F16KV {
		params = append(params, "--memory-f32")
	}

	if opts.UseMLock {
		params = append(params, "--mlock")
	}

	if !opts.UseMMap {
		params = append(params, "--no-mmap")
	}

	if opts.UseNUMA {
		params = append(params, "--numa")
	}

	// Loop through potential servers
	var finalErr error
	for i := 0; i < len(servers); i++ {
		dir := availableServers[servers[i]]

		// Find an availableServers  port, retry on each iterration in case the failure was a port conflict race
		port := 0
		if a, err := net.ResolveTCPAddr("tcp", "localhost:0"); err == nil {
			var l *net.TCPListener
			if l, err = net.ListenTCP("tcp", a); err == nil {
				port = l.Addr().(*net.TCPAddr).Port
				l.Close()
			}
		}
		if port == 0 {
			slog.Debug("ResolveTCPAddr failed ", "error", err)
			port = rand.Intn(65535-49152) + 49152 // get a random port in the ephemeral range
		}
		finalParams := append(params, "--port", strconv.Itoa(port))

		pathEnv := "LD_LIBRARY_PATH"
		if runtime.GOOS == "windows" {
			pathEnv = "PATH"
		}
		// append the server directory to LD_LIBRARY_PATH/PATH
		libraryPaths := []string{dir}
		if libraryPath, ok := os.LookupEnv(pathEnv); ok {
			// Append our runner directory to the path
			// This will favor system libraries over our bundled library dependencies
			libraryPaths = append(filepath.SplitList(libraryPath), libraryPaths...)
		}

		server := filepath.Join(dir, "ollama_llama_server")
		if runtime.GOOS == "windows" {
			server = server + ".exe"
		}

		s := &LlamaServer{
			port:    port,
			cmd:     exec.Command(server, finalParams...),
			status:  NewStatusWriter(os.Stderr),
			options: opts,
		}
		libEnv := fmt.Sprintf("%s=%s", pathEnv, strings.Join(libraryPaths, string(filepath.ListSeparator)))
		slog.Debug(libEnv)
		s.cmd.Env = append(os.Environ(), libEnv)
		s.cmd.Stdout = os.Stdout
		s.cmd.Stderr = s.status

		slog.Info("starting llama server", "cmd", s.cmd.String())

		if err = s.cmd.Start(); err != nil {
			msg := ""
			if s.status != nil && s.status.LastErrMsg != "" {
				msg = s.status.LastErrMsg
			}
			err = fmt.Errorf("error starting the external llama server: %v %s", err, msg)
			finalErr = err
			continue
		}

		// reap subprocess when it exits
		go func() {
			// Exit status managed via getServerStatus
			_ = s.cmd.Wait()
		}()

		return s, nil
	}

	slog.Error("unable to load any llama server", "error", finalErr)
	return nil, finalErr
}

func projectorMemoryRequirements(filename string) uint64 {
	file, err := os.Open(filename)
	if err != nil {
		return 0
	}
	defer file.Close()

	ggml, _, err := DecodeGGML(file)
	if err != nil {
		return 0
	}

	var mem uint64
	for _, layer := range ggml.Tensors().Layers() {
		mem += layer.size()
	}

	return mem
}

type ServerStatus int

const ( // iota is reset to 0
	ServerStatusReady ServerStatus = iota
	ServerStatusNoSlotsAvaialble
	ServerStatusLoadingModel
	ServerStatusNotResponding
	ServerStatusError
)

type ServerStatusResp struct {
	Status          string `json:"status"`
	SlotsIdle       int    `json:"slots_idle"`
	SlotsProcessing int    `json:"slots_processing"`
	Error           string `json:"error"`
}

func (s *LlamaServer) getServerStatus(ctx context.Context) (ServerStatus, error) {
	// Fail fast if its exited
	if s.cmd.ProcessState != nil {
		msg := ""
		if s.status != nil && s.status.LastErrMsg != "" {
			msg = s.status.LastErrMsg
		}
		return ServerStatusError, fmt.Errorf("llama runner process no longer running: %d %s", s.cmd.ProcessState.ExitCode(), msg)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, fmt.Sprintf("http://127.0.0.1:%d/health", s.port), nil)
	if err != nil {
		return ServerStatusError, fmt.Errorf("error creating GET request: %v", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return ServerStatusNotResponding, fmt.Errorf("server not responding")
		}
		return ServerStatusError, fmt.Errorf("health resp: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return ServerStatusError, fmt.Errorf("read health request: %w", err)
	}

	var status ServerStatusResp
	if err := json.Unmarshal(body, &status); err != nil {
		return ServerStatusError, fmt.Errorf("health unmarshal encode response: %w", err)
	}

	switch status.Status {
	case "ok":
		return ServerStatusReady, nil
	case "no slot available":
		return ServerStatusNoSlotsAvaialble, nil
	case "loading model":
		return ServerStatusLoadingModel, nil
	default:
		return ServerStatusError, fmt.Errorf("server error: %+v", status)
	}
}

func (s *LlamaServer) Ping(ctx context.Context) error {
	_, err := s.getServerStatus(ctx)
	if err != nil {
		slog.Debug("server unhealthy", "error", err)
		return err
	}
	return nil
}

func (s *LlamaServer) WaitUntilRunning() error {
	start := time.Now()
	// TODO we need to wire up a better way to detect hangs during model load and startup of the server
	expiresAt := time.Now().Add(10 * time.Minute) // be generous with timeout, large models can take a while to load
	ticker := time.NewTicker(50 * time.Millisecond)
	defer ticker.Stop()

	slog.Info("waiting for llama runner to start responding")
	var lastStatus ServerStatus = -1
	for {
		select {
		case err := <-s.done:
			msg := ""
			if s.status != nil && s.status.LastErrMsg != "" {
				msg = s.status.LastErrMsg
			}
			return fmt.Errorf("llama runner process has terminated: %v %s", err, msg)
		case <-ticker.C:
			if time.Now().After(expiresAt) {
				// timeout
				msg := ""
				if s.status != nil && s.status.LastErrMsg != "" {
					msg = s.status.LastErrMsg
				}
				return fmt.Errorf("timed out waiting for llama runner to start: %s", msg)
			}
			if s.cmd.ProcessState != nil {
				msg := ""
				if s.status != nil && s.status.LastErrMsg != "" {
					msg = s.status.LastErrMsg
				}
				return fmt.Errorf("llama runner process no longer running: %d %s", s.cmd.ProcessState.ExitCode(), msg)
			}

			ctx, cancel := context.WithTimeout(context.Background(), 200*time.Millisecond)
			defer cancel()
			status, err := s.getServerStatus(ctx)
			if err != nil && lastStatus != status {
				slog.Debug("server not yet available", "error", err)
				lastStatus = status
				continue
			}

			switch status {
			case ServerStatusLoadingModel:
				// TODO - this state never seems to happen with the current server.cpp code (bug?)
				// it doesn't respond to the health endpoint until after the model is loaded
				slog.Debug("loading model")
			case ServerStatusReady:
				slog.Debug(fmt.Sprintf("llama runner started in %f seconds", time.Since(start).Seconds()))
				return nil
			}
		}
	}
}

const jsonGrammar = `
root   ::= object
value  ::= object | array | string | number | ("true" | "false" | "null") ws

object ::=
  "{" ws (
            string ":" ws value
    ("," ws string ":" ws value)*
  )? "}" ws

array  ::=
  "[" ws (
            value
    ("," ws value)*
  )? "]" ws

string ::=
  "\"" (
    [^"\\] |
    "\\" (["\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) # escapes
  )* "\"" ws

number ::= ("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? ws

# Optional space: by convention, applied in this grammar after literal chars when allowed
ws ::= ([ \t\n] ws)?
`

const maxBufferSize = 512 * format.KiloByte
const maxRetries = 3

type ImageData struct {
	Data []byte `json:"data"`
	ID   int    `json:"id"`
}

type completion struct {
	Content string `json:"content"`
	Model   string `json:"model"`
	Prompt  string `json:"prompt"`
	Stop    bool   `json:"stop"`

	Timings struct {
		PredictedN  int     `json:"predicted_n"`
		PredictedMS float64 `json:"predicted_ms"`
		PromptN     int     `json:"prompt_n"`
		PromptMS    float64 `json:"prompt_ms"`
	}
}

type CompletionRequest struct {
	Prompt  string
	Format  string
	Images  []ImageData
	Options api.Options
}

type CompletionResponse struct {
	Content            string
	Done               bool
	PromptEvalCount    int
	PromptEvalDuration time.Duration
	EvalCount          int
	EvalDuration       time.Duration
}

func (s *LlamaServer) Completion(ctx context.Context, req CompletionRequest, fn func(CompletionResponse)) error {
	request := map[string]any{
		"prompt":            req.Prompt,
		"stream":            true,
		"n_predict":         req.Options.NumPredict,
		"n_keep":            req.Options.NumKeep,
		"main_gpu":          req.Options.MainGPU,
		"temperature":       req.Options.Temperature,
		"top_k":             req.Options.TopK,
		"top_p":             req.Options.TopP,
		"tfs_z":             req.Options.TFSZ,
		"typical_p":         req.Options.TypicalP,
		"repeat_last_n":     req.Options.RepeatLastN,
		"repeat_penalty":    req.Options.RepeatPenalty,
		"presence_penalty":  req.Options.PresencePenalty,
		"frequency_penalty": req.Options.FrequencyPenalty,
		"mirostat":          req.Options.Mirostat,
		"mirostat_tau":      req.Options.MirostatTau,
		"mirostat_eta":      req.Options.MirostatEta,
		"penalize_nl":       req.Options.PenalizeNewline,
		"seed":              req.Options.Seed,
		"stop":              req.Options.Stop,
		"image_data":        req.Images,
		"cache_prompt":      true,
	}

	// Make sure the server is ready
	status, err := s.getServerStatus(ctx)
	if err != nil {
		return err
	} else if status != ServerStatusReady {
		return fmt.Errorf("unexpected server status: %d", status)
	}

	if req.Format == "json" {
		request["grammar"] = jsonGrammar
		if !strings.Contains(strings.ToLower(req.Prompt), "json") {
			slog.Warn("Prompt does not specify that the LLM should response in JSON, but JSON format is expected. For best results specify that JSON is expected in the system prompt.")
		}
	}

	retryDelay := 100 * time.Microsecond
	for retries := 0; retries < maxRetries; retries++ {
		if retries > 0 {
			time.Sleep(retryDelay) // wait before retrying
			retryDelay *= 2        // exponential backoff
		}

		// Handling JSON marshaling with special characters unescaped.
		buffer := &bytes.Buffer{}
		enc := json.NewEncoder(buffer)
		enc.SetEscapeHTML(false)

		if err := enc.Encode(request); err != nil {
			return fmt.Errorf("failed to marshal data: %v", err)
		}

		endpoint := fmt.Sprintf("http://127.0.0.1:%d/completion", s.port)
		req, err := http.NewRequestWithContext(ctx, http.MethodPost, endpoint, buffer)
		if err != nil {
			return fmt.Errorf("error creating POST request: %v", err)
		}
		req.Header.Set("Content-Type", "application/json")

		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			return fmt.Errorf("POST predict: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode >= 400 {
			bodyBytes, err := io.ReadAll(resp.Body)
			if err != nil {
				return fmt.Errorf("failed reading llm error response: %w", err)
			}
			log.Printf("llm predict error: %s", bodyBytes)
			return fmt.Errorf("%s", bodyBytes)
		}

		scanner := bufio.NewScanner(resp.Body)
		buf := make([]byte, 0, maxBufferSize)
		scanner.Buffer(buf, maxBufferSize)

		retryNeeded := false
		// keep track of the last token generated, this is used to abort if the model starts looping
		var lastToken string
		var tokenRepeat int

		for scanner.Scan() {
			select {
			case <-ctx.Done():
				// This handles the request cancellation
				return ctx.Err()
			default:
				line := scanner.Bytes()
				if len(line) == 0 {
					continue
				}

				// try again on slot unavailable
				if bytes.Contains(line, []byte("slot unavailable")) {
					retryNeeded = true
					break
				}

				evt, ok := bytes.CutPrefix(line, []byte("data: "))
				if !ok {
					return fmt.Errorf("error parsing llm response stream: %s", line)
				}

				var c completion
				if err := json.Unmarshal(evt, &c); err != nil {
					return fmt.Errorf("error unmarshaling llm prediction response: %v", err)
				}

				switch {
				case strings.TrimSpace(c.Content) == lastToken:
					tokenRepeat++
				default:
					lastToken = strings.TrimSpace(c.Content)
					tokenRepeat = 0
				}

				// 30 picked as an arbitrary max token repeat limit, modify as needed
				if tokenRepeat > 30 {
					slog.Debug("prediction aborted, token repeat limit reached")
					return ctx.Err()
				}

				if c.Content != "" {
					fn(CompletionResponse{
						Content: c.Content,
					})
				}

				if c.Stop {
					fn(CompletionResponse{
						Done:               true,
						PromptEvalCount:    c.Timings.PromptN,
						PromptEvalDuration: parseDurationMs(c.Timings.PromptMS),
						EvalCount:          c.Timings.PredictedN,
						EvalDuration:       parseDurationMs(c.Timings.PredictedMS),
					})
					return nil
				}
			}
		}

		if err := scanner.Err(); err != nil {
			if strings.Contains(err.Error(), "unexpected EOF") {
				s.Close()
				msg := ""
				if s.status != nil && s.status.LastErrMsg != "" {
					msg = s.status.LastErrMsg
				}

				return fmt.Errorf("an unknown error was encountered while running the model %s", msg)
			}
			return fmt.Errorf("error reading llm response: %v", err)
		}

		if !retryNeeded {
			return nil // success
		}
	}

	// should never reach here ideally
	return fmt.Errorf("max retries exceeded")
}

type EmbeddingRequest struct {
	Content string `json:"content"`
}

type EmbeddingResponse struct {
	Embedding []float64 `json:"embedding"`
}

func (s *LlamaServer) Embedding(ctx context.Context, prompt string) ([]float64, error) {
	// Make sure the server is ready
	status, err := s.getServerStatus(ctx)
	if err != nil {
		return nil, err
	} else if status != ServerStatusReady {
		return nil, fmt.Errorf("unexpected server status: %d", status)
	}

	data, err := json.Marshal(TokenizeRequest{Content: prompt})
	if err != nil {
		return nil, fmt.Errorf("error marshaling embed data: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, fmt.Sprintf("http://127.0.0.1:%d/embedding", s.port), bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("error creating embed request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do embedding request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading embed response: %w", err)
	}

	if resp.StatusCode >= 400 {
		log.Printf("llm encode error: %s", body)
		return nil, fmt.Errorf("%s", body)
	}

	var embedding EmbeddingResponse
	if err := json.Unmarshal(body, &embedding); err != nil {
		return nil, fmt.Errorf("unmarshal tokenize response: %w", err)
	}

	return embedding.Embedding, nil
}

type TokenizeRequest struct {
	Content string `json:"content"`
}

type TokenizeResponse struct {
	Tokens []int `json:"tokens"`
}

func (s *LlamaServer) Tokenize(ctx context.Context, content string) ([]int, error) {
	// Make sure the server is ready
	status, err := s.getServerStatus(ctx)
	if err != nil {
		return nil, err
	} else if status != ServerStatusReady {
		return nil, fmt.Errorf("unexpected server status: %d", status)
	}

	data, err := json.Marshal(TokenizeRequest{Content: content})
	if err != nil {
		return nil, fmt.Errorf("marshaling encode data: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, fmt.Sprintf("http://127.0.0.1:%d/tokenize", s.port), bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("encode request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do encode request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read encode request: %w", err)
	}

	if resp.StatusCode >= 400 {
		log.Printf("llm encode error: %s", body)
		return nil, fmt.Errorf("%s", body)
	}

	var encoded TokenizeResponse
	if err := json.Unmarshal(body, &encoded); err != nil {
		return nil, fmt.Errorf("unmarshal encode response: %w", err)
	}

	return encoded.Tokens, nil
}

type DetokenizeRequest struct {
	Tokens []int `json:"tokens"`
}

type DetokenizeResponse struct {
	Content string `json:"content"`
}

func (s *LlamaServer) Detokenize(ctx context.Context, tokens []int) (string, error) {
	// Make sure the server is ready
	status, err := s.getServerStatus(ctx)
	if err != nil {
		return "", err
	} else if status != ServerStatusReady {
		return "", fmt.Errorf("unexpected server status: %d", status)
	}

	data, err := json.Marshal(DetokenizeRequest{Tokens: tokens})
	if err != nil {
		return "", fmt.Errorf("marshaling decode data: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, fmt.Sprintf("http://127.0.0.1:%d/detokenize", s.port), bytes.NewBuffer(data))
	if err != nil {
		return "", fmt.Errorf("decode request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("do decode request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("read decode request: %w", err)
	}

	if resp.StatusCode >= 400 {
		log.Printf("llm decode error: %s", body)
		return "", fmt.Errorf("%s", body)
	}

	var decoded DetokenizeResponse
	if err := json.Unmarshal(body, &decoded); err != nil {
		return "", fmt.Errorf("unmarshal encode response: %w", err)
	}

	return decoded.Content, nil
}

func (s *LlamaServer) Close() error {
	if s.cmd != nil {
		slog.Debug("stopping llama server")
		return s.cmd.Process.Kill()
	}

	return nil
}

func parseDurationMs(ms float64) time.Duration {
	dur, err := time.ParseDuration(fmt.Sprintf("%fms", ms))
	if err != nil {
		panic(err)
	}

	return dur
}
