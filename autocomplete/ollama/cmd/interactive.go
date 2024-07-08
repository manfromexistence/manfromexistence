package cmd

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"github.com/spf13/cobra"
	"golang.org/x/exp/slices"

	"github.com/ollama/ollama/api"
	"github.com/ollama/ollama/progress"
	"github.com/ollama/ollama/readline"
)

type MultilineState int

const (
	MultilineNone MultilineState = iota
	MultilinePrompt
	MultilineSystem
	MultilineTemplate
)

func loadModel(cmd *cobra.Command, opts *runOptions) error {
	client, err := api.ClientFromEnvironment()
	if err != nil {
		return err
	}

	p := progress.NewProgress(os.Stderr)
	defer p.StopAndClear()

	spinner := progress.NewSpinner("")
	p.Add("", spinner)

	showReq := api.ShowRequest{Name: opts.Model}
	showResp, err := client.Show(cmd.Context(), &showReq)
	if err != nil {
		return err
	}
	opts.MultiModal = slices.Contains(showResp.Details.Families, "clip")
	opts.ParentModel = showResp.Details.ParentModel

	if len(showResp.Messages) > 0 {
		opts.Messages = append(opts.Messages, showResp.Messages...)
	}

	chatReq := &api.ChatRequest{
		Model:    opts.Model,
		Messages: []api.Message{},
	}
	err = client.Chat(cmd.Context(), chatReq, func(resp api.ChatResponse) error {
		p.StopAndClear()
		if len(opts.Messages) > 0 {
			for _, msg := range opts.Messages {
				switch msg.Role {
				case "user":
					fmt.Printf(">>> %s\n", msg.Content)
				case "assistant":
					state := &displayResponseState{}
					displayResponse(msg.Content, opts.WordWrap, state)
					fmt.Println()
					fmt.Println()
				}
			}
		}
		return nil
	})
	if err != nil {
		return err
	}

	return nil
}

