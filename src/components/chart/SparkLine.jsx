import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Legend, Category, Tooltip, ColumnSeries, DataLabel } from '@syncfusion/ej2-react-charts';


const barPrimaryXAxis = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
};

const barPrimaryYAxis = {
    majorGridLines: { width: 0 },
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    labelStyle: { color: 'transparent' },
};

const barChartData = [
    [
        { x: 'USA', y: 46 },
        { x: 'GBR', y: 27 },
        { x: 'CHN', y: 26 },
    ],
    [
        { x: 'USA', y: 37 },
        { x: 'GBR', y: 23 },
        { x: 'CHN', y: 18 },
    ],
    [
        { x: 'USA', y: 38 },
        { x: 'GBR', y: 17 },
        { x: 'CHN', y: 26 },
    ],
];

const barCustomSeries = [
    {
        dataSource: barChartData[0],
        xName: 'x',
        yName: 'y',
        name: 'Gold',
        type: 'Column',
        marker: {
            dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600', color: '#ffffff' },
            },
        },
    },
    {
        dataSource: barChartData[1],
        xName: 'x',
        yName: 'y',
        name: 'Silver',
        type: 'Column',
        marker: {
            dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600', color: '#ffffff' },
            },
        },
    },
    {
        dataSource: barChartData[2],
        xName: 'x',
        yName: 'y',
        name: 'Bronze',
        type: 'Column',
        marker: {
            dataLabel: {
                visible: true,
                position: 'Top',
                font: { fontWeight: '600', color: '#ffffff' },
            },
        },
    },
];


function SparkLine() {
    return (
        <div className="sparkline">
            <ChartComponent
                id="charts"
                primaryXAxis={barPrimaryXAxis}
                primaryYAxis={barPrimaryYAxis}
                chartArea={{ border: { width: 0 } }}
                tooltip={{ enable: true }}
                legendSettings={{ background: 'white' }}
            >
                <Inject services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]} />
                <SeriesCollectionDirective>
                    {barCustomSeries.map((item, index) => <SeriesDirective key={index} {...item} />)}
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    )
}

export default SparkLine