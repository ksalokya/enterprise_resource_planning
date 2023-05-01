import { useState, useEffect, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Lottie from 'react-lottie';
import Typography from '@mui/material/Typography';
import * as animationData from "./animation.json"
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { DarkMode } from '../../App'

export default function Signup() {
    const isDarkModeEnabled = useContext(DarkMode);
    const matches = useMediaQuery('(max-width:900px)');
    const [displayLottie, setDisplayLottie] = useState('default');

    useEffect(() => {
        if (matches) setDisplayLottie('none');
        else setDisplayLottie('default');
    }, [matches])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className={`main ${isDarkModeEnabled ? 'main-dark' : 'main-light'}`}>
            <CssBaseline />
            <Container maxWidth="lg" className='box'>
                <Box sx={{ bgcolor: 'rgba(255, 255, 255, .5)', borderRadius: '20px' }}>
                    <Grid container>
                        <Grid item lg={6} md={6} sx={{ display: displayLottie }}>
                            <Lottie
                                options={defaultOptions}
                                isClickToPauseDisabled={true}
                                height={600}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sx={{ padding: 4, bgcolor: "#fff" }}>
                            <div className='top-box'>
                                <h2>Get Started!</h2>
                                <Typography>
                                    Already have an account?{" "}
                                    <Link to="/signin">Sign In</Link>
                                </Typography>
                            </div>
                            <form />
                            <Grid container spacing={3} sx={{ marginTop: 2 }}>
                                <Grid item xs={12}>
                                    <TextField
                                        style={{ color: "#ffffff" }}
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="off"
                                        defaultValue="johndoe"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        style={{ color: "#ffffff" }}
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="off"
                                        defaultValue="johndoe@dashboard.com"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="off"
                                        defaultValue="12345678"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        name="passwordConfirmation"
                                        label="Password Confirmation"
                                        type="password"
                                        id="password-confirmation"
                                        autoComplete="off"
                                        defaultValue="12345678"
                                    />
                                </Grid>
                                <Grid item xs={12} className="agreement">
                                    <input type="checkbox" />
                                    <span>&nbsp; I agree to Plataform's &nbsp;
                                        <a href="#">Terms of Service</a> and&nbsp;
                                        <a href="#">Privacy Policy.</a>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to="/home" style={{ textDecoration: "none", color: "#ffffff" }}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className='register-btn'
                                        >
                                            Sign Up
                                        </Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box >
            </Container>
        </div >
    )
}