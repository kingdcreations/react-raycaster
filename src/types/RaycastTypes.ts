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
    north: string,
    east: string,
    south: string,
    west: string,
    action: string,
    cameraL?: string,
    cameraR?: string,
}

export interface RaycastType extends CanvasHTMLAttributes<HTMLCanvasElement> {
    map: number[][],
    tiles: Tiles,
    player: PlayerType,
    width?: number,
    height?: number,
    shading?: boolean,
    showFPS?: boolean,
    bobbing?: boolean,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
    inputs?: Inputs,
    mouse?: boolean
}

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

export interface CanvasType extends CanvasHTMLAttributes<HTMLCanvasElement> {
    g: Game,
    w: number,
    h: number,
    shading?: boolean,
    showFPS?: boolean,
    bobbing?: boolean,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
    inputs?: Inputs,
    textures?: HTMLImageElement[],
    mouse?: boolean
}