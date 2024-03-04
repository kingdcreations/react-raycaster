import { CanvasHTMLAttributes, useEffect, useMemo, useRef, useState } from "react";
import Game from "../classes/Game";
import RaycastType, { Door, SortedSprite, Sprite } from "../types/RaycastTypes";

export default function Raycaster({
    map,
    raystep = 2,
    shadows = true,
    showFPS = false,
    width = window.innerWidth,
    height = window.innerHeight,
    objects,
    skybox,
    ceiling,
    floor,
    speed = 15,
    rotSpeed = 2.5,
    ...props
}: RaycastType & CanvasHTMLAttributes<HTMLCanvasElement>) {
    width = Math.min(window.innerWidth, width);
    height = Math.min(window.innerHeight, height);
    const w = Math.floor(width / raystep);
    const h = Math.floor(height / raystep);
    const halfH = h / 2;

    speed /= 100
    rotSpeed /= 100
    if (raystep < 1) raystep = 1

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const ctx = canvasRef.current?.getContext("2d", { willReadFrequently: true });

    const id = ctx?.createImageData(w, h);
    const d = id?.data;

    const game = useMemo(() => new Game(w, h), [h, w])

    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [skyboxImage, setSkyboxImage] = useState<HTMLImageElement>()

    const [ceilingTexData, setCeilingTexData] = useState<ImageData>()
    const [floorTexData, setFloorTexData] = useState<ImageData>()

    const times: number[] = [];

    const z = Array(w);
    const [sprites, setSprites] = useState<Sprite[]>([]);

    // Get doors from map
    const doors: Door = Array.from(Array(map.length), () => Array(map[0].length).fill(0));

    // Main loop
    const loop = setInterval(() => {
        const mouvement = game.up + game.down
        if (mouvement && objects) {
            const collideX = map[Math.floor(game.px + game.dirx * mouvement)][Math.floor(game.py)]
            const doorStateX = doors[Math.floor(game.px + game.dirx * mouvement)][Math.floor(game.py)]
            if (collideX === 0 || !objects[collideX].collision || doorStateX === 1)
                game.px += game.dirx * mouvement

            const collideY = map[Math.floor(game.px)][Math.floor(game.py + game.diry * mouvement)]
            const doorStateY = doors[Math.floor(game.px)][Math.floor(game.py + game.diry * mouvement)]
            if (collideY === 0 || !objects[collideY].collision || doorStateY === 1)
                game.py += game.diry * mouvement
        }

        const rotation = -(game.left + game.right)
        if (rotation) {
            const olddirx = game.dirx;
            game.dirx = game.dirx * Math.cos(rotation) - game.diry * Math.sin(rotation);
            game.diry = olddirx * Math.sin(rotation) + game.diry * Math.cos(rotation);
            const oldplanex = game.planex;
            game.planex = game.planex * Math.cos(rotation) - game.planey * Math.sin(rotation);
            game.planey = oldplanex * Math.sin(rotation) + game.planey * Math.cos(rotation);
        }

        if (game.action) checkDoor()

        redraw();
    }, 1000 / 60)

    const openDoor = (x: number, y: number) => {
        let timer = 0;
        let state = "opening"

        const loop = setInterval(() => {
            if (doors[x][y] < 1 && state === "opening")
                doors[x][y] += 0.025
            else {
                timer++;
                state = "open"
                doors[x][y] = 1

                if (timer >= 60 * 3 && getMapType(Math.floor(game.px), Math.floor(game.py)) !== "door") {
                    clearInterval(loop)
                    state = "closing"
                    closeDoor(x, y)
                }
            }
        }, 1000 / 60)
    }

    const closeDoor = (x: number, y: number) => {
        const loop = setInterval(() => {
            if (doors[x][y] > 0)
                doors[x][y] -= 0.025
            else {
                doors[x][y] = 0
                clearInterval(loop)
            }
        }, 1000 / 60)
    }

    const getMapType = (x: number, y: number) => {
        if (objects && objects[map[x][y]])
            return objects[map[x][y]].type
        else return null
    }

    const checkDoor = () => {
        const checkMapX = Math.floor(game.px + game.dirx);
        const checkMapY = Math.floor(game.py + game.diry);

        const checkMapX2 = Math.floor(game.px + game.dirx * 2);
        const checkMapY2 = Math.floor(game.py + game.diry * 2);

        if (getMapType(checkMapX, checkMapY) === "door" && doors[checkMapX][checkMapY] === 0)
            openDoor(checkMapX, checkMapY)

        if (getMapType(checkMapX2, checkMapY2) === "door" && doors[checkMapX2][checkMapY2] === 0)
            openDoor(checkMapX2, checkMapY2)

        if (getMapType(Math.floor(game.px), Math.floor(game.py)) === "door")
            openDoor(Math.floor(game.px), Math.floor(game.py))
    }

    const redraw = () => window.requestAnimationFrame(() => {
        if (showFPS) {
            const now = performance.now();
            while (times.length > 0 && times[0] <= now - 1000)
                times.shift()
            times.push(now);
        }

        clear();
        floorcast();
        if (id) ctx?.putImageData(id, 0, 0);

        skycast();
        raycast();
        spritecast();

        if (showFPS) ctx?.fillText(times.length.toString(), w / 50, h / 15 + 12);
    });

    const clear = () => d?.fill(0)

    const skycast = () => {
        if (!skyboxImage) return

        const skyWidth = w * 4
        const angle = Math.atan2(game.diry, game.dirx) / Math.PI + 1;
        const pan = Math.floor(angle * w * 2);

        if (ctx) {
            ctx.drawImage(skyboxImage, 0, 0, skyboxImage.width, skyboxImage.height / 2, pan, 0, skyWidth, halfH);
            ctx.drawImage(skyboxImage, 0, 0, skyboxImage.width, skyboxImage.height / 2, pan - skyWidth, 0, skyWidth, halfH);
        }
    }

    // TODO: Add depth shadow effect
    const spritecast = () => {
        if (!images) return

        const sortedSprites: SortedSprite[] = []
        sprites.forEach((s, i) => {
            sortedSprites.push({
                ...s,
                distance: (game.px - sprites[i].x) * (game.px - sprites[i].x) + (game.py - sprites[i].y) * (game.py - sprites[i].y)
            })
        })

        sortedSprites
            .sort((a, b) => b.distance - a.distance)
            .forEach(s => {

                // Translate sprite position to relative to camera
                const spx = s.x - game.px;
                const spy = s.y - game.py;

                // Transform sprite with the inverse camera matrix
                const invert = 1 / (game.planex * game.diry - game.planey * game.dirx);
                const transformX = invert * (game.diry * spx - game.dirx * spy);
                const transformY = invert * (-game.planey * spx + game.planex * spy);

                if (transformY > 0) {

                    const spriteScreenX = Math.floor((w / 2) * (1 + transformX / transformY));

                    // Calculate height of the sprite
                    const spriteHeight = Math.abs(Math.floor(h / transformY)); // Using 'transformY' to prevents fisheye

                    const drawStartY = Math.floor(-spriteHeight / 2 + h / 2);

                    // Calculate width of the sprite
                    const spriteWidth = Math.abs(Math.floor(h / transformY));
                    let drawStartX = Math.floor(-spriteWidth / 2 + spriteScreenX);
                    let drawEndX = drawStartX + spriteWidth;

                    let clipStartX = drawStartX;
                    let clipEndX = drawEndX;

                    if (drawStartX < -spriteWidth) drawStartX = -spriteWidth;
                    if (drawEndX > w + spriteWidth) drawEndX = drawEndX = w + spriteWidth;

                    const tex = images[s.object]

                    // Loop through every vertical stripe of the sprite on screen
                    for (let stripe = drawStartX; stripe <= drawEndX; stripe++) {
                        if (transformY >= z[stripe]) {
                            if (stripe === 0)
                                clipStartX = 0
                            else if (stripe <= clipStartX + 1)
                                clipStartX = stripe + 1;
                            else {
                                clipEndX = stripe;
                                break;
                            }
                        }
                    }

                    if (clipStartX !== clipEndX && clipEndX > 0 && clipStartX < w && ctx) {
                        const scaleDelta = tex.width / spriteWidth;
                        drawStartX = Math.floor((clipStartX - drawStartX) * scaleDelta);
                        if (drawStartX < 0) drawStartX = 0;

                        drawEndX = Math.floor((clipEndX - clipStartX) * scaleDelta) + 1;
                        if (drawEndX > tex.width) drawEndX = tex.width;

                        let drawWidth = clipEndX - clipStartX;
                        if (drawWidth < 0) drawWidth = 0;

                        ctx.drawImage(images[s.object], drawStartX, 0, drawEndX, tex.height, clipStartX, drawStartY, drawWidth, spriteHeight);
                    }
                }
            })
    }

    const raycast = () => {
        if (!d) return;

        for (let x = 0; x < w; x++) {

            // Calculate ray position and direction
            const camx = 2 * x / w - 1;
            const rayDistX = game.dirx + game.planex * camx;
            const rayDistY = game.diry + game.planey * camx;

            // Box of the map we're in
            let mapx = Math.floor(game.px);
            let mapy = Math.floor(game.py);

            // Length of the ray from current position to next x or y-side
            let sideDistX;
            let sideDistY;

            let wallXOffset = 0;
            let wallYOffset = 0;

            // Length of ray from one x or y-side to next x or y-side
            const ddx = (rayDistX === 0) ? 1e30 : Math.abs(1 / rayDistX);
            const ddy = (rayDistY === 0) ? 1e30 : Math.abs(1 / rayDistY);
            let perpWallD;

            // What direction to step in x or y-direction (either +1 or -1)
            let stepX;
            let stepY;

            let hit = 0;
            let side = 0;

            // Calculate step and initial sideDist
            if (rayDistX < 0) {
                stepX = -1;
                sideDistX = (game.px - mapx) * ddx;
            } else {
                stepX = 1;
                sideDistX = (mapx + 1.0 - game.px) * ddx;
            }

            if (rayDistY < 0) {
                stepY = -1;
                sideDistY = (game.py - mapy) * ddy;
            } else {
                stepY = 1;
                sideDistY = (mapy + 1.0 - game.py) * ddy;
            }

            // DDA
            while (hit === 0) {

                // Jump to next map square, either in x-direction, or in y-direction
                if (sideDistX < sideDistY) {
                    sideDistX += ddx;
                    mapx += stepX;
                    side = 0;
                } else {
                    sideDistY += ddy;
                    mapy += stepY;
                    side = 1;
                }

                let wx
                const mapPos = map[mapx][mapy]
                // Check if ray has hit a wall
                if (map[mapx][mapy] > 0) {
                    if (objects && objects[mapPos].type === "wall")
                        hit = 1;
                    else if (objects && objects[mapPos].type === "door") {
                        hit = 1;
                        if (side == 1) {
                            wallYOffset = 0.5 * stepY;
                            perpWallD = (mapy - game.py + wallYOffset + (1 - stepY) / 2) / rayDistY;
                            wx = game.px + perpWallD * rayDistX;
                            wx -= Math.floor(wx);
                            if (sideDistY - (ddy / 2) < sideDistX) { //If ray hits offset wall
                                if (1.0 - wx <= doors[mapx][mapy]) {
                                    hit = 0; //Continue raycast for open/opening doors
                                    wallYOffset = 0
                                }
                            } else { // Arround wall
                                hit = 0;
                                side = 0;
                                wallYOffset = 0;
                            }
                        } else {
                            wallXOffset = 0.5 * stepX;
                            perpWallD = (mapx - game.px + wallXOffset + (1 - stepX) / 2) / rayDistX;
                            wx = game.py + perpWallD * rayDistY;
                            wx -= Math.floor(wx);
                            if (sideDistX - (ddx / 2) < sideDistY) { //If ray hits offset wall
                                if (1.0 - wx <= doors[mapx][mapy]) {
                                    hit = 0; //Continue raycast for open/opening doors
                                    wallXOffset = 0
                                }
                            } else { // Arround wall
                                hit = 0;
                                side = 0;
                                wallXOffset = 0;
                            }
                        }
                    }
                }
            }

            // Calculate distance of perpendicular ray (Euclidean distance would give fisheye effect!)
            if (side === 0) perpWallD = (mapx - game.px + wallXOffset + (1 - stepX) * 0.5) / rayDistX;
            else perpWallD = (mapy - game.py + wallYOffset + (1 - stepY) * 0.5) / rayDistY;

            // Calculate height of line to draw on screen
            const lineHeight = Math.floor(h / perpWallD);

            // Calculate lowest and highest pixel to fill in current stripe
            const drawStart = -lineHeight * 0.5 + h * 0.5;

            const texture = images[map[mapx][mapy] - 1];

            // Calculate value of wallX
            let wallX;
            if (side === 0) wallX = game.py + perpWallD * rayDistY;
            else wallX = game.px + perpWallD * rayDistX;
            wallX -= Math.floor(wallX);

            // Calculate door offset
            if (objects && objects[map[mapx][mapy]].type === "door")
                wallX += doors[mapx][mapy];

            // x coordinate on the texture
            let texX = Math.floor(wallX * texture.width);
            if (side == 0 && rayDistX > 0) texX = texture.width - texX - 1;
            if (side == 1 && rayDistY < 0) texX = texture.width - texX - 1;

            if (ctx) {
                ctx.drawImage(texture, texX, 0, 1, texture.height, x, drawStart, 1, lineHeight);

                if (shadows) {
                    ctx.save()
                    const shade = perpWallD * 0.020 + side / 10;
                    ctx.fillStyle = "rgba(0, 0, 0, " + shade + ")";
                    ctx.fillRect(x, drawStart, 1, lineHeight);
                    ctx.restore()
                }
            }

            // Set the zbuffer for the sprite casting
            z[x] = perpWallD;
        }
    }

    const floorcast = () => {
        if (!d) return
        if (!floorTexData && !ceilingTexData) return;

        const middle = 0.5 * h;
        for (let y = 0; y < h; y++) {
            const rayDistX0 = game.dirx - game.planex;
            const rayDistY0 = game.diry - game.planey;
            const rayDistX1 = game.dirx + game.planex;
            const rayDistY1 = game.diry + game.planey;

            const p = Math.floor(y - middle);
            const rowDistance = middle / p;

            const fstepX = rowDistance * (rayDistX1 - rayDistX0) / w;
            const fstepY = rowDistance * (rayDistY1 - rayDistY0) / w;

            let floorX = game.px + rowDistance * rayDistX0;
            let floorY = game.py + rowDistance * rayDistY0;

            const shade = shadows ? y / h : 1
            for (let x = 0; x < w; ++x) {
                if (p > 0) {
                    const cellX = Math.floor(floorX);
                    const cellY = Math.floor(floorY);

                    const dataUVFloor = 4 * (y * w + x);
                    const dataUVCeiling = 4 * ((h - y - 1) * w + x);

                    if (floorTexData) {
                        const tx = Math.floor(floorTexData.width * (floorX - cellX)) & 63;
                        const ty = Math.floor(floorTexData.height * (floorY - cellY)) & 63;

                        const tUv = 4 * (floorTexData.width * ty + tx);

                        d[dataUVFloor + 0] = floorTexData.data[tUv + 0] * shade;
                        d[dataUVFloor + 1] = floorTexData.data[tUv + 1] * shade;
                        d[dataUVFloor + 2] = floorTexData.data[tUv + 2] * shade;
                        d[dataUVFloor + 3] = 255;
                    }

                    if (ceilingTexData) {
                        const tx = Math.floor(ceilingTexData.width * (floorX - cellX)) & 63;
                        const ty = Math.floor(ceilingTexData.height * (floorY - cellY)) & 63;

                        const tUv = 4 * (ceilingTexData.width * ty + tx);

                        d[dataUVCeiling + 0] = ceilingTexData.data[tUv + 0] * shade;
                        d[dataUVCeiling + 1] = ceilingTexData.data[tUv + 1] * shade;
                        d[dataUVCeiling + 2] = ceilingTexData.data[tUv + 2] * shade;
                        d[dataUVCeiling + 3] = 255;
                    }
                }
                floorX += fstepX;
                floorY += fstepY;
            }
        }
    }

    // Font initialization
    useEffect(() => {
        if (ctx) {
            ctx.fillStyle = "red"
            ctx.font = "24px Arial"
            ctx.imageSmoothingEnabled = false;
        }
    }, [ctx, raystep])

    // Objects initialization
    useEffect(() => {
        if (objects) {
            const objectsArray = Object.values(objects)
            const imgArr = new Array(objectsArray.length);
            objectsArray.forEach((o, i) => {
                const image = new Image();
                image.onload = () => imgArr[i] = image
                image.src = o.src;
                image.crossOrigin = "Anonymous";
            })
            setImages(imgArr)
        }
        else setImages([]);
    }, [objects])

    // Skybox initialization
    useEffect(() => {
        if (skybox) {
            const image = new Image();
            image.onload = () => setSkyboxImage(image);
            image.src = skybox;
            image.crossOrigin = "Anonymous";
        }
        else setSkyboxImage(undefined);
    }, [skybox])

    // Ceiling initialization
    useEffect(() => {
        if (ceiling) {
            const image = new Image();
            image.onload = () => {
                const c = document.createElement("canvas").getContext("2d");
                c?.drawImage(image, 0, 0, image.width, image.height);
                setCeilingTexData(c?.getImageData(0, 0, image.width, image.height));
            }
            image.src = ceiling;
            image.crossOrigin = "Anonymous";
        }
        else setCeilingTexData(undefined);
    }, [ceiling])

    // Floor initialization
    useEffect(() => {
        const image = new Image();
        if (floor) {
            image.onload = () => {
                const c = document.createElement("canvas").getContext("2d");
                c?.drawImage(image, 0, 0, image.width, image.height);
                setFloorTexData(c?.getImageData(0, 0, image.width, image.height));
            }
            image.src = floor;
            image.crossOrigin = "Anonymous";
        }
        else setFloorTexData(undefined);
    }, [floor])

    // Get sprites from map
    useEffect(() => {
        const s: Sprite[] = []
        objects && map.forEach((row, x) => {
            row.forEach((tile, y) => {
                if (objects[tile]?.type === "sprite")
                    s.push({ x: x + 0.5, y: y + 0.5, object: tile - 1 })
            })
        })
        setSprites(s)
    }, [map, objects])

    // Handle inputs events
    useEffect(() => {
        console.log("useEffect inputs");

        const onKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'z':
                    game.up = speed
                    break;
                case 'd':
                    game.right = rotSpeed
                    break;
                case 's':
                    game.down = -speed
                    break;
                case 'q':
                    game.left = -rotSpeed
                    break;
                case ' ':
                    game.action = true
                    break;
                default:
                    break;
            }
        }

        const onKeyUp = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'z':
                    game.up = 0
                    break;
                case 'd':
                    game.right = 0
                    break;
                case 's':
                    game.down = 0
                    break;
                case 'q':
                    game.left = 0
                    break;
                case ' ':
                    game.action = false
                    break;
                default:
                    break;
            }
        }

        addEventListener('keydown', onKeyDown)
        addEventListener('keyup', onKeyUp)

        return () => {
            removeEventListener('keydown', onKeyDown)
            removeEventListener('keyup', onKeyUp)
            clearInterval(loop)
        }
    }, [game, loop, rotSpeed, speed])

    return (
        <canvas style={{
            width,
            height,
            imageRendering: "pixelated"
        }} ref={canvasRef} width={w} height={h} {...props} />
    )
}