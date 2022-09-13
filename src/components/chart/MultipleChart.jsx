import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './chart.css'


function MultipleChart() {

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
        <div className="multi-chart">
            <div className="multi-chart-row1">
                <LineChart className='small-charts' width={200} height={100} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="cpu" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>

                <LineChart className='small-charts' width={200} height={100} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="mem" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>

            <div className="multi-chart-row2">
                <LineChart className='small-charts' width={200} height={100} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="net" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>

                <LineChart className='small-charts' width={200} height={100} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="disk" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </div>
    )
}

export default MultipleChart