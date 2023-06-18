import { MapsComponent, LayersDirective, LayerDirective } from '@syncfusion/ej2-react-maps';
import { world_map } from '../metadata/world_map.js';
// import { population_density } from '../metadata/data.js';
import '../map.css'

function Worldmap(props) {
  return (
    <div className="worldmap">
      <MapsComponent height='100%'>
        <LayersDirective>
          <LayerDirective
            shapeData={world_map}
            shapeDataPath='name'
            shapePropertyPath='name'
            dataSource={props.deliveryData}
            shapeSettings={{
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