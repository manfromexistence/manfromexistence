package llm

import (
	"encoding/binary"
	"errors"
	"fmt"
	"io"
	"strings"
)

type GGML struct {
	container
	model
}

const (
	fileTypeF32 uint32 = iota
	fileTypeF16
	fileTypeQ4_0
	fileTypeQ4_1
	fileTypeQ4_1_F16
	fileTypeQ8_0 uint32 = iota + 2
	fileTypeQ5_0
	fileTypeQ5_1
	fileTypeQ2_K
	fileTypeQ3_K_S
	fileTypeQ3_K_M
	fileTypeQ3_K_L
	fileTypeQ4_K_S
	fileTypeQ4_K_M
	fileTypeQ5_K_S
	fileTypeQ5_K_M
	fileTypeQ6_K
	fileTypeIQ2_XXS
	fileTypeIQ2_XS
	fileTypeQ2_K_S
	fileTypeQ3_K_XS
	fileTypeIQ3_XXS
)

func fileType(fileType uint32) string {
	switch fileType {
	case fileTypeF32:
		return "F32"
	case fileTypeF16:
		return "F16"
	case fileTypeQ4_0:
		return "Q4_0"
	case fileTypeQ4_1:
		return "Q4_1"
	case fileTypeQ4_1_F16:
		return "Q4_1_F16"
	case fileTypeQ8_0:
		return "Q8_0"
	case fileTypeQ5_0:
		return "Q5_0"
	case fileTypeQ5_1:
		return "Q5_1"
	case fileTypeQ2_K:
		return "Q2_K"
	case fileTypeQ3_K_S:
		return "Q3_K_S"
	case fileTypeQ3_K_M:
		return "Q3_K_M"
	case fileTypeQ3_K_L:
		return "Q3_K_L"
	case fileTypeQ4_K_S:
		return "Q4_K_S"
	case fileTypeQ4_K_M:
		return "Q4_K_M"
	case fileTypeQ5_K_S:
		return "Q5_K_S"
	case fileTypeQ5_K_M:
		return "Q5_K_M"
	case fileTypeQ6_K:
		return "Q6_K"
	case fileTypeIQ2_XXS:
		return "IQ2_XXS"
	case fileTypeIQ2_XS:
		return "IQ2_XS"
	case fileTypeQ2_K_S:
		return "Q2_K_S"
	case fileTypeQ3_K_XS:
		return "Q3_K_XS"
	case fileTypeIQ3_XXS:
		return "IQ3_XXS"
	default:
		return "unknown"
	}
}

type model interface {
	KV() KV
	Tensors() Tensors
}

type KV map[string]any

func (kv KV) u64(key string) uint64 {
	switch v := kv[key].(type) {
	case uint64:
		return v
	case uint32:
		return uint64(v)
	case float64:
		return uint64(v)
	default:
		return 0
	}
}

func (kv KV) Architecture() string {
	if s, ok := kv["general.architecture"].(string); ok {
		return s
	}

	return "unknown"
}

func (kv KV) ParameterCount() uint64 {
	return kv.u64("general.parameter_count")
}

func (kv KV) FileType() string {
	if u64 := kv.u64("general.file_type"); u64 > 0 {
		return fileType(uint32(u64))
	}

	return "unknown"
}

func (kv KV) BlockCount() uint64 {
	return kv.u64(fmt.Sprintf("%s.block_count", kv.Architecture()))
}

func (kv KV) HeadCount() uint64 {
	return kv.u64(fmt.Sprintf("%s.attention.head_count", kv.Architecture()))
}

func (kv KV) HeadCountKV() uint64 {
	if headCountKV := kv.u64(fmt.Sprintf("%s.attention.head_count_kv", kv.Architecture())); headCountKV > 0 {
		return headCountKV
	}

	return 1
}

func (kv KV) GQA() uint64 {
	return kv.HeadCount() / kv.HeadCountKV()
}

func (kv KV) EmbeddingLength() uint64 {
	return kv.u64(fmt.Sprintf("%s.embedding_length", kv.Architecture()))
}

func (kv KV) ContextLength() uint64 {
	return kv.u64(fmt.Sprintf("%s.context_length", kv.Architecture()))
}

type Tensors []*Tensor

func (ts Tensors) Layers() map[string]Layer {
	layers := make(map[string]Layer)
	for _, t := range ts {
		parts := strings.Split(t.Name, ".")
		if parts[0] == "blk" {
			parts = parts[1:]
		}

		if _, ok := layers[parts[0]]; !ok {
			layers[parts[0]] = make(Layer)
		}

		layers[parts[0]][strings.Join(parts[1:], ".")] = t
	}

	return layers
}

type Layer map[string]*Tensor

func (l Layer) size() (size uint64) {
	for _, t := range l {
		size += t.size()
	}

	return size
}

type Tensor struct {
	Name   string `json:"name"`
	Kind   uint32 `json:"kind"`
	Offset uint64 `json:"-"`

	// Shape is the number of elements in each dimension
	Shape []uint64 `json:"shape"`

	io.WriterTo `json:"-"`
}

func (t Tensor) blockSize() uint64 {
	switch {
	case t.Kind < 2:
		return 1
	case t.Kind < 10:
		return 32
	default:
		return 256
	}
}

func (t Tensor) typeSize() uint64 {
	blockSize := t.blockSize()

	switch t.Kind {
	case 0: // FP32
		return 4
	case 1: // FP16
		return 2
	case 2: // Q4_0
		return 2 + blockSize/2
	case 3: // Q4_1
		return 2 + 2 + blockSize/2
	case 6: // Q5_0
		return 2 + 4 + blockSize/2
	case 7: // Q5_1
		return 2 + 2 + 4 + blockSize/2
	case 8: // Q8_0
		return 2 + blockSize
	case 9: // Q8_1
		return 4 + 4 + blockSize
	case 10: // Q2_K
		return blockSize/16 + blockSize/4 + 2 + 2
	case 11: // Q3_K
		return blockSize/8 + blockSize/4 + 12 + 2
	case 12: // Q4_K
		return 2 + 2 + 12 + blockSize/2
	case 13: // Q5_K
		return 2 + 2 + 12 + blockSize/8 + blockSize/2
	case 14: // Q6_K
		return blockSize/2 + blockSize/4 + blockSize/16 + 2
	case 15: // Q8_K
		return 2 + blockSize + 2*blockSize/16
	case 16: // IQ2_XXS
		return 2 + 2*blockSize/8
	case 17: // IQ2_XS
		return 2 + 2*blockSize/8 + blockSize/32
	case 18: // IQ3_XXS
		return 2 + 3*blockSize/8
	default:
		return 0
	}
}

func (t Tensor) parameters() uint64 {
	var count uint64 = 1
	for _, n := range t.Shape {
		count *= n
	}
	return count
}

func (t Tensor) size() uint64 {
	return t.parameters() * t.typeSize() / t.blockSize()
}

type container interface {
	Name() string
	Decode(io.ReadSeeker) (model, error)
}

const (
	// Magic constant for `ggml` files (unversioned).
	FILE_MAGIC_GGML = 0x67676d6c
	// Magic constant for `ggml` files (versioned, ggmf).
	FILE_MAGIC_GGMF = 0x67676d66
	// Magic constant for `ggml` files (versioned, ggjt).
	FILE_MAGIC_GGJT = 0x67676a74
	// Magic constant for `ggla` files (LoRA adapter).
	FILE_MAGIC_GGLA = 0x67676C61
	// Magic constant for `gguf` files (versioned, gguf)
	FILE_MAGIC_GGUF_LE = 0x46554747
	FILE_MAGIC_GGUF_BE = 0x47475546
)

var ErrUnsupportedFormat = errors.New("unsupported model format")

func DecodeGGML(rs io.ReadSeeker) (*GGML, int64, error) {
	var magic uint32
	if err := binary.Read(rs, binary.LittleEndian, &magic); err != nil {
		return nil, 0, err
	}

	var c container
	switch magic {
	case FILE_MAGIC_GGML, FILE_MAGIC_GGMF, FILE_MAGIC_GGJT:
		return nil, 0, ErrUnsupportedFormat
	case FILE_MAGIC_GGLA:
		c = &containerGGLA{}
	case FILE_MAGIC_GGUF_LE:
		c = &containerGGUF{ByteOrder: binary.LittleEndian}
	case FILE_MAGIC_GGUF_BE:
		c = &containerGGUF{ByteOrder: binary.BigEndian}
	default:
		return nil, 0, errors.New("invalid file magic")
	}

	model, err := c.Decode(rs)
	if errors.Is(err, io.EOF) {
		// noop
	} else if err != nil {
		return nil, 0, err
	}

	offset, err := rs.Seek(0, io.SeekCurrent)
	if err != nil {
		return nil, 0, err
	}

	// final model type
	return &GGML{
		container: c,
		model:     model,
	}, offset, nil
}

func (llm GGML) GraphSize(context, batch uint64) (partialOffload, fullOffload uint64) {
	embedding := llm.KV().EmbeddingLength()
	heads := llm.KV().HeadCount()
	headsKV := llm.KV().HeadCountKV()
	vocab := uint64(len(llm.KV()["tokenizer.ggml.tokens"].([]any)))

	layers := llm.Tensors().Layers()

	switch llm.KV().Architecture() {
	case "llama":
		fullOffload = 4 * batch * (1 + 4*embedding + context*(1+heads))

		partialOffload = 4 * batch * embedding
		partialOffload += max(
			4*batch*(1+embedding+max(context, embedding))+embedding*embedding*9/16+4*context*(batch*heads+embedding/heads*headsKV),
			4*batch*(embedding+vocab)+embedding*vocab*105/128,
		)

		if ffnGateWeight, ok := layers["0"]["ffn_gate.0.weight"]; ok {
			ffnGateWeight1 := ffnGateWeight.Shape[1]
			fullOffload = 4 * batch * (2 + 3*embedding + context*(1+heads) + 2*headsKV + ffnGateWeight1)
			partialOffload = max(
				4*batch*(3+embedding/heads*headsKV+embedding+context*(1+heads)+ffnGateWeight1)+(embedding*embedding+3*embedding*headsKV*ffnGateWeight1)*9/16,
				4*batch*(1+2*embedding+context*(1+heads))+embedding*(6*context*headsKV/heads+embedding*9/16),
			)
		}
	case "gemma":
		fullOffload = 4 * batch * (embedding + vocab)
		partialOffload = 4*batch*(2*embedding+vocab+1) + embedding*vocab*105/128
	case "command-r":
		fullOffload = max(
			4*batch*(embedding+vocab),
			4*batch*(2+4*embedding+context*(1+heads)),
		)

		partialOffload = max(
			4*batch*(embedding+vocab)+embedding*vocab*105/128,
			4*batch*(1+2*embedding+context*(1+heads))+4*embedding*context+embedding*embedding*9/16,
		)
	case "qwen2":
		fullOffload = max(
			4*batch*(embedding+vocab),
			4*batch*(1+2*embedding+context+context*heads),
		)

		partialOffload = max(
			4*batch*(embedding+vocab)+embedding*vocab*105/128,
			4*(batch*(1+2*embedding+context*(1+heads))+embedding*(1+context)),
		)
	case "phi2":
		fullOffload = max(
			4*batch*(embedding+vocab),
			4*batch*(1+4*embedding+context+context*heads),
		)

		partialOffload = 4*batch*(2*embedding+vocab) + embedding*vocab*105/128
	}

	return
}
