type ObjectType = {
    type: "wall" | "sprite" | "door";
    src: string;
    collision?: boolean;
};
export type Sprite = {
    x: number;
    y: number;
    object: number;
};
export type SortedSprite = Sprite & {
    distance: number;
};
export type Door = number[][];
type RaycastType = {
    map: number[][];
    raystep?: number;
    shadows?: boolean;
    showFPS?: boolean;
    width?: number;
    height?: number;
    skybox?: string;
    floor?: string;
    ceiling?: string;
    objects?: {
        [key: number]: ObjectType;
    };
    speed?: number;
    rotSpeed?: number;
};
export default RaycastType;