func generateInteractive(cmd *cobra.Command, opts runOptions) error {
	opts.Messages = make([]api.Message, 0)

	err := loadModel(cmd, &opts)
	if err != nil {
		return err
	}

	usage := func() {
		fmt.Fprintln(os.Stderr, "Available Commands:")
		fmt.Fprintln(os.Stderr, "  /set            Set session variables")
		fmt.Fprintln(os.Stderr, "  /show           Show model information")
		fmt.Fprintln(os.Stderr, "  /load <model>   Load a session or model")
		fmt.Fprintln(os.Stderr, "  /save <model>   Save your current session")
		fmt.Fprintln(os.Stderr, "  /bye            Exit")
		fmt.Fprintln(os.Stderr, "  /?, /help       Help for a command")
		fmt.Fprintln(os.Stderr, "  /? shortcuts    Help for keyboard shortcuts")
		fmt.Fprintln(os.Stderr, "")
		fmt.Fprintln(os.Stderr, "Use \"\"\" to begin a multi-line message.")

		if opts.MultiModal {
			fmt.Fprintf(os.Stderr, "Use %s to include .jpg or .png images.\n", filepath.FromSlash("/path/to/file"))
		}

		fmt.Fprintln(os.Stderr, "")
	}

	usageSet := func() {
		fmt.Fprintln(os.Stderr, "Available Commands:")
		fmt.Fprintln(os.Stderr, "  /set parameter ...     Set a parameter")
		fmt.Fprintln(os.Stderr, "  /set system <string>   Set system message")
		fmt.Fprintln(os.Stderr, "  /set template <string> Set prompt template")
		fmt.Fprintln(os.Stderr, "  /set history           Enable history")
		fmt.Fprintln(os.Stderr, "  /set nohistory         Disable history")
		fmt.Fprintln(os.Stderr, "  /set wordwrap          Enable wordwrap")
		fmt.Fprintln(os.Stderr, "  /set nowordwrap        Disable wordwrap")
		fmt.Fprintln(os.Stderr, "  /set format json       Enable JSON mode")
		fmt.Fprintln(os.Stderr, "  /set noformat          Disable formatting")
		fmt.Fprintln(os.Stderr, "  /set verbose           Show LLM stats")
		fmt.Fprintln(os.Stderr, "  /set quiet             Disable LLM stats")
		fmt.Fprintln(os.Stderr, "")
	}

	usageShortcuts := func() {
		fmt.Fprintln(os.Stderr, "Available keyboard shortcuts:")
		fmt.Fprintln(os.Stderr, "  Ctrl + a            Move to the beginning of the line (Home)")
		fmt.Fprintln(os.Stderr, "  Ctrl + e            Move to the end of the line (End)")
		fmt.Fprintln(os.Stderr, "   Alt + b            Move back (left) one word")
		fmt.Fprintln(os.Stderr, "   Alt + f            Move forward (right) one word")
		fmt.Fprintln(os.Stderr, "  Ctrl + k            Delete the sentence after the cursor")
		fmt.Fprintln(os.Stderr, "  Ctrl + u            Delete the sentence before the cursor")
		fmt.Fprintln(os.Stderr, "")
		fmt.Fprintln(os.Stderr, "  Ctrl + l            Clear the screen")
		fmt.Fprintln(os.Stderr, "  Ctrl + c            Stop the model from responding")
		fmt.Fprintln(os.Stderr, "  Ctrl + d            Exit ollama (/bye)")
		fmt.Fprintln(os.Stderr, "")
	}

	usageShow := func() {
		fmt.Fprintln(os.Stderr, "Available Commands:")
		fmt.Fprintln(os.Stderr, "  /show info         Show details for this model")
		fmt.Fprintln(os.Stderr, "  /show license      Show model license")
		fmt.Fprintln(os.Stderr, "  /show modelfile    Show Modelfile for this model")
		fmt.Fprintln(os.Stderr, "  /show parameters   Show parameters for this model")
		fmt.Fprintln(os.Stderr, "  /show system       Show system message")
		fmt.Fprintln(os.Stderr, "  /show template     Show prompt template")
		fmt.Fprintln(os.Stderr, "")
	}

	// only list out the most common parameters
	usageParameters := func() {
		fmt.Fprintln(os.Stderr, "Available Parameters:")
		fmt.Fprintln(os.Stderr, "  /set parameter seed <int>             Random number seed")
		fmt.Fprintln(os.Stderr, "  /set parameter num_predict <int>      Max number of tokens to predict")
		fmt.Fprintln(os.Stderr, "  /set parameter top_k <int>            Pick from top k num of tokens")
		fmt.Fprintln(os.Stderr, "  /set parameter top_p <float>          Pick token based on sum of probabilities")
		fmt.Fprintln(os.Stderr, "  /set parameter num_ctx <int>          Set the context size")
		fmt.Fprintln(os.Stderr, "  /set parameter temperature <float>    Set creativity level")
		fmt.Fprintln(os.Stderr, "  /set parameter repeat_penalty <float> How strongly to penalize repetitions")
		fmt.Fprintln(os.Stderr, "  /set parameter repeat_last_n <int>    Set how far back to look for repetitions")
		fmt.Fprintln(os.Stderr, "  /set parameter num_gpu <int>          The number of layers to send to the GPU")
		fmt.Fprintln(os.Stderr, "  /set parameter stop \"<string>\", ...   Set the stop parameters")
		fmt.Fprintln(os.Stderr, "")
	}

	scanner, err := readline.New(readline.Prompt{
		Prompt:         ">>> ",
		AltPrompt:      "... ",
		Placeholder:    "Send a message (/? for help)",
		AltPlaceholder: `Use """ to end multi-line input`,
	})
	if err != nil {
		return err
	}

	fmt.Print(readline.StartBracketedPaste)
	defer fmt.Printf(readline.EndBracketedPaste)

	var sb strings.Builder
	var multiline MultilineState

	for {
		line, err := scanner.Readline()
		switch {
		case errors.Is(err, io.EOF):
			fmt.Println()
			return nil
		case errors.Is(err, readline.ErrInterrupt):
			if line == "" {
				fmt.Println("\nUse Ctrl + d or /bye to exit.")
			}

			scanner.Prompt.UseAlt = false
			sb.Reset()

			continue
		case err != nil:
			return err
		}

		switch {
		case multiline != MultilineNone:
			// check if there's a multiline terminating string
			before, ok := strings.CutSuffix(line, `"""`)
			sb.WriteString(before)
			if !ok {
				fmt.Fprintln(&sb)
				continue
			}

			switch multiline {
			case MultilineSystem:
				opts.System = sb.String()
				opts.Messages = append(opts.Messages, api.Message{Role: "system", Content: opts.System})
				fmt.Println("Set system message.")
				sb.Reset()
			case MultilineTemplate:
				opts.Template = sb.String()
				fmt.Println("Set prompt template.")
				sb.Reset()
			}

			multiline = MultilineNone
			scanner.Prompt.UseAlt = false
		case strings.HasPrefix(line, `"""`):
			line := strings.TrimPrefix(line, `"""`)
			line, ok := strings.CutSuffix(line, `"""`)
			sb.WriteString(line)
			if !ok {
				// no multiline terminating string; need more input
				fmt.Fprintln(&sb)
				multiline = MultilinePrompt
				scanner.Prompt.UseAlt = true
			}
		case scanner.Pasting:
			fmt.Fprintln(&sb, line)
			continue
		case strings.HasPrefix(line, "/list"):
			args := strings.Fields(line)
			if err := ListHandler(cmd, args[1:]); err != nil {
				return err
			}
		case strings.HasPrefix(line, "/load"):
			args := strings.Fields(line)
			if len(args) != 2 {
				fmt.Println("Usage:\n  /load <modelname>")
				continue
			}
			opts.Model = args[1]
			opts.Messages = []api.Message{}
			fmt.Printf("Loading model '%s'\n", opts.Model)
			if err := loadModel(cmd, &opts); err != nil {
				return err
			}
			continue
		case strings.HasPrefix(line, "/save"):
			args := strings.Fields(line)
			if len(args) != 2 {
				fmt.Println("Usage:\n  /save <modelname>")
				continue
			}

			client, err := api.ClientFromEnvironment()
			if err != nil {
				fmt.Println("error: couldn't connect to ollama server")
				return err
			}

			req := &api.CreateRequest{
				Name:      args[1],
				Modelfile: buildModelfile(opts),
			}
			fn := func(resp api.ProgressResponse) error { return nil }
			err = client.Create(cmd.Context(), req, fn)
			if err != nil {
				fmt.Println("error: couldn't save model")
				return err
			}
			fmt.Printf("Created new model '%s'\n", args[1])
			continue
		case strings.HasPrefix(line, "/set"):
			args := strings.Fields(line)
			if len(args) > 1 {
				switch args[1] {
				case "history":
					scanner.HistoryEnable()
				case "nohistory":
					scanner.HistoryDisable()
				case "wordwrap":
					opts.WordWrap = true
					fmt.Println("Set 'wordwrap' mode.")
				case "nowordwrap":
					opts.WordWrap = false
					fmt.Println("Set 'nowordwrap' mode.")
				case "verbose":
					if err := cmd.Flags().Set("verbose", "true"); err != nil {
						return err
					}
					fmt.Println("Set 'verbose' mode.")
				case "quiet":
					if err := cmd.Flags().Set("verbose", "false"); err != nil {
						return err
					}
					fmt.Println("Set 'quiet' mode.")
				case "format":
					if len(args) < 3 || args[2] != "json" {
						fmt.Println("Invalid or missing format. For 'json' mode use '/set format json'")
					} else {
						opts.Format = args[2]
						fmt.Printf("Set format to '%s' mode.\n", args[2])
					}
				case "noformat":
					opts.Format = ""
					fmt.Println("Disabled format.")
				case "parameter":
					if len(args) < 4 {
						usageParameters()
						continue
					}
					params := args[3:]
					fp, err := api.FormatParams(map[string][]string{args[2]: params})
					if err != nil {
						fmt.Printf("Couldn't set parameter: %q\n", err)
						continue
					}
					fmt.Printf("Set parameter '%s' to '%s'\n", args[2], strings.Join(params, ", "))
					opts.Options[args[2]] = fp[args[2]]
				case "system", "template":
					if len(args) < 3 {
						usageSet()
						continue
					}

					if args[1] == "system" {
						multiline = MultilineSystem
					} else if args[1] == "template" {
						multiline = MultilineTemplate
					}

					line := strings.Join(args[2:], " ")
					line, ok := strings.CutPrefix(line, `"""`)
					if !ok {
						multiline = MultilineNone
					} else {
						// only cut suffix if the line is multiline
						line, ok = strings.CutSuffix(line, `"""`)
						if ok {
							multiline = MultilineNone
						}
					}

					sb.WriteString(line)
					if multiline != MultilineNone {
						scanner.Prompt.UseAlt = true
						continue
					}

					if args[1] == "system" {
						opts.System = sb.String() // for display in modelfile
						newMessage := api.Message{Role: "system", Content: sb.String()}
						// Check if the slice is not empty and the last message is from 'system'
						if len(opts.Messages) > 0 && opts.Messages[len(opts.Messages)-1].Role == "system" {
							// Replace the last message
							opts.Messages[len(opts.Messages)-1] = newMessage
						} else {
							opts.Messages = append(opts.Messages, newMessage)
						}
						fmt.Println("Set system message.")
						sb.Reset()
					} else if args[1] == "template" {
						opts.Template = sb.String()
						fmt.Println("Set prompt template.")
						sb.Reset()
					}

					sb.Reset()
					continue
				default:
					fmt.Printf("Unknown command '/set %s'. Type /? for help\n", args[1])
				}
			} else {
				usageSet()
			}
		case strings.HasPrefix(line, "/show"):
			args := strings.Fields(line)
			if len(args) > 1 {
				client, err := api.ClientFromEnvironment()
				if err != nil {
					fmt.Println("error: couldn't connect to ollama server")
					return err
				}
				req := &api.ShowRequest{
					Name:     opts.Model,
					System:   opts.System,
					Template: opts.Template,
					Options:  opts.Options,
				}
				resp, err := client.Show(cmd.Context(), req)
				if err != nil {
					fmt.Println("error: couldn't get model")
					return err
				}

				switch args[1] {
				case "info":
					fmt.Println("Model details:")
					if len(resp.Details.Families) > 0 {
						fmt.Printf("Family              %s\n", strings.Join(resp.Details.Families, ", "))
					} else if resp.Details.Family != "" {
						fmt.Printf("Family              %s\n", resp.Details.Family)
					}
					fmt.Printf("Parameter Size      %s\n", resp.Details.ParameterSize)
					fmt.Printf("Quantization Level  %s\n", resp.Details.QuantizationLevel)
					fmt.Println("")
				case "license":
					if resp.License == "" {
						fmt.Println("No license was specified for this model.")
					} else {
						fmt.Println(resp.License)
					}
				case "modelfile":
					fmt.Println(resp.Modelfile)
				case "parameters":
					if resp.Parameters == "" {
						fmt.Println("No parameters were specified for this model.")
					} else {
						if len(opts.Options) > 0 {
							fmt.Println("User defined parameters:")
							for k, v := range opts.Options {
								fmt.Printf("%-*s %v\n", 30, k, v)
							}
							fmt.Println()
						}
						fmt.Println("Model defined parameters:")
						fmt.Println(resp.Parameters)
					}
				case "system":
					switch {
					case opts.System != "":
						fmt.Println(opts.System + "\n")
					case resp.System != "":
						fmt.Println(resp.System + "\n")
					default:
						fmt.Println("No system message was specified for this model.")
					}
				case "template":
					switch {
					case opts.Template != "":
						fmt.Println(opts.Template + "\n")
					case resp.Template != "":
						fmt.Println(resp.Template)
					default:
						fmt.Println("No prompt template was specified for this model.")
					}
				default:
					fmt.Printf("Unknown command '/show %s'. Type /? for help\n", args[1])
				}
			} else {
				usageShow()
			}
		case strings.HasPrefix(line, "/help"), strings.HasPrefix(line, "/?"):
			args := strings.Fields(line)
			if len(args) > 1 {
				switch args[1] {
				case "set", "/set":
					usageSet()
				case "show", "/show":
					usageShow()
				case "shortcut", "shortcuts":
					usageShortcuts()
				}
			} else {
				usage()
			}
		case strings.HasPrefix(line, "/exit"), strings.HasPrefix(line, "/bye"):
			return nil
		case strings.HasPrefix(line, "/"):
			args := strings.Fields(line)
			isFile := false

			if opts.MultiModal {
				for _, f := range extractFileNames(line) {
					if strings.HasPrefix(f, args[0]) {
						isFile = true
						break
					}
				}
			}

			if !isFile {
				fmt.Printf("Unknown command '%s'. Type /? for help\n", args[0])
				continue
			}

			sb.WriteString(line)
		default:
			sb.WriteString(line)
		}

		if sb.Len() > 0 && multiline == MultilineNone {
			newMessage := api.Message{Role: "user", Content: sb.String()}

			if opts.MultiModal {
				msg, images, err := extractFileData(sb.String())
				if err != nil {
					return err
				}

				// clear all previous images for better responses
				if len(images) > 0 {
					for i := range opts.Messages {
						opts.Messages[i].Images = nil
					}
				}

				newMessage.Content = msg
				newMessage.Images = images
			}

			opts.Messages = append(opts.Messages, newMessage)

			assistant, err := chat(cmd, opts)
			if err != nil {
				return err
			}
			if assistant != nil {
				opts.Messages = append(opts.Messages, *assistant)
			}

			sb.Reset()
		}
	}
}

func buildModelfile(opts runOptions) string {
	var mf strings.Builder
	model := opts.ParentModel
	if model == "" {
		model = opts.Model
	}
	fmt.Fprintf(&mf, "FROM %s\n", model)
	if opts.System != "" {
		fmt.Fprintf(&mf, "SYSTEM \"\"\"%s\"\"\"\n", opts.System)
	}

	if opts.Template != "" {
		fmt.Fprintf(&mf, "TEMPLATE \"\"\"%s\"\"\"\n", opts.Template)
	}

	keys := make([]string, 0)
	for k := range opts.Options {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	for _, k := range keys {
		fmt.Fprintf(&mf, "PARAMETER %s %v\n", k, opts.Options[k])
	}
	fmt.Fprintln(&mf)

	for _, msg := range opts.Messages {
		fmt.Fprintf(&mf, "MESSAGE %s \"\"\"%s\"\"\"\n", msg.Role, msg.Content)
	}

	return mf.String()
}

func normalizeFilePath(fp string) string {
	// Define a map of escaped characters and their replacements
	replacements := map[string]string{
		"\\ ":  " ",  // Escaped space
		"\\(":  "(",  // Escaped left parenthesis
		"\\)":  ")",  // Escaped right parenthesis
		"\\[":  "[",  // Escaped left square bracket
		"\\]":  "]",  // Escaped right square bracket
		"\\{":  "{",  // Escaped left curly brace
		"\\}":  "}",  // Escaped right curly brace
		"\\$":  "$",  // Escaped dollar sign
		"\\&":  "&",  // Escaped ampersand
		"\\;":  ";",  // Escaped semicolon
		"\\'":  "'",  // Escaped single quote
		"\\\\": "\\", // Escaped backslash
		"\\*":  "*",  // Escaped asterisk
		"\\?":  "?",  // Escaped question mark
	}

	for escaped, actual := range replacements {
		fp = strings.ReplaceAll(fp, escaped, actual)
	}
	return fp
}

func extractFileNames(input string) []string {
	// Regex to match file paths starting with optional drive letter, / ./ \ or .\ and include escaped or unescaped spaces (\ or %20)
	// and followed by more characters and a file extension
	// This will capture non filename strings, but we'll check for file existence to remove mismatches
	regexPattern := `(?:[a-zA-Z]:)?(?:\./|/|\\)[\S\\ ]+?\.(?i:jpg|jpeg|png|svg)\b`
	re := regexp.MustCompile(regexPattern)

	return re.FindAllString(input, -1)
}

func extractFileData(input string) (string, []api.ImageData, error) {
	filePaths := extractFileNames(input)
	var imgs []api.ImageData

	for _, fp := range filePaths {
		nfp := normalizeFilePath(fp)
		data, err := getImageData(nfp)
		if err != nil {
			if os.IsNotExist(err) {
				continue
			}
			fmt.Fprintf(os.Stderr, "Couldn't process image: %q\n", err)
			return "", imgs, err
		}
		fmt.Fprintf(os.Stderr, "Added image '%s'\n", nfp)
		input = strings.ReplaceAll(input, fp, "")
		imgs = append(imgs, data)
	}
	return input, imgs, nil
}

func getImageData(filePath string) ([]byte, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	buf := make([]byte, 512)
	_, err = file.Read(buf)
	if err != nil {
		return nil, err
	}

	contentType := http.DetectContentType(buf)
	allowedTypes := []string{"image/jpeg", "image/jpg", "image/png"}
	if !slices.Contains(allowedTypes, contentType) {
		return nil, fmt.Errorf("invalid image type: %s", contentType)
	}

	info, err := file.Stat()
	if err != nil {
		return nil, err
	}

	// Check if the file size exceeds 100MB
	var maxSize int64 = 100 * 1024 * 1024 // 100MB in bytes
	if info.Size() > maxSize {
		return nil, fmt.Errorf("file size exceeds maximum limit (100MB)")
	}

	buf = make([]byte, info.Size())
	_, err = file.Seek(0, 0)
	if err != nil {
		return nil, err
	}

	_, err = io.ReadFull(file, buf)
	if err != nil {
		return nil, err
	}

	return buf, nil
}
