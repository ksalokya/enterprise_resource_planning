import Grid from '@mui/material/Grid';
import Spreadsheet from '../../components/sheet/Spreadsheet'

function Sheet() {
    return (
        <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Grid item lg={12} md={12} xs={12} >
                <Spreadsheet />
            </Grid>
        </Grid>
    )
}

export default Sheet