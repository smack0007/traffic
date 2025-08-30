//go:build js && wasm

package main

import (
	"syscall/js"

	"github.com/smack0007/traffic/game"
)

type WebGraphics struct {
	host js.Value
}

func (graphics *WebGraphics) FillRect(x, y, width, height int32, color game.Color) {
	graphics.host.Call("fillRect", x, y, width, height, color);
}