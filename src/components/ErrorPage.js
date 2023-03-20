import React from 'react';
import logo from '../asset/lb-png.png';
import { Navbar, Container,Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import {useNavigate} from 'react-router';
import '../App.css';
function ErrorPage() {
    const navigate=useNavigate();
    return (
        <>
            <Helmet>
                <title>Page not Found &#128533;</title>
            </Helmet>
            <Navbar collapseOnSelect expand="lg" sticky='top' style={{ backgroundColor: "white" }}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            className="d-inline-block align-center App-logo"
                            alt="React Bootstrap logo"
                        />{" "}
                        <h2 className="d-inline-block align-center logoTitle"><span className='logoTitle-span'>Link</span>Bowl</h2>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div className="d-flex align-items-center justify-content-center vh-80">
            <div className="text-center" style={{padding:"15px"}}>
                <h1 className="display-1 fw-bold" style={{color:"#000AFF"}}>404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                  </p>
                <Button className="btn btn-primary" onClick={()=>{
                    navigate('/')
                }}>Go Home</Button>
            </div>
        </div>
        </>
    )
}
export default ErrorPage;