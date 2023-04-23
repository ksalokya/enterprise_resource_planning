import Grid from '@mui/material/Grid';
import KanbanBoard from '../../components/kanban/Kanban'

function Kanban() {
    return (
        <Grid container sx={{ paddingLeft: 2, paddingRight: 2}}>
            <Grid item lg={12} md={12} xs={12} >
                <KanbanBoard />
            </Grid>
        </Grid>
    )
}

export default Kanban