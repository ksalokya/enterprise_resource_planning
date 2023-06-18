import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { LineChart, Line, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'

function MultipleChart() {

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
        }, 4000)
    }, [])

    return (
        <Grid container
            className="multi-chart-row"
        >
            <Grid item lg={6} md={6} xs={6} sx={{ mt: 2 }}>
                <ResponsiveContainer width="100%" height={120} >
                    <LineChart className='small-charts' width={200} height={120} data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Line type="monotone" dataKey="CPU" stroke="rgb(30, 183, 255)" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item lg={6} md={6} xs={6} sx={{ mt: 2 }}>
                <ResponsiveContainer width="100%" height={120}>
                    <LineChart className='small-charts' width={200} height={120} data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Line type="monotone" dataKey="Memory" stroke="rgb(202, 142, 255)" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item lg={6} md={6} xs={6}  >
                <ResponsiveContainer width="100%" height={120} >
                    <LineChart className='small-charts' width={210} height={120} data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Line type="monotone" dataKey="Traffic" stroke="rgb(27, 185, 52)" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Grid>
            <Grid item lg={6} md={6} xs={6} >
                <ResponsiveContainer width="100%" height={120} >
                    <LineChart className='small-charts' width={210} height={120} data={data}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <Legend />
                        <Line type="monotone" dataKey="Disk" stroke="rgb(247, 191, 71)" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Grid>
        </Grid >
    )
}

export default MultipleChart

