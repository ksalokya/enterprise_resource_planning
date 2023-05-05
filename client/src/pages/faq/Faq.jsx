import Grid from '@mui/material/Grid';
import FaqList from "../../components/faq/FaqList"

function Faq() {
    return (
        <Grid container sx={{ paddingLeft: 2, paddingRight: 2 }}>
            <Grid item lg={12} md={12} xs={12} >
                <FaqList />
            </Grid>
        </Grid>
    )
}

export default Faq