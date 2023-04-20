import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import {useNavigate} from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { TextField, Box } from '@mui/material';
import { message } from 'antd';
import '../styles/SignUp.css';
import {useDispatch,useSelector} from 'react-redux';
import {checkAuthenticated} from '../redux/actions/authActions';

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {isAuthenticated}=useSelector((state)=>state.auth);
    useEffect(()=>{
        if(isAuthenticated){
            navigate('/admin/')
        }
    },[dispatch,isAuthenticated,navigate])
    async function handleSubmit() {
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/login', {
            username,
            password
        }, { withCredentials: true }).then(res => {
            dispatch(checkAuthenticated())
            messageApi.open({
                type: 'success',
                content: 'Logged in Successfully',
            });
            navigate('/admin');

        }).catch(err => {
            messageApi.open({
                type: 'error',
                content: err.response.data.message,
            });
            console.clear();
        })
    }
    return (
        <>
            {contextHolder}
            <Helmet>
                <title>Login | LinkBowl</title>
            </Helmet>
            <Container fluid>
                <Row style={{ width: "100vw", height: "100vh" }}>
                    <Col className="col-md-12 col-lg-6">
                        <h1 className="logoTitle" style={{ textAlign: "start", margin: "10px 20px" }}>Link<span className='logoTitle-span'>Bowl</span></h1>
                        <h1 className="login-title">Welcome Back to LinkBowl</h1>
                        <Box>
                            <TextField fullWidth label="Username" type="text" className="login-field" autoComplete='username' value={username} required onChange={(e) => {
                                setUsername(e.target.value);
                            }} />
                            <TextField fullWidth label="Password" type="password" className="login-field" autoComplete='current-password' value={password} required onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                            <Button variant="primary" className="App-primaryBtn login-btn" type='submit' onClick={handleSubmit}>SIGN IN</Button>
                            <p className='logoTitle-span' style={{ fontFamily: "Itim,cursive", fontSize: "16px", textAlign: "center",margin:"5px" }}><a href="/request-reset-password" className="logoTitle" style={{ textDecoration: "none" }}>Forgot Password..?</a></p>
                            <p className='logoTitle-span' style={{ fontFamily: "Itim,cursive", fontSize: "16px", textAlign: "center" }}>Do you haven't an account..? <a href="/register" className="logoTitle" style={{ textDecoration: "none" }}>Sign Up</a></p>
                        </Box>
                    </Col>
                    <Col className="col-12 col-sm-12 col-lg-6 login-side-img" style={{ backgroundColor: "white" }}>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default SignIn;