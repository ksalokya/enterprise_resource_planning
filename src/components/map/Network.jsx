import { MapsComponent, LayersDirective, LayerDirective, Inject, NavigationLine, NavigationLinesDirective, NavigationLineDirective } from '@syncfusion/ej2-react-maps';
import { world_map } from './world_map.js';
import './map.css'

function Network() {
    return (
        <div className="network">
            <MapsComponent id="element" height='95%'>
                <Inject services={[NavigationLine]} />
                <LayersDirective>
                    <LayerDirective shapeData={world_map}>
                        <NavigationLinesDirective>
                            <NavigationLineDirective
                                visible={true}
                                latitude={[37.6276571, 28.644800]}
                                longitude={[-74.0060, 77.216721]}
                                color="green"
                                angle={-90}
                                width={2}
                                dashArray="4" />
                        </NavigationLinesDirective>
                    </LayerDirective>
                </LayersDirective>
            </MapsComponent>
        </div>
    )
}

export default Network