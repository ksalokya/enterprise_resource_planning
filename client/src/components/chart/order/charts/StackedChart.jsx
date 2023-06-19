import { useEffect, useState } from 'react';
import { AreaChart, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ComponentLoader from '../../../loader/ComponentLoader';
import "../../chart.css"

function StackedChart(props) {
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        props.data && setLoader(false);
    }, [props.data])

    return (
        <div className='stacked-chart'>
            {
                loader ?
                    <ComponentLoader position="relative" width={400} />
                    :
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
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
                            <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
                            <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                            <Area type="monotone" dataKey="value" stackId="1" stroke="#ffc658" fill="#ffc658" />
                        </AreaChart>
                    </ResponsiveContainer>
            }
        </div>
    )
}

export default StackedChart