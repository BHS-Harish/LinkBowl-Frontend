import React, { useState } from 'react';
import './reset-password.css';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { TextField } from '@mui/material';
import {message} from 'antd';
import {useSearchParams,useNavigate} from 'react-router-dom';
import logo from '../asset/lb-png.png';
import axios from 'axios';
function RequestResetPassword() {
    const [queryParameters]=useSearchParams();
    const navigate=useNavigate();
    const [email, setEmail] = useState(queryParameters.get("email"));
    const [messageApi, contextHolder] = message.useMessage();
    async function handleSubmit(e){
        e.preventDefault();
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/requestResetPassword',{
            email
        },{withCredentials:true}).then((response)=>{
            messageApi.open({
                type:'success',
                content:'Please Check Your Email for Further Process',
                duration:8
            })
            setEmail("");
            setTimeout(()=>{
                navigate('/');
            },10000)
        }).catch((err)=>{
            messageApi.open({
                type:'error',
                content:err.response.data.message
            })
            setEmail("");
        })
    }
    return (
        <>
            {contextHolder}
            <Helmet>
                <title>Request Reset Password | LinkBowl</title>
            </Helmet>
            <Container fluid className="d-flex justify-content-center align-items-center vh-100 requestresetpass">
                <div className="requestresetpass-container">
                    <img src={logo} alt="logo" />
                    <h4>Request Reset Password</h4>
                    <form onSubmit={handleSubmit}>
                        <TextField fullWidth label="Email" type="email" className="login-field" autoComplete='email' value={email} required onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                        <button type="submit">Request to Reset</button>
                    </form>
                    <button onClick={()=>{
                        if(queryParameters.get('email'))
                            navigate('/admin/profile');
                        else
                            navigate('/login');
                    }}>Back to Home</button>
                </div>
            </Container>
        </>
    )
}
export default RequestResetPassword;