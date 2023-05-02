import Grid from '@mui/material/Grid';
import WorldMap from '../../components/map/Worldmap'
import Country from '../../components/map/Country'
import Network from '../../components/map/Network'
import { useMediaQuery } from '@mui/material';

function Delivery() {
    const matches = useMediaQuery('(max-width:900px)')
    return (
        <Grid direction={matches ? "column" : ''} container sx={{ paddingLeft: 2, paddingRight: 2 }} columnSpacing={2}>
            <Grid item lg={6} md={6} xs={6} >
                <WorldMap />
            </Grid>
            <Grid item lg={6} md={6} xs={6} sx={{ mt: matches ? 3 : '' }}>
                <Grid item xs>
                    <Country />
                </Grid>
                <Grid item xs sx={{ mt: 2 }}>
                    <Network />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Delivery