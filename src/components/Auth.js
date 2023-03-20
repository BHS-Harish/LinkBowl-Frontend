import React, {  useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Navbar,Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { LinearProgress, Box } from '@mui/material';
import logo from '../asset/lb-png.png';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {verifyUserFunc} from '../redux/actions/clientActions';

function Auth() {

    const isVerified=useSelector((state)=>state.client.isVerified);
    const userFound=useSelector((state)=>state.client.userFound);
    const showMessage=useSelector((state)=>state.client.showMessage);
    const navigate = useNavigate();
    const { token } = useParams();
    const dispatch=useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(verifyUserFunc(token));
        }
    },[])
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