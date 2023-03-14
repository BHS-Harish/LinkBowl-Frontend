import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Navbar,Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinearProgress, Box } from '@mui/material';
import logo from '../asset/lb-png.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {

    const [isVerified, setIsVerified] = useState(false);
    const[userFound,setUserFound]=useState(false);
    const [showMessage, setShowMessage] = useState("Verification in Progress...");
    const navigate=useNavigate();
    const { token } = useParams();
    useEffect(()=>{
        setTimeout(()=>{
            verifyUserFunc();
        },2000)
    },[])
    async function verifyUserFunc(){
        axios.post('https://cdn-linkbowl.onrender.com/api/v1/auth',{
            token:token
        },{withCredentials:true}).then(res=>{
            setIsVerified(res.data.success);
            setShowMessage(res.data.message);
        }).catch(err=>{
            // console.log(err);
            setUserFound(!err.response.data.success);
            setShowMessage(err.response.data.message);
        })
    }
    return (
        <>
            <Helmet>
                <title>Auth | LinkBowl</title>
            </Helmet>
            <Navbar collapseOnSelect expand="lg" sticky='top' style={{ backgroundColor: "white" }}>
                <Container>
                    <Navbar.Brand href="#">
                        <img
                            src={logo}
                            className="d-inline-block align-center App-logo"
                            alt="React Bootstrap logo"
                        />{" "}
                        <h2 className="d-inline-block align-center logoTitle"><span className='logoTitle-span'>Link</span>Bowl</h2>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            {!userFound?
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ width: "100vw", height: "70vh" }}>
                <h3 style={{ color: "#000AFF", textAlign: "center" ,margin:"20px 10px"}}>{showMessage}</h3>
                {!isVerified ?
                    <Box sx={{ width: '80vw' }}>
                        <LinearProgress />
                    </Box> :
                    <Button variant='primary' className="App-primaryBtn" style={{fontWeight:"700",padding:"10px 20px"}} onClick={()=>{
                        navigate('/login');
                    }} >Login to Continue</Button>
                }
            </Container>
            :
            <Container className="d-flex flex-column justify-content-center align-items-center" style={{ width: "100vw", height: "70vh" }}>
                <h3 style={{ color: "#000AFF", textAlign: "center" ,margin:"20px 10px"}}>{showMessage}</h3>
                <h1>&#128577;</h1>
            </Container>
             }
        </>
    )
}
export default Auth;