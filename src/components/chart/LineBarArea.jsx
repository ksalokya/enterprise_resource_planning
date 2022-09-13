import { useState, useEffect } from 'react';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
} from 'recharts';

// const data = [
//     {
//         name: 'Page A',
//         uv: 590,
//         pv: 800,
//         amt: 1400,
//         cnt: 490,
//     },
//     {
//         name: 'Page B',
//         uv: 868,
//         pv: 967,
//         amt: 1506,
//         cnt: 590,
//     },
//     {
//         name: 'Page C',
//         uv: 1397,
//         pv: 1098,
//         amt: 989,
//         cnt: 350,
//     },
//     {
//         name: 'Page D',
//         uv: 1480,
//         pv: 1200,
//         amt: 1228,
//         cnt: 480,
//     },
//     {
//         name: 'Page E',
//         uv: 1520,
//         pv: 1108,
//         amt: 1100,
//         cnt: 460,
//     },
//     {
//         name: 'Page F',
//         uv: 1400,
//         pv: 680,
//         amt: 1700,
//         cnt: 380,
//     },
// ];

function LineBarArea() {

    const [data, setData] = useState([{
        cpu: 4000,
        mem: 2400,
        net: 2400,
        disk: 2000
    },]);

    useEffect(() => {
        setInterval(() => {
            let a = Math.floor(Math.random() * (1500 - 1000 + 1) + 1000)
            let b = Math.floor(Math.random() * (1000 - 800 + 1) + 800)
            let c = Math.floor(Math.random() * (800 - 500 + 1) + 500)
            let d = Math.floor(Math.random() * (500 - 300 + 1) + 300)

            setData([{ cpu: a, mem: b, net: c, disk: d }, { cpu: 1.2 * a, mem: 1.5 * b, net: 0.8 * c, disk: 0.5 * d },
            { cpu: 1.5 * a, mem: 0.8 * b, net: 0.5 * c, disk: 2 * d }, { cpu: a, mem: 1.3 * b, net: 0.5 * c, disk: 0.8 * d },
            { cpu: 1.2 * a, mem: 0.5 * b, net: 0.6 * c, disk: d }, { cpu: 1.5 * a, mem: 1.1 * b, net: 0.7 * c, disk: 0.4 * d }])
        }, 4000)
    }, [])

    return (
        <div className="line-bar-area">
            <ResponsiveContainer width="100%" height="100%">
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
                    <Area type="monotone" dataKey="cpu" fill="#8884d8" stroke="#8884d8" />
                    <Bar dataKey="mem" barSize={20} fill="#413ea0" />
                    <Line type="monotone" dataKey="net" stroke="#ff7300" />
                    <Scatter dataKey="disk" fill="red" />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineBarArea