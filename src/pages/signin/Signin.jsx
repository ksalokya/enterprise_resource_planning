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

export default function Signin() {
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
                        <Grid item lg={6} md={6} sx={{ marginTop: 2, display: displayLottie }}>
                            <Lottie
                                options={defaultOptions}
                                isClickToPauseDisabled={true}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sx={{ padding: 4, bgcolor: "#fff" }}>
                            <div className='top-box'>
                                <h2>Hello Again!</h2>
                                <Typography>
                                    Don't have an account?{" "}
                                    <Link to="/signup">Sign Up</Link>
                                </Typography>
                            </div>
                            <form />
                            <Grid container spacing={3} sx={{ marginTop: 5 }}>
                                <Grid item xs={12}>
                                    <h4 className='top-header'>
                                        Enter your credentials to continue...
                                    </h4>
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input type="checkbox" />
                                    <span>&nbsp; Remember me.</span>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className='register-btn'
                                    >
                                        Sign In
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="forgot-password">
                                        <Typography>
                                            <Link to="/reset">Forgot Password?</Link>
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box >
            </Container>
        </div>
    )
}