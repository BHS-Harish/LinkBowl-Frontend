import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clientDataFetch } from '../redux/actions/clientActions';
import ErrorPage from './ErrorPage';
import Loader from './Loader';
import { Container } from 'react-bootstrap';
import { Popover, QRCode } from 'antd';
import {RiShareForwardFill} from 'react-icons/ri';
import logo from '../asset/lb-png.png';
import './ClientStyle.css';
import './AdminStyle.css';
const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement('a');
        a.download = 'QRCode.png';
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
};
function User() {
    const dispatch = useDispatch();
    const { username } = useParams();
    const client = useSelector((state) => state.client?.user);
    const loading = useSelector((state) => state.client?.clientLoading);
    useEffect(() => {
        dispatch(clientDataFetch(username))
        // eslint-disable-next-line
    }, [dispatch])

    const handleShareButton = async () => {
        if (navigator.share) {
            const shareDetails = { url: `https://linkbowl.netlify.app/${username}`, title: `${username} is on LinkBowl`, text: "Please Visit the LinkBowl Profile" };
            await navigator.share(shareDetails);
        }
        else {
            console.log("Your Browser shouldn't support Web share")
        }
    }
    const SubMenuItem = () => {
        return (
            <div className='d-flex flex-column' style={{ width: "200px" }}>
                <button className="sub-menu-items" onClick={handleShareButton}>Share via link</button>
                <Popover placement="bottom" content={<div id="myqrcode"><QRCode value={username ? `https://linkbowl.netlify.app/${username}` : "https://linkbowl.netlify.app"} bordered={false} style={{ backgroundColor: "white" }} /></div>} trigger="hover">
                    <button className="sub-menu-items" onDoubleClick={downloadQRCode}>Download QR Code</button>
                </Popover>
            </div>
        )
    }
    return (
        <>
            {loading ?
                <Loader />
                :
                !client ?
                    <ErrorPage />
                    :
                    <>
                        <Helmet>
                            <title>{username} | LinkBowl</title>
                            <meta name="theme-color" content={client?.theme.bgColor} />
                        </Helmet>
                        <Container fluid className='vw-100  d-flex flex-column align-items-center' style={{ backgroundColor: `${client?.theme.bgColor}`,paddingBottom:"30px"}}>
                            <img className="client-avatar" src={client?.avatar ? client.avatar : `https://avatar.oxro.io/avatar.svg?name=${client.name}&background=${(client.theme.color).slice(1, 7)}&color=${(client.theme.bgColor).slice(1, 7)}&caps=3&bold=true`} alt='avatar' />
                            <h2 className="client-name" style={{ color: `${client?.theme.color}` }}>{client?.name}</h2>
                            <p className="client-bio" style={{ color: `${client?.theme.color}` }}>{client?.bio}</p>
                            {
                                client?.links && client.links.map((data, index) => {
                                    return (
                                        <div className="client-button-container d-flex justify-content-center align-items-center" style={{backgroundColor:`${client?.theme.btnBgColor}`,boxShadow:`1px 1px 5px ${client?.theme.btnShadowColor}`,color:`${client?.theme.btnColor}`}} onClick={()=>{
                                            window.open(data.url)
                                        }}>
                                            {data?.title}
                                        </div>
                                    )
                                })
                            }
                            
                        </Container>
                        <div className="floating-footer">
                            <img src={logo} alt="linkbowl-logo"/>
                            <a href='/' target={"_blank"}>Create your LinkBowl Account</a>
                        </div>
                        <Popover placement="bottomRight" content={SubMenuItem} trigger="click">
                                <button className="Admin-share-btn client-share-btn" style={{backgroundColor:`${client?.theme.color}`}}><RiShareForwardFill style={{color:`${client?.theme.bgColor}`}}/></button>
                        </Popover>
                    </>
            }
        </>
    )
}
export default User;