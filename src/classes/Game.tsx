export default class Game {
    constructor(w: number, h: number) {
        this.planey = (w / 2) / h
    }

    up = 0
    left = 0
    down = 0
    right = 0

    action = false

    px = 22
    py = 12

    dirx = -1;
    diry = 0;

    planex = 0;
    planey: number;
}