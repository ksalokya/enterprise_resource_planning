import { useState, useEffect } from 'react';
import { AreaChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './chart.css'

function MonitorChart() {

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
            <div className="monitor-chart">
                <ResponsiveContainer width="100%" height="95%">
                    <AreaChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="cpu" stackId="1" stroke="rgb(5, 157, 227)" fill="rgb(5, 157, 227)" />
                        <Area type="monotone" dataKey="mem" stackId="1" stroke="rgb(202, 142, 255)" fill="rgb(202, 142, 255)" />
                        <Area type="monotone" dataKey="net" stackId="1" stroke="rgb(27, 185, 52)" fill="rgb(27, 185, 52)" />
                        <Area type="monotone" dataKey="disk" stackId="1" stroke="rgb(247, 191, 71)" fill="rgb(247, 191, 71)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
    )
}

export default MonitorChart