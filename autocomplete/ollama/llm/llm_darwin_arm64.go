package llm

import (
	"embed"
)

//go:embed build/darwin/arm64/*/bin/*
var libEmbed embed.FS
