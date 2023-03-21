import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

export default function Layout(props) {
    const matches = useMediaQuery('(max-width:1300px)');
    const [open, setOpen] = useState(true);
    const [displaySidebar, setDisplaySidebar] = useState("default");
    const [displayNavbar, setDisplayNavbar] = useState("default");
    const [sbar, setSbar] = useState(1.5);
    const [nbar, setNbar] = useState(10.5);
    
    const handleOpen = () => {
        setOpen(true);
        setDisplaySidebar("default");
        if (matches) {
            setDisplayNavbar("none");
            setSbar(12);
            setNbar(0);
        } else {
            setDisplayNavbar("default");
            setSbar(1.5);
            setNbar(10.5);
        }
    }
    const handleClose = () => {
        setDisplaySidebar("none");
        setDisplayNavbar("default");
        setSbar(0);
        setNbar(12);
        setOpen(false);
    }
    useEffect(() => {
        if (matches) handleClose();
        else handleOpen();
    }, [matches])

    return (
        <Grid container>
            <Grid item xs={sbar} sx={{ display: displaySidebar }}>
                <Sidebar sidebar={matches ? handleClose : handleOpen} />
            </Grid>
            <Grid item xs={nbar} sx={{ display: displayNavbar }}>
                <Navbar sidebar={open ? handleClose : handleOpen} handle={props.handle}/>
                <Outlet />
            </Grid>
        </Grid>
    )
}