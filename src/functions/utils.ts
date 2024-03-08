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