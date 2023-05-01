import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'

export default function Layout(props) {
    const matches = useMediaQuery('(max-width:1200px)');
    const [open, setOpen] = useState(false);
    const [helper, setHelper] = useState(false);
    const [displaySidebar, setDisplaySidebar] = useState("none");
    const [displayNavbar, setDisplayNavbar] = useState("default");
    const [sbar, setSbar] = useState(0);
    const [nbar, setNbar] = useState(12);


    const showFullSideBar = () => {
        setOpen(true);
        setDisplaySidebar("default");
        setDisplayNavbar("none");
        setSbar(12);
        setNbar(0);
    }

    const showPartialSideBar = () => {
        setOpen(true);
        setHelper(false);
        setDisplaySidebar("default");
        setDisplayNavbar("default");
        setSbar(1.5);
        setNbar(10.5);
    }

    const handleOpen = (expression) => {
        switch (expression) {
            case 'useEffect':
                if (matches) showFullSideBar();
                else if (!helper || (!open && helper && !matches)) handleClose();
                else showPartialSideBar();
                break;
            case 'function':
                if (matches) showFullSideBar();
                else showPartialSideBar();
                break;
            default:
                return;
        }
    }

    const handleClose = () => {
        setDisplaySidebar("none");
        setDisplayNavbar("default");
        setSbar(0);
        setNbar(12);
        setOpen(false);
        setHelper(true);
    }

    useEffect(() => {
        if (matches) handleClose('useEffect');
        else handleOpen();
    }, [matches])

    return (
        <Grid container>
            <Grid
                item
                xs={sbar}
                sx={{
                    display: displaySidebar
                }}
            >
                <Sidebar
                    sidebar={() => matches ? handleClose() : handleOpen('function')}
                />
            </Grid>
            <Grid item xs={nbar} sx={{ display: displayNavbar }}>
                <Navbar
                    open={open}
                    sidebar={() => open ? handleClose() : handleOpen('function')}
                    handleDarkMode={props.handleDarkMode}
                />
                <Outlet />
            </Grid>
        </Grid>
    )
}