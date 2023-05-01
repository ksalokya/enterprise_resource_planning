
import React, { useEffect } from 'react';
import c3 from "c3";
import dayjs from 'dayjs'
import 'c3/c3.css';
import './chart.css'

const timeNow = () => dayjs().format('YYYY-MM-DD HH:mm:ss');
const timeTail = () => dayjs().subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');

export default function C3Chart() {
    useEffect(() => {
        const chartAxis = {
            x: {
                type: 'timeseries',
                min: timeTail(),
                max: timeNow(),
                tick: {
                    fit: false,
                    rotate: -50,
                    format: '%H:%M:%S',
                }
            }
        }

        const chartData = {
            x: 'x',
            xFormat: '%Y-%m-%d %H:%M:%S',
            columns: [
                ['x',],
                ['Sales',],
                ['Customer',]
            ],
            type: "line"
        }

        let chart = c3.generate({
            bindto: '#line-chart',
            data: chartData,
            axis: chartAxis,
            size: {
                height: 400
            },
        });

        setInterval(() => {
            chart.axis.min({ x: timeTail() });
            chart.axis.max({ x: timeNow() });

            chartData.columns[0].push(timeNow());
            chartData.columns[1].push(Math.random());
            chartData.columns[2].push(Math.random());
            chart.load({ columns: chartData.columns });
        }, 1000)

    }, [])

    return (
        <div className='c3-chart'>
            <div className="chart-top">
                <p className="chart-title">Live Report</p>
            </div>
            <div id="line-chart" style={{ padding: '5px', margin: '10px' }}></div>
        </div>
    )
}