import './App.css'

import { useState } from 'react';
import { FaAdjust } from "react-icons/fa";
import { FaArrowDown19, FaGripLinesVertical } from 'react-icons/fa6';

import obsidian from "./assets/tex/obsidian.png"
import oakPlanks from "./assets/tex/oak_planks.png"
import barrel from "./assets/tex/barrel.png"
import pillar from "./assets/tex/pillar.png"
import wood from "./assets/tex/wood.png"
import skybox from "./assets/tex/cubemap.png"

import Raycaster from '../../src';

function App() {
  const [raystep, setRaystep] = useState(2)
  const [shading, setShading] = useState(true)
  const [showFPS, setShowFPS] = useState(false)

  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 2, 2, 6, 2, 2, 0, 0, 0, 0, 5, 0, 5, 0, 5, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 4, 4, 4, 4, 4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  return (
    <div>
      <Raycaster
        showFPS={showFPS}
        map={map}
        raystep={raystep}
        width={1000}
        height={600}
        floor={oakPlanks}
        skybox={skybox}
        shading={shading}
        player={{
          x: 15,
          y: 8,
        }}
        tiles={{
          1: {
            type: "wall",
            src: obsidian,
            collision: true,
          },
          2: {
            type: "wall",
            src: oakPlanks,
            collision: true,
          },
          3: {
            type: "sprite",
            src: barrel,
            collision: true,
          },
          4: {
            type: "wall",
            src: obsidian,
            collision: true,
          },
          5: {
            type: "sprite",
            src: pillar,
            collision: true,
          },
          6: {
            type: "door",
            src: wood,
            collision: true,
          }
        }}
      />

      <form>
        <div>
          <label htmlFor="raystep"><FaGripLinesVertical /></label>
          <input
            min={1}
            max={5}
            type="range"
            value={raystep}
            onChange={(e) => setRaystep(parseInt(e.target.value))}
            id="raystep"
            aria-label="Raystep"
          />
        </div>

        <div>
          <label htmlFor="shading"><FaAdjust /></label>
          <input
            type="checkbox"
            checked={shading}
            onChange={() => setShading(!shading)}
            id="shading"
            aria-label="Shading"
          />
        </div>

        <div>
          <label htmlFor="showFPS"><FaArrowDown19 /></label>
          <input
            type="checkbox"
            checked={showFPS}
            onChange={() => setShowFPS(!showFPS)}
            id="showFPS"
            aria-label="Show FPS"
          />
        </div>
      </form>

      <footer>
        <p>© 2024 <a href="https://thais-marcon.com">Thaïs Marcon</a></p>
        <p>Github: <a href="https://github.com/kingdcreations/react-raycaster">react-raycaster</a></p>
      </footer>
    </div>
  )
}

export default App
