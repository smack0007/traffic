//go:build js && wasm

package main

import (
	"syscall/js"

	"github.com/smack0007/traffic/game"
)

func main() {
	<-make(chan bool)
}

//go:wasmexport Init
func Init() {

}

//go:wasmexport Update
func Update(elapsed float64) {
    game.Update(elapsed)
}

//go:wasmexport Draw
func Draw() {
		graphics := WebGraphics{
			host: js.Global().Get("host").Get("graphics"),
		};

    game.Draw(&graphics)
}