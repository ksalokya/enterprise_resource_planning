import { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import ComponentLoader from '../../../loader/ComponentLoader';
import '../../chart.css'

function TwoLevelPieChart(props) {
    const [loader, setLoader] = useState(true);
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