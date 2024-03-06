// Public types

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

export type RaycastType = {
    map: number[][],
    tiles: Tiles,
    player: PlayerType,
    width?: number,
    height?: number,
    raystep?: number,
    shading?: boolean,
    showFPS?: boolean,
    skybox?: string,
    floor?: string,
    ceiling?: string,
    speed?: number,
    rotSpeed?: number,
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