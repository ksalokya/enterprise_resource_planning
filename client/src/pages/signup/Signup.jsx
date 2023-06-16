import { useState, useEffect, useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Lottie from 'react-lottie';
import Typography from '@mui/material/Typography';
import * as animationData from "./animation.json"
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { DarkMode } from '../../App'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const isDarkModeEnabled = useContext(DarkMode);
    const matches = useMediaQuery('(max-width:900px)');
    const [displayLottie, setDisplayLottie] = useState('default');

    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [policy, setPolicy] = useState(false);
    const [signUpError, setSignUpError] = useState();
    const [signUpBtnText, setSignUpBtnText] = useState("Sign Up");
    const [isSignUpBtnEnable, setIsSignUpBtnEnable] = useState(false);

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

    const formIsValid = () => password === confirmPassword

    const userTyping = (type, e) => {
        switch (type) {
            case "username":
                setUserName(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "confirmPassword":
                setConfirmPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleServerError = () => {
        setSignUpError("Something went wrong");
        setSignUpBtnText("Sign Up");
        setIsSignUpBtnEnable(false);
    }

    const submitSignup = e => {
        e.preventDefault();

        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (!(email && email.match(isValidEmail))) {
            setSignUpError("The email address is badly formatted.");
            return;
        }

        if (!formIsValid()) {
            setSignUpError("Passwords do not match!");
            return;
        }

        if (!policy) {
            setSignUpError("Please agree to Plataform's  Terms of Service and Privacy Policy.");
            return;
        }

        setSignUpBtnText("Please Wait...");
        setIsSignUpBtnEnable(true);

        axios.post(`${process.env.REACT_APP_AUTHENTICATION_SERVICE_URL}/new`, {
            "name": username,
            "email": email,
            "password": password,
            "role": "USER"
        })
            .then((res) => {
                if (res.status === 200 && res.data === "User registered successfully") {
                    navigate("/signin")
                } else {
                    handleServerError();
                }
            })
            .catch((err) => {
                handleServerError();
            })
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
                            <form onSubmit={submitSignup}>
                                <Grid container spacing={3} sx={{ marginTop: 2 }}>
                                    <Grid item xs={12}>
                                        <TextField
                                            style={{ color: "#ffffff" }}
                                            variant="outlined"
                                            required={true}
                                            fullWidth
                                            id="username"
                                            label="Full Name"
                                            name="username"
                                            autoComplete="off"
                                            // defaultValue="johndoe"
                                            onChange={e => userTyping("username", e)}
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
                                            // defaultValue="johndoe@dashboard.com"
                                            onChange={e => userTyping("email", e)}
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
                                            // defaultValue="12345678"
                                            onChange={e => userTyping("password", e)}
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
                                            // defaultValue="12345678"
                                            onChange={e => userTyping("confirmPassword", e)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} className="agreement">
                                        <input type="checkbox" onChange={e => setPolicy(e.target.value)} />
                                        <span>&nbsp; I agree to Plataform's &nbsp;
                                            <a href="#">Terms of Service</a> and&nbsp;
                                            <a href="#">Privacy Policy.</a>
                                        </span>
                                    </Grid>
                                    {signUpError ? (
                                        <Grid container justifyContent="center">
                                            <Grid item>
                                                <Alert severity="error">
                                                    <span
                                                        className="errorText">{signUpError}
                                                    </span>
                                                </Alert>
                                            </Grid>
                                        </Grid>
                                    ) : null}
                                    <Grid item xs={12}>
                                        {/* <Link to="/home" style={{ textDecoration: "none", color: "#ffffff" }}> */}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className='register-btn'
                                            disabled={isSignUpBtnEnable}
                                        >
                                            {signUpBtnText}
                                        </Button>
                                        {/* </Link> */}
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Box >
            </Container>
        </div >
    )
}