import { useEffect, useState } from 'react';
import axios from "axios";
import Grid from '@mui/material/Grid';
import StackedChart from './charts/StackedChart'
import MixedBarChart from './charts/MixedBarChart'
import TwoLevelPieChart from './charts/TwoLevelPieChart'

function Order() {
    const [mixedOrStackData, setMixedOrStack] = useState();
    const [twoLevelPieData, setTwoLevelPieData] = useState();

    // TODO ::  Handle UserID
    useEffect(() => {
        axios.get(`http://localhost:8003/api/v1/mixed-stack/get/${1}`)
            .then((res) => {
                if (res.status === 200) {
                    setMixedOrStack(res.data);
                }
            })
            .catch((err) => console.log(err))
        axios.get(`http://localhost:8003/api/v1/two-level-pie/get/${1}`)
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