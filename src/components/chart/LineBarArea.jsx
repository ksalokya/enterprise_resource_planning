import { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';


function LineBarArea() {

    const [data, setData] = useState([{
        CPU: 4000,
        Memory: 2400,
        Traffic: 2400,
        Disk: 2000
    },]);

    useEffect(() => {
        setInterval(() => {
            let a = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000)
            let b = Math.floor(Math.random() * (1000 - 800 + 1) + 800)
            let c = Math.floor(Math.random() * (800 - 500 + 1) + 500)
            let d = Math.floor(Math.random() * (500 - 300 + 1) + 300)

            setData([{ CPU: a, Memory: b, Traffic: c, Disk: d }, { CPU: 1.2 * a, Memory: 1.5 * b, Traffic: 0.8 * c, Disk: 0.5 * d },
            { CPU: 1.5 * a, Memory: 0.8 * b, Traffic: 0.5 * c, Disk: 2 * d }, { CPU: a, Memory: 1.3 * b, Traffic: 0.5 * c, Disk: 0.8 * d },
            { CPU: 1.2 * a, Memory: 0.5 * b, Traffic: 0.6 * c, Disk: d }, { CPU: 1.5 * a, Memory: 1.1 * b, Traffic: 0.7 * c, Disk: 0.4 * d }])
        }, 6000)
    }, [])

    return (
        <div className="line-bar-area">
            <ResponsiveContainer height="100%">
                <ComposedChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="CPU" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="Memory" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="Traffic" stroke="rgb(27, 185, 52)" />
                    <Scatter dataKey="Disk" fill="rgb(247, 191, 71)" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineBarArea