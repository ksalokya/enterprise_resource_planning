import { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import ComponentLoader from '../../../loader/ComponentLoader';
import '../../chart.css'

// const data01 = [
//     { name: 'Group A', value: 400 },
//     { name: 'Group B', value: 300 },
//     { name: 'Group C', value: 300 },
//     { name: 'Group D', value: 200 },
// ];

// const data02 = [
//     { name: 'A1', value: 100 },
//     { name: 'A2', value: 300 },
//     { name: 'B1', value: 100 },
//     { name: 'B2', value: 80 },
//     { name: 'B3', value: 40 },
//     { name: 'B4', value: 30 },
//     { name: 'B5', value: 50 },
//     { name: 'C1', value: 100 },
//     { name: 'C2', value: 200 },
//     { name: 'D1', value: 150 },
//     { name: 'D2', value: 50 },
// ];

function TwoLevelPieChart(props) {
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        props.data && props.group && setLoader(false);
    }, [props.data, props.group])

    return (
        <div className="two-level-pie-chart">
            {
                loader ?
                    <ComponentLoader position="relative" width={400} />
                    :
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie data={props?.group} dataKey="value" cx="50%" cy="50%" outerRadius={70} fill="#8884d8" />
                            <Pie data={props?.data} dataKey="value" cx="50%" cy="50%" innerRadius={80} outerRadius={100} fill="#82ca9d" label />
                        </PieChart>
                    </ResponsiveContainer>
            }
        </div>
    )
}

export default TwoLevelPieChart