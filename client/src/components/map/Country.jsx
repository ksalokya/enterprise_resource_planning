import { MapsComponent, LayersDirective, LayerDirective, Inject } from '@syncfusion/ej2-react-maps';
import { BubblesDirective, BubbleDirective, Bubble } from '@syncfusion/ej2-react-maps';
import { world_map } from './world_map.js';
import { population_density } from './data.js';
import './map.css'

function Country() {
    return (
        <div className="country">
            <MapsComponent id="maps">
                <Inject services={[Bubble]} />
                <LayersDirective>
                    <LayerDirective shapeData={world_map} shapeDataPath="name" shapePropertyPath="name"
                        dataSource={population_density} shapeSettings={{
                            colorValuePath: 'density',
                            colorMapping: [
                                {
                                    from: 0, to: 100, color: 'rgb(130, 202, 157)',
                                },
                                {
                                    from: 101, to: 200, color: 'skyblue',
                                },
                                {
                                    color: 'rgb(136, 132, 216)'
                                }
                            ]
                        }}>
                        <BubblesDirective>
                            <BubbleDirective visible={true} valuePath="population" dataSource={[
                                { name: 'India', population: '38332521' },
                                { name: 'Pakistan', population: '3090416' },
                                { name: 'New Zealand', population: '19651127' },
                                { name: 'United States', population: '15151127' },
                                { name: 'Taiwan', population: '15151127' },
                                { name: 'China', population: '58332521' },
                                { name: 'Russia', population: '12151127' },
                                { name: 'Belgium', population: '10151127' },
                                { name: 'United Arab Emirates', population: '10151127' },
                                { name: 'Egypt', population: '10151127' },
                                { name: 'Iran', population: '10151127' },
                                { name: 'Iraq', population: '10151127' },
                            ]}
                                minRadius={5}
                                maxRadius={10}
                                fill="orange"
                                animationDelay={100}
                                animationDuration={1000}
                                opacity={1}
                            />
                        </BubblesDirective>
                    </LayerDirective>
                </LayersDirective>
            </MapsComponent>
        </div>
    )
}

export default Country