import Grid from '@mui/material/Grid';
import Scheduler from '../../components/calendar/Calendar'

function Calendar() {
    return (
        <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Grid item lg={12} md={12} xs={12} >
                <Scheduler />
            </Grid>
        </Grid>
    )
}

export default Calendar