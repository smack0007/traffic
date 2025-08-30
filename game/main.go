package game

import (
	"fmt"
)

var x, y float64;

func Update(elapsed float64) {
    fmt.Println("Update", elapsed)
		
		delta := elapsed/1000.0
		x += 100 * delta;
		y += 100 * delta;
}

func Draw(graphics Graphics) {
	graphics.FillRect(int32(x), int32(y), 100, 100, 0xFFFFFFFF);
}

