# React Raycaster

## Installation

```shell
npm install react-raycaster
```

or

```shell
yarn add react-raycaster
```

## How to use

```js
import Raycaster from "react-raycaster";

// ...

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const tiles = {
  1: {
    type: "wall",
    src: "https://raw.githubusercontent.com/kingdcreations/react-raycaster/main/example/src/assets/tex/oak_planks.png",
    collision: true,
  },
  2: {
    type: "sprite",
    src: "https://raw.githubusercontent.com/kingdcreations/react-raycaster/main/example/src/assets/tex/barrel.png",
    collision: true,
  },
  3: {
    type: "door",
    src: "https://raw.githubusercontent.com/kingdcreations/react-raycaster/main/example/src/assets/tex/wood.png",
    collision: true,
  },
}

<Raycaster
  map={map}
  tiles={tiles}
  player={{
    x: 5,
    y: 17,
    rotation: -90
  }}
/>
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `map`| `number[][]` | **required** | 2D map array containing tiles |
| `tiles`| `Tiles` | **required** | Map tiles definition (See below) |
| `player`| `Player` | **required** | Player initial values |
| `width` | `number` | `1000` | Game width in pixels |
| `height` | `number` | `600` | Game height in pixels |
| `raystep` | `number > 0` | `2` | Steps per scanlines |
| `shading` | `boolean` | `true` | Allows depth shading |
| `showFPS` | `boolean` | `false` | Displays frames per second |
| `skybox` | `string` | `none` | Source from the skybox to display |
| `floor` | `string` | `none` | Source from the floor to display |
| `ceiling` | `string` | `none` | Source from the ceiling to display |
| `speed` | `number` | `10` | Sets movement speed |
| `rotSpeed` | `number` | `2.5` | Sets the rotation speed |

## Types

### Tiles

| Name | Type | Default | Description | 
|---|---|---|---|
| `[number]`| `Tile` | **required** | The tile identified by a number |

### Tile

| Name | Type | Default | Description |
|---|---|---|---|
| `type`| `"wall" \| "sprite" \| "door" ` | **required** | Type of the tile |
| `src`| `string` | **required** | Source image of the tile |
| `collision`| `boolean` | `false` | Player collision against the tile |

### Player

| Name | Type | Default | Description |
|---|---|---|---|
| `x`| `number` | **required** | Player x value on map |
| `y`| `number` | **required** | Player y value on map |
| `rotation`| `number` | `0` | Player rotation in degree |

## TODO

- Add full container width
- Add sounds
- Add run animations
- Add more tile types
- Add moving sprites
- Add different walls height
- Add pitch and offset

## License

MIT