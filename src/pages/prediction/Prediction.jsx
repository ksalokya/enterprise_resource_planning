import Grid from '@mui/material/Grid';
import PredictionChart from "../../components/chart/PredictionChart";

export default function Prediction() {
    return (
        <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Grid item lg={12} md={12} xs={12} >
                <PredictionChart />
            </Grid>
        </Grid >
    )
}