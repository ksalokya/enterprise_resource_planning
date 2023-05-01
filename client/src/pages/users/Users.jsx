import Grid from '@mui/material/Grid';
import Datatable from '../../components/usertable/Datatable'

function Users() {
    return (
        <Grid
            container
            rowSpacing={3}
            columnSpacing={2}
            sx={{
                paddingLeft: 2,
                paddingRight: 2
            }}
        >
            <Grid item lg={12} md={12} xs={12}>
                <Datatable />
            </Grid>
        </Grid>
    )
}

export default Users