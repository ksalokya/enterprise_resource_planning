import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../../App';
import axios from "axios";
import Grid from '@mui/material/Grid';
import StackedChart from './charts/StackedChart'
import MixedBarChart from './charts/MixedBarChart'
import TwoLevelPieChart from './charts/TwoLevelPieChart'

function Order() {
    const userContext = useContext(UserContext);
    const [mixedOrStackData, setMixedOrStack] = useState();
    const [twoLevelPieData, setTwoLevelPieData] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_CHART_DATA_SERVICE_URL}/mixed-stack/get/${parseInt(userContext?.userId)}`)
            .then((res) => {
                if (res.status === 200) {
                    setMixedOrStack(res.data);
                }
            })
            .catch((err) => console.log(err))
        axios.get(`${process.env.REACT_APP_CHART_DATA_SERVICE_URL}/two-level-pie/get/${parseInt(userContext?.userId)}`)
            .then((res) => {
                if (res.status === 200) {
                    setTwoLevelPieData(res.data);
                }
            })
            .catch((err) => console.log(err))
    }, []);

    return (
        <>
            <Grid item lg={4} md={6} xs={12}>
                <StackedChart data={mixedOrStackData} />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
                <MixedBarChart data={mixedOrStackData} />
            </Grid>
            <Grid item lg={4} md={12} xs={12}>
                <TwoLevelPieChart data={twoLevelPieData?.data} group={twoLevelPieData?.group} />
            </Grid>
        </>
    )
}

export default Order