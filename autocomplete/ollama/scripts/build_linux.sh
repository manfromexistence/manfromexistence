#!/bin/sh

set -eu

export VERSION=${VERSION:-$(git describe --tags --first-parent --abbrev=7 --long --dirty --always | sed -e "s/^v//g")}
export GOFLAGS="'-ldflags=-w -s \"-X=github.com/ollama/ollama/version.Version=$VERSION\" \"-X=github.com/ollama/ollama/server.mode=release\"'"

BUILD_ARCH=${BUILD_ARCH:-"amd64 arm64"}
export AMDGPU_TARGETS=${AMDGPU_TARGETS:=""}
mkdir -p dist

for TARGETARCH in ${BUILD_ARCH}; do
    docker build \
        --platform=linux/$TARGETARCH \
        --build-arg=GOFLAGS \
        --build-arg=CGO_CFLAGS \
        --build-arg=OLLAMA_CUSTOM_CPU_DEFS \
        --build-arg=AMDGPU_TARGETS \
        --target build-$TARGETARCH \
        -f Dockerfile \
        -t builder:$TARGETARCH \
        .
    docker create --platform linux/$TARGETARCH --name builder-$TARGETARCH builder:$TARGETARCH
    docker cp builder-$TARGETARCH:/go/src/github.com/ollama/ollama/ollama ./dist/ollama-linux-$TARGETARCH

    if [ "$TARGETARCH" = "amd64" ]; then
        docker cp builder-$TARGETARCH:/go/src/github.com/ollama/ollama/dist/deps/ ./dist/
    fi

    docker rm builder-$TARGETARCH
done
