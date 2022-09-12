import {
    MapsComponent, LayersDirective, LayerDirective, Inject, NavigationLine, NavigationLinesDirective,
    NavigationLineDirective, MarkersDirective, MarkerDirective, Marker
} from '@syncfusion/ej2-react-maps';
import { world_map } from './world_map.js';
import './map.css'

function Network() {
    return (
        <div className="network">
            <MapsComponent id="element" height='95%'>
                <Inject services={[NavigationLine, Marker]} />
                <LayersDirective>
                    <LayerDirective shapeData={world_map}>
                        <NavigationLinesDirective>
                            <NavigationLineDirective
                                visible={true}
                                latitude={[59.88893689676585, 28.644800]}
                                longitude={[-109.3359375, 77.216721]}
                                color="green"
                                angle={-90}
                                width={2}
                                dashArray="4" />
                        </NavigationLinesDirective>
                        <MarkersDirective>
                            <MarkerDirective visible={true} height={20} width={20} animationDuration={0} dataSource={[
                                { latitude: 28.644800, longitude: 77.216721 },
                                { latitude: 59.88893689676585, longitude: -109.3359375 }
                            ]}>
                            </MarkerDirective>
                        </MarkersDirective>
                    </LayerDirective>
                </LayersDirective>
            </MapsComponent>
        </div>
    )
}

export default Network