import { createContext, useEffect, useMemo, useState } from "react";
import Game from "../classes/Game";
import { RaycastType } from "../types/RaycastTypes";
import Canvas from "./Canvas";

const RaycasterContext = createContext<Game>(null!);

export default function Raycaster({
    map,
    tiles,
    player,
    width = 500,
    height = 300,
    children,
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

    const [textures, setTextures] = useState<HTMLImageElement[]>()

    // Tiles initialization
    useEffect(() => {
        if (tiles) {
            const tilesArray = Object.values(tiles)
            const imgArr = new Array(tilesArray.length);
            tilesArray.forEach((o, i) => {
                const image = new Image();
                imgArr[i] = null
                image.onload = () => imgArr[i] = image
                image.crossOrigin = "Anonymous";
                image.src = o.src;
            })

            setTextures(imgArr)
        }
    }, [tiles])

    if (!game) return null

    return (
        <RaycasterContext.Provider value={game}>
            <Canvas g={game} w={width} h={height} textures={textures} {...props} />

            {children &&
                <RaycasterContext.Consumer>
                    {children}
                </RaycasterContext.Consumer>}
        </RaycasterContext.Provider>
    )
}