import Game from "../classes/Game"

export const transparentize = (color: number, newColor: number, amount: number) => {
    const d1 = amount / 255
    const d2 = (255 - amount) / 255
    return Math.floor(color * d2 + newColor * d1)
}

export const fixColor = (color: number, perpwalld: number, side?: number) => {
    if (side === 1) color /= 1.3;
    const scolor = color / perpwalld * 8;
    if (scolor > color) return color;
    return (scolor);
}

export const isColliding = (g: Game, x: number, y: number) => {
    const collider = g.map[Math.floor(x)][Math.floor(y)]
    const doorState = g.doors[Math.floor(x)][Math.floor(y)]
    return (collider === 0 || !g.tiles[collider].collision || doorState === 1)
}