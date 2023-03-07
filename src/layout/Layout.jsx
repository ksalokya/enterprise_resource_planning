import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

export default function Layout(props) {
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
                <Navbar sidebar={open ? handleClose : handleOpen} />
                <Outlet />
            </Grid>
        </Grid>
    )
}