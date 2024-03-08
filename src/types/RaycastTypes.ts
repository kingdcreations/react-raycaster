// Public types

import { CanvasHTMLAttributes } from "react"
import Game from "../classes/Game"

export type Tiles = { [key: number]: Tile }

export type Tile = {
    type: "wall" | "sprite" | "door",
    src: string,
    collision?: boolean,
}

export type PlayerType = {
    x: number,
    y: number,
    rotation?: number
}

export type Inputs = {
    north: string | string[],
    east: string | string[],
    south: string | string[],
    west: string | string[],
    action: string | string[],
}

export type RaycastType = {
    map: number[][],
    tiles: Tiles,
    player: PlayerType,
    width?: number,
    height?: number,
    shading?: boolean,
    showFPS?: boolean,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
    inputs?: Inputs
} & CanvasHTMLAttributes<HTMLCanvasElement>

// Private types

export type Sprite = {
    x: number;
    y: number;
    tile: number;
}

export type SortedSprite = Sprite & {
    distance: number;
}

export type Doors = number[][]

export type CanvasType = {
    g: Game,
    w: number,
    h: number,
    shading?: boolean,
    showFPS?: boolean,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
    inputs?: Inputs
} & CanvasHTMLAttributes<HTMLCanvasElement>