import { useMemo } from "react";
import Game from "../classes/Game";
import { RaycastType } from "../types/RaycastTypes";
import Canvas from "./Canvas";

export default function Raycaster({
    map,
    tiles,
    player,
    width = 500,
    height = 300,
    ...props
}: RaycastType) {
    
    // Initialize game object
    const game = useMemo(() => {
        try {
            return new Game(map, tiles, player, width, height)
        } catch (e) {
            return console.error(e)
        }
    }, [map, tiles, player, width, height])

    if (!game) return null

    return (
        <Canvas g={game} w={width} h={height} {...props} />
    )
}