import { useState, useEffect } from 'react'
import TinyChart from '../../components/chart/TinyChart'
import './monitor.css'

function Monitor(props) {
    let max = 100, min = 1
    const [value, setValue] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setValue(Math.floor(Math.random() * (max - min + 1) + min))
        }, 3000)
    }, [])

    return (
        <div className="monitor">
            <div className="monitor-left">
                <span className="monitor-title">{props.title}</span>
                <span className="monitor-unit">{props.unit}</span>
            </div>
            <div className="monitor-right">
                <TinyChart
                    value={value}
                    color={props.color}
                />
            </div>
        </div>
    )
}

export default Monitor