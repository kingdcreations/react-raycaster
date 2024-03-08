import { useMemo } from "react";
import Game from "../classes/Game";
import { RaycastType } from "../types/RaycastTypes";
import Canvas from "./Canvas";

export default function Raycaster({
    map,
    tiles,
    player,
    raystep = 2,
    width = 1000,
    height = 600,
    ...props
}: RaycastType) {
    // Enforce raystep to be a positive non null number
    raystep = Math.max(1, raystep)

    // Divide dimension per raysteps
    const w = Math.floor(width / raystep);
    const h = Math.floor(height / raystep);

    // Initialize game object
    const game = useMemo(() => {
        try {
            return new Game(map, tiles, player, w, h)
        } catch (e) {
            return console.error(e)
        }
    }, [map, tiles, player, w, h])

    if (!game) return null

    return (
        <Canvas g={game} width={width} height={height} raystep={raystep} {...props} />
    )
}