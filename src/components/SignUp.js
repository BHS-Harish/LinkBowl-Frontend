import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TextField, Alert, Backdrop, CircularProgress } from '@mui/material';
import axios from 'axios';
import '../styles/SignUp.css';

function SignUp() {
    const [backDrop, setBackDrop] = useState(false);
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const [allowToSignUp, setAllowToSignUp] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isVerifiedUsername, setIsVerifiedUsername] = useState(false);
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [isVerifiedPassword, setIsVerifiedPassword] = useState(false);
    //To check the Username
    async function checkUserNameFunc() {
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/checkUserName', {
            username
        }).then(response => {
            setUsernameError("");
            setIsVerifiedUsername(true)
        }).catch(err => {
            setUsernameError(err.response.data.message);
            setIsVerifiedUsername(false)
        })
    }

    //To check the email
    async function checkEmailIdFunc() {
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/checkEmailId', {
            emailId: email
        }).then(response => {
            setEmailError("");
            setIsVerifiedEmail(true)
        }).catch(err => {
            setEmailError(err.response.data.message);
            setIsVerifiedEmail(false)
        })
    }
    useEffect(() => {
        checkUserNameFunc();
        //eslint-disable-next-line
    }, [username])
    useEffect(() => {
        checkEmailIdFunc();
        //eslint-disable-next-line
    }, [email])
    useEffect(() => {
        if (password && password.length >= 8) {
            setPasswordError("")
            setIsVerifiedPassword(true);
        }
        else {
            setPasswordError("Password must be above 8 Characters ")
            setIsVerifiedPassword(false)
        }
    }, [password])
    useEffect(() => {

        if (isVerifiedEmail && isVerifiedUsername && isVerifiedPassword && (username.match(/[\W]/g))==null)
            setAllowToSignUp(false)
        else
            setAllowToSignUp(true)
    }, [isVerifiedEmail, isVerifiedPassword, isVerifiedUsername,username])

    //Submit Function
    async function handleSubmit() {
        setBackDrop(true);
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/register', {
            username,
            email,
            name: username,
            password
        }).then(res => {
            console.log(res.data);
            if (res.data.success === true && res.data.email === "sent") {
                setBackDrop(false);
                <Alert severity="success">Registration Successfull...</Alert>
                setIsSignupSuccess(true);
            }
        }).catch(err => {

        })
    }

    return (
        <>
            <Helmet>
                <title>Register | LinkBowl</title>
            </Helmet>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backDrop}
                onClick={()=>{
                    setBackDrop(!backDrop);
                }}
            >
                <CircularProgress color="primary" />
            </Backdrop>
            {isSignupSuccess ?
                <Container className="d-flex flex-column justify-content-center align-items-center" style={{ width: "100vw", height: "100vh" }}>
                    <h1 style={{ color: "#000AFF", textAlign: "center" }}>Verification Link sent to Your Registered Email</h1>
                    <h3 style={{ color: "#E87A7A", textAlign: "center" }}>Please verify to proceed further steps</h3>
                </Container>
                :
                <Container fluid>
                    <Row style={{ width: "100vw", height: "100vh" }}>
                        <Col className="col-12 col-sm-12 col-lg-6 login-side-img" style={{ backgroundColor: "white" }}>

                        </Col>
                        <Col className="col-md-12 col-lg-6">
                            <h1 className="logoTitle" style={{ textAlign: "end", margin: "10px 20px" }}>Link<span className='logoTitle-span'>Bowl</span></h1>
                            <h1 className="login-title">Create an New Account</h1>
                            <form onSubmit={(e)=>{
                                e.preventDefault();
                                handleSubmit();
                            }}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    label="Username"
                                    helperText={usernameError}
                                    className="login-field"
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                    }}
                                    value={username}
                                    autoComplete='username'
                                    required
                                />
                                <TextField
                                    fullWidth
                                    type={'email'}
                                    label="Email"
                                    helperText={emailError}
                                    className="login-field"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    value={email}
                                    autoComplete='email'
                                    required
                                />
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    helperText={passwordError}
                                    className="login-field"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    value={password}
                                    autoComplete='current-password'
                                    required
                                />
                                <Button type='submit' variant="primary" className="App-primaryBtn login-btn" disabled={allowToSignUp}>SIGN UP</Button>
                                <p className='logoTitle-span' style={{ fontFamily: "Itim,cursive", fontSize: "16px", textAlign: "center" }}>Do you already have an account..? <a href="/login" className="logoTitle" style={{ textDecoration: "none" }}>Sign In</a></p>
                            </form>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}

export default SignUp;