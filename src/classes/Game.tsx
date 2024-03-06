import { Doors, Tiles, PlayerType } from "../types/RaycastTypes"

export default class Game {
    constructor(map: number[][], tiles: Tiles, player: PlayerType, w: number, h: number) {
        this.map = map
        this.tiles = tiles

        this.pX = player.x + .5
        this.pY = player.y + .5

        this.dirX = -1;
        this.dirY = 0;

        this.planeX = 0;
        this.planeY = (w / 2) / h

        if (player.rotation) {
            this.dirX = -1 * Math.cos(-player.rotation * Math.PI / 180);
            this.dirY = -1 * Math.sin(-player.rotation * Math.PI / 180);

            this.planeX = -this.planeY * Math.sin(-player.rotation * Math.PI / 180);
            this.planeY = this.planeY * Math.cos(-player.rotation * Math.PI / 180);
        }

        this.doors = Array.from(Array(map.length), () => Array(map[0].length).fill(0));
    }

    getMapType = (x: number, y: number) => {
        if (this.tiles[this.map[x][y]])
            return this.tiles[this.map[x][y]].type
        else return null
    }

    checkDoor = () => {
        if (this.action) {
            const checkMapX = Math.floor(this.pX + this.dirX);
            const checkMapY = Math.floor(this.pY + this.dirY);

            const checkMapX2 = Math.floor(this.pX + this.dirX * 2);
            const checkMapY2 = Math.floor(this.pY + this.dirY * 2);

            if (this.getMapType(checkMapX, checkMapY) === "door" && this.doors[checkMapX][checkMapY] === 0)
                this.openDoor(checkMapX, checkMapY)

            if (this.getMapType(checkMapX2, checkMapY2) === "door" && this.doors[checkMapX2][checkMapY2] === 0)
                this.openDoor(checkMapX2, checkMapY2)

            if (this.getMapType(Math.floor(this.pX), Math.floor(this.pY)) === "door")
                this.openDoor(Math.floor(this.pX), Math.floor(this.pY))
        }
    }

    openDoor = (x: number, y: number) => {
        let timer = 0;
        let state = "opening"

        const loop = setInterval(() => {
            if (this.doors[x][y] < 1 && state === "opening")
                this.doors[x][y] += 0.025
            else {
                timer++;
                state = "open"
                this.doors[x][y] = 1

                if (timer >= 60 * 3 && this.getMapType(Math.floor(this.pX), Math.floor(this.pY)) !== "door") {
                    clearInterval(loop)
                    state = "closing"
                    this.closeDoor(x, y)
                }
            }
        }, 1000 / 60)
    }

    closeDoor = (x: number, y: number) => {
        const loop = setInterval(() => {
            if (this.doors[x][y] > 0)
                this.doors[x][y] -= 0.025
            else {
                this.doors[x][y] = 0
                clearInterval(loop)
            }
        }, 1000 / 60)
    }

    map: number[][]
    tiles: Tiles

    doors: Doors

    up = 0
    left = 0
    down = 0
    right = 0

    action = false

    pX: number
    pY: number

    dirX: number
    dirY: number

    planeX: number;
    planeY: number;
}