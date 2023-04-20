import React, { useState,useEffect } from 'react';
import './reset-password.css';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { message } from 'antd';
import { TextField,CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../asset/lb-png.png';
import axios from 'axios';
function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const[npMsg,setNpMsg]=useState("Password contains minimum 8 characters");
    const[cpMsg,setCpMsg]=useState("Password contains minimum 8 characters");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [flag, setFlag] = useState(true);
    const navigate = useNavigate();
    const { token } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const [allowToReset, setAllowToReset] = useState(false);
    const[tokenId,setTokenId]=useState("");
    async function RequestToReset(){
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/verifyResetEmail',{
            token:token
        },{withCredentials:true}).then((response)=>{
            setFlag(!response.data.success);
            messageApi.open({
                type:'success',
                content:response.data.message,
                duration:5
            })
            setTokenId(response.data.tokenId);
        }).catch((err)=>{
            messageApi.open({
                type:'error',
                content:err.response.data.message,
                duration:5
            })
            setTimeout(()=>{
                navigate("/");
            },5000)
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/resetpassword',{
            token:tokenId,
            newPassword
        },{withCredentials:true}).then((response)=>{
            setFlag(!response.data.success);
            messageApi.open({
                type:'success',
                content:response.data.message,
                duration:5
            })
            setTimeout(()=>{
                navigate("/login");
            },5000)
        }).catch((err)=>{
            messageApi.open({
                type:'error',
                content:err.response.data.message,
                duration:5
            })
            setTimeout(()=>{
                navigate("/");
            },5000)
        })
    }
    useEffect(()=>{
        if(token)
            RequestToReset();
    },[])
    useEffect(()=>{
        if((newPassword===confirmPassword)&&(newPassword.length>=8)&&(confirmPassword.length>=8))
            setAllowToReset(true);
        else
            setAllowToReset(false);
    },[newPassword,confirmPassword])
    useEffect(()=>{
        if(newPassword.length>=8)
            setNpMsg("");
        else
            setNpMsg("Password contains minimum 8 characters");
    },[newPassword])
    useEffect(()=>{
        if(confirmPassword.length>=8)
            setCpMsg("");
        else
            setCpMsg("Password contains minimum 8 characters");
    },[confirmPassword])
    return (
        <>
            {contextHolder}
            <Helmet>
                <title>Reset Password | LinkBowl</title>
            </Helmet>
            <Container fluid className="d-flex justify-content-center align-items-center vh-100 requestresetpass">
                {
                    flag ?
                        <div className="requestresetpass-container resetpass-container justify-content-center">
                            <CircularProgress/>
                            <h4 style={{margin:"20px"}}>Please wait a seconds..</h4>
                        </div>
                        :
                        <div className="requestresetpass-container resetpass-container">
                            <img src={logo} alt="logo" />
                            <h4>Reset Password</h4>
                            <form onSubmit={handleSubmit} >
                                <TextField fullWidth label="New Password" helperText={npMsg} minLength="8" type="password" className="login-field" autoComplete='newpassword' value={newPassword} required onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }} />
                                <TextField fullWidth label="Confirm Password" helperText={cpMsg} minLength="8" type="password" className="login-field" autoComplete='newpassword' value={confirmPassword} required onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }} />
                                <button type="submit" disabled={!allowToReset}>Request to Reset</button>
                            </form>
                        </div>
                }

            </Container>
        </>
    )
}
export default ResetPassword;