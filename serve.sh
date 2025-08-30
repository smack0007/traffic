#!/bin/bash
set -e
cd $(dirname $(realpath "${BASH_SOURCE[0]}"))

 cd bin/web && caddy file-server --listen :8080