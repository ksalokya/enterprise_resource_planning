import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Datatable from '../../components/usertable/Datatable'

function Users(props) {

    const [open, setOpen] = useState(true);
    const [sbar, setSbar] = useState("default");
    const [nbar, setNbar] = useState(10.5);
    const handleOpen = () => {
        setSbar("default");
        setNbar(10.5);
        setOpen(true);
    }
    const handleClose = () => {
        setSbar("none");
        setNbar(12);
        setOpen(false);
    }

    return (
        <Grid container>
            <Grid item xs={1.5} sx={{ display: sbar }}>
                <Sidebar />
            </Grid>
            <Grid item xs={nbar}>
                <Navbar handle={props.handle} sidebar={open ? handleClose : handleOpen} />
                <Grid container sx={{ paddingLeft: 1, paddingRight: 1 }} >
                    <Grid item lg={12} md={6} xs={12}>
                        <Datatable />
                    </Grid>
                </Grid>
            </Grid >
        </Grid>
    )
}

export default Users