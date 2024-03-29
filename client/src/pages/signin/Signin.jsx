import { useState, useEffect, useContext, forwardRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Lottie from 'react-lottie';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import * as animationData from "./animation.json"
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { DarkMode } from '../../App'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signin(props) {
    const navigate = useNavigate();
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

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [remembeMe, setRememberMe] = useState(false);
    const [signInError, setSignInError] = useState();
    const [signInBtnText, setSignInBtnText] = useState("Sign In");
    const [isSignInBtnEnable, setIsSignInBtnEnable] = useState(false);

    const userTyping = (type, e) => {
        switch (type) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleAuthError = () => {
        setSignInBtnText("Sign In");
        setIsSignInBtnEnable(false);
    }

    const submitSignIn = e => {
        e.preventDefault();

        setSignInBtnText("Please Wait...");
        setIsSignInBtnEnable(true);
        openSnackBar(true);

        axios.post(`${process.env.REACT_APP_AUTHENTICATION_SERVICE_URL}/authenticate`, {
            "email": email,
            "password": password,
        })
            .then((res) => {
                if (res.status === 200) {
                    let userInfo = res?.data;
                    // if (remembeMe) {
                    //     localStorage.setItem('token', userInfo.isLoggedIn);
                    // }
                    props.handleUserContext(userInfo.id, userInfo.username, userInfo.token, userInfo.isLoggedIn);
                    cloeseSnackBar();
                    navigate("/home");
                } else {
                    setSignInError("Something went wrong");
                    handleAuthError();
                }
            })
            .catch((err) => {
                setSignInError(err.response?.data?.message);
                handleAuthError();
            })
    };

    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const openSnackBar = () => setState({ ...state, open: true });
    const cloeseSnackBar = () => setState({ ...state, open: false })

    const SnackAlert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const CustomSnackBar = (
        <div>
            <Snackbar open={open} autoHideDuration={10000} onClose={cloeseSnackBar} key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }}>
                <Alert severity="info" sx={{ width: '100%' }}
                    action={
                        <IconButton style={{ display: 'none' }} />
                    }
                >
                    Waking Up Servers...
                </Alert>
            </Snackbar>
        </div >
    )

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
                                width="90%"
                            />
                        </Grid>
                        <Grid item lg={6} md={6} xs={12} sx={{ padding: 4, bgcolor: "#fff" }}>
                            <div className='top-box'>
                                <h2>Hello Again...</h2>
                                <Typography>
                                    Don't have an account?{" "}
                                    <Link to="/signup">Sign Up</Link>
                                </Typography>
                            </div>
                            <form onSubmit={submitSignIn}>
                                <Grid container spacing={4} sx={{ marginTop: 2 }}>
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
                                            onChange={e => userTyping("email", e)}
                                            helperText="Use for demo = johndoe@erp.com"
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
                                            onChange={e => userTyping("password", e)}
                                            helperText="Use for demo = erp@john"
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                        <input type="checkbox" onChange={e => setRememberMe(e.target.value)} />
                                        <span>&nbsp; Remember me</span>
                                    </Grid> */}
                                    {signInError ? (
                                        <Grid container justifyContent="center" sx={{ mt: 1 }}>
                                            <Grid item>
                                                <Alert severity="error">
                                                    <span
                                                        className="errorText">{signInError}
                                                    </span>
                                                </Alert>
                                            </Grid>
                                        </Grid>
                                    ) : null}
                                    <Grid item xs={12} sx={{ paddingTop: "20px !important" }}>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className='register-btn'
                                            disabled={isSignInBtnEnable}
                                        >
                                            {signInBtnText}
                                        </Button>
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                    <div className="forgot-password">
                                        <Typography>
                                            <Link to="/reset">Forgot Password?</Link>
                                        </Typography>
                                    </div>
                                </Grid> */}
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Box >
            </Container>
            {CustomSnackBar}
        </div>
    )
}