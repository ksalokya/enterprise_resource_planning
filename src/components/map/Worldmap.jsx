import { useState, useContext, useEffect } from "react";
import { DarkMode } from '../../App'
import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-react-maps';
import { world_map } from './world_map.js';
import { population_density } from './data.js';
import './map.css'

import lightMode from "./light.txt";
import darkMode from "./dark.txt"

function Worldmap() {
  const isDarkModeEnabled = useContext(DarkMode);

  function lightModeCss() {
    fetch(lightMode)
      .then((r) => r.text())
      .then(text => {
        const styleTag = document.getElementById('theme');
        styleTag.innerHTML = text;
      })
  };

  function darkModeCss() {
    fetch(darkMode)
      .then((response) => response.text())
      .then((text) => {
        const styleTag = document.getElementById('theme');
        styleTag.innerHTML = text;
      });
  };

  useEffect(() => {
    if (isDarkModeEnabled) darkModeCss();
    else lightModeCss();
  }, [isDarkModeEnabled])

  return (
    <div className="worldmap">
      <MapsComponent height='100%'>
        <LayersDirective>
          <LayerDirective shapeData={world_map} shapeDataPath='name' shapePropertyPath='name' dataSource={population_density} shapeSettings={{
            colorValuePath: 'density',
            colorMapping: [
              {
                from: 0, to: 100, color: '#316DB5',
              },
              {
                from: 101, to: 200, color: '#D84444',
              },
              {
                color: 'orange'
              }
            ]
          }}>
          </LayerDirective>
        </LayersDirective>
      </MapsComponent>
    </div>
  )
}

export default Worldmap