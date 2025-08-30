package game

type Color = uint32

type Graphics interface {
	FillRect(x, y, width, height int32, color Color);
}