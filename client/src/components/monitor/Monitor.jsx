import { useState, useEffect, useContext } from 'react'
import { DarkMode } from '../../App';
import TinyChart from '../../components/chart/TinyChart'
import TinyBarChart from '../chart/TinyBarChart'
import './monitor.css'

function Monitor(props) {
    const isDarkModeEnabled = useContext(DarkMode);

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
                <span className={`monitor-title ${isDarkModeEnabled && 'monitor-title-dark'}`}>{props.title}</span>
                <span className={`monitor-unit ${isDarkModeEnabled && 'monitor-unit-dark'}`}>{props.unit}</span>
                <TinyBarChart color={props.color} />
            </div>
            <div className="monitor-right">
                <TinyChart
                    value={value}
                    color={props.color}
                />
            </div>
        </div >
    )
}

export default Monitor