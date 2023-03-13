import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Navbar from 'react-bootstrap/Navbar';
import Marquee from 'react-fast-marquee';
import {Helmet} from 'react-helmet-async';
import { Fade} from "react-awesome-reveal";
import '../App.css';
import logo from "../asset/lb-png.png";
import { BiMenu, BiRightArrowAlt } from "react-icons/bi";
import { FaLink } from 'react-icons/fa';
import { BsShareFill } from 'react-icons/bs';
import{SiGooglemeet,SiZoom} from 'react-icons/si';
import{HiDocument} from 'react-icons/hi';
import{MdMail,MdLocationPin} from 'react-icons/md';
import{RiTelegramFill,RiWhatsappFill,RiSnapchatFill,RiDriveFill,RiInstagramFill,RiLinkedinBoxFill,RiDiscordFill,RiYoutubeFill,RiFacebookBoxFill,RiTwitterFill,RiSpotifyFill,RiPinterestFill,RiSkypeFill} from 'react-icons/ri';
import leftIllu from '../asset/left-illu.png';
import rightIllu from '../asset/right-illu.png';
import mockup from '../asset/mockup.png';
function Home() {
  const navigate=useNavigate();
  return (
    <Fade delay={1000} duration={2000}>
    <>
    <Helmet>
        <title>Home | LinkBowl</title>
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav"><BiMenu style={{ fontSize: "25px", color: "#000AFF" }} /></Navbar.Toggle>
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <div className='d-flex justify-content-center'>
              <Button variant='primary' className="App-primaryBtn" onClick={()=>{
                navigate('/login')
              }}>Login</Button>
              <Button variant='outline-primary' className="App-secondaryBtn" onClick={()=>{
                navigate('/register');
              }}>SignUp</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="App-partOne">
        <Row>
          <p className="App-title1"><strong>The All-in-One Link in Bio</strong></p>
        </Row>
        <Row>
          <p className='text-center App-title2'><strong>for Creator and Influencer</strong></p>
        </Row>
        <Row>
          <p className='lead text-center App-desc' style={{ color: "rgba(0,0,0,0.6)" }}>Drive Traffic from Instagram, Twitter and Facebook With Just One URL</p>
        </Row>
        <Row>
          <Button variant='primary' className='App-primaryBtn App-getStartedBtn' onClick={()=>{
            navigate('/register');
          }}>GET STARTED</Button>
        </Row>
      </Container>
      <Container className="App-partTwo" fluid>
        <img src={leftIllu} className="App-illu" alt="left-illustarion" />
        <img src={rightIllu} className="App-illu" alt="right-illustration" />
      </Container>
      {/* How is it Works Part */}
      <Container fluid className="App-partThree">
        <Row style={{ margin: "20px 0" }}>
          <Col>
            <h1 className="text-center"><strong>How it Works</strong></h1>
          </Col>
        </Row>
        <Row className="App-partThree-sub1">
          <div>
            <div className="d-flex flex-row align-items-center justify-content-around" style={{ height: "100px" }}>
              <div className="App-partThree-sub1-logo">
                <div>
                  <FaLink />
                </div>
              </div>
              <div>
                <h3>Add all your links</h3>
              </div>
            </div>
            <p>Add all your Social media profile links here. It all comes together in a link in bio landing page designed to convert.</p>
          </div>
          <div>
            <div className="d-flex flex-row align-items-center justify-content-around" style={{ height: "100px" }}>
              <div className="App-partThree-sub1-logo">
                <div>
                  <BsShareFill />
                </div>
              </div>
              <div>
                <h3>Share it Everywhere</h3>
              </div>
            </div>
            <p>Add your unique LinkBowl URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.</p>
          </div>
        </Row>
        <br />
      </Container>
      {/*Multiple Links in one place part*/}
      <Container fluid style={{ backgroundColor: "rgba(0,10,255,0.1)" }} className="App-partFour">
        <div>
          <div className="d-flex justify-content-center">
            <img src={mockup} alt="mockup" width={250} height={250} style={{ margin: "40px" }} />
          </div>
          <div className='d-flex flex-column justify-content-center align-item-start'>
            <h1>Multiple Links in One Place</h1>
            <p>Our Bio link tool helps promote your online presence,Connect with your audience and turn your bio into a landing page for your most important links.</p>
            <a href='/register'>Add Your First Link<BiRightArrowAlt style={{ fontSize: "30px" }} /></a>
          </div>
        </div>
      </Container>
      <Container fluid>
        <Marquee speed={60} pauseOnHover={true} pauseOnClick={true}>
          <SiGooglemeet className='App-marquee-style'/>
          <SiZoom className='App-marquee-style'/>
          <HiDocument className='App-marquee-style'/>
          <RiTelegramFill className='App-marquee-style'/>
          <RiWhatsappFill className='App-marquee-style'/>
          <RiSnapchatFill className='App-marquee-style'/>
          <RiDriveFill className='App-marquee-style'/>
          <RiInstagramFill className='App-marquee-style'/>
          <RiLinkedinBoxFill className='App-marquee-style'/>
          <RiDiscordFill className='App-marquee-style'/>
          <RiYoutubeFill className='App-marquee-style'/>
          <RiFacebookBoxFill className='App-marquee-style'/>
          <RiTwitterFill className='App-marquee-style'/>
          <RiSpotifyFill className='App-marquee-style'/>
          <RiPinterestFill className='App-marquee-style'/>
          <RiSkypeFill className='App-marquee-style'/>
        </Marquee>
      </Container>
      <Container fluid style={{ backgroundColor: "rgba(0,10,255,0.1)" }} className="App-partFive">
          <h1>LinkBowl is free to use for as long as you want</h1>
          <p>No credit card required</p>
          <Button className="App-getStartedBtn" style={{backgroundColor:"#E87A7A",border:"none"}} onClick={()=>{
            navigate('/register')
          }}>Create an account</Button>
      </Container>
      <Container fluid className='footer'>
        <div className="footer-container">
        <div  className="footer-container-sub1">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2 className="d-inline-block align-center logoTitle"><span className='logoTitle-span'>Link</span>Bowl</h2>
            <div className='d-flex justif-content-around align-item-center' style={{width:"100%"}}>
                <a href="#home"><RiInstagramFill className='App-social-links'/></a>
                <a href="#home"><RiFacebookBoxFill className='App-social-links'/></a>
                <a href="#home"><RiYoutubeFill className='App-social-links'/></a>
            </div>
        </div>
        <div className="footer-container-sub2">
            <h4>Contact Us</h4>
            <a href='#home' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.7)",fontSize:"15px",margin:"5px"}}><MdMail style={{fontSize:"20px",color:"#E87A7A"}}/> linkbowl.care@gmail.com</a>
            <a href='#home' style={{textDecoration:"none",color:"rgba(0, 0, 0, 0.7)",fontSize:"15px",margin:"5px"}}><MdLocationPin style={{fontSize:"20px",color:"#E87A7A"}}/> Department of BCA,C Block, Anja College Campus, Sivakasi-626-124, India</a>
        </div>
        <div className="footer-container-sub3">
            <h4>Subscribe Now</h4>
            <form method='post'>
            <input type="email" placeholder='Enter your email here' required/>
            <button style={{padding:"5px 20px",backgroundColor:"#E87A7A",color:"white",borderRadius:"50px",margin:"10px",border:"none",float:"right"}}>Subscribe</button>
            </form>
        </div>
        </div>
        <p>Made by BHS & Alex</p>
      </Container>
    </>
    </Fade>
  );
}

export default Home;
