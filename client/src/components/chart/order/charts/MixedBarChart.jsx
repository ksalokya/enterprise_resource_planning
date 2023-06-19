import { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ComponentLoader from '../../../loader/ComponentLoader';
import '../../chart.css'

function MixedBarChart(props) {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        props.data && setLoader(false);
    }, [props.data])

    return (
        <div className="mixed-bar-chart">
            {
                loader ?
                    <ComponentLoader position="relative" width={400} />
                    :
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={props?.data}
                            margin={{
                                top: 20,
                                right: 10,
                                left: 10,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                            <Bar dataKey="value" stackId="a" fill="#82ca9d" />
                            <Bar dataKey="uv" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
            }
        </div>
    )
}

export default MixedBarChart