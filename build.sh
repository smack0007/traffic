#!/bin/bash
set -e
cd $(dirname $(realpath "${BASH_SOURCE[0]}"))

mkdir -p ./bin/web
GOOS=js GOARCH=wasm go build -o ./bin/web/main.wasm ./web
tsc ./web/*.ts --target esnext --outfile ./bin/web/main.js
cp -u "$(go env GOROOT)/lib/wasm/wasm_exec.js" ./bin/web
cp -u ./web/index.html ./bin/web