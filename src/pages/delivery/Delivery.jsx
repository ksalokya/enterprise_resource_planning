import Grid from '@mui/material/Grid';
import WorldMap from '../../components/map/Worldmap'
import Country from '../../components/map/Country'
import Network from '../../components/map/Network'

function Delivery() {
    return (
        <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }} columnSpacing={2}>
            <Grid item lg={6} md={6} xs={12} >
                <WorldMap />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
                <Grid item xs>
                    <Country />
                </Grid>
                <Grid item xs sx={{mt: 2}}>
                    <Network />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Delivery