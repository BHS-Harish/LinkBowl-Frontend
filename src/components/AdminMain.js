import React, {useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Avatar, MenuItem } from '@mui/material';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogout } from 'react-icons/md';
import { RiShareForwardFill } from 'react-icons/ri';
import {CgInsights} from 'react-icons/cg';
import '../styles/Admin.css';
import { Popover, QRCode } from 'antd';
import logo from '../asset/lb-png.png';
import { Link, Routes, Route } from 'react-router-dom';
import AdminLink from './AdminLink';
import AdminApperances from './AdminApperances';
import AdminPreview from './AdminPreview';
import AdminProfile from './AdminProfile';
import AdminInsight from './AdminInsight';
import ErrorPage from '../components/ErrorPage';
import Loader from '../components/Loader';
import { logoutUser } from '../redux/actions/authActions';
import {  getUserData } from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';


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

function AdminMain() {
    //handle Share button
    const handleShareButton = async () => {
        if (navigator.share) {
            const shareDetails = { url: `https://linkbowl.netlify.app/${user.username}`, title: `${user.username} is on LinkBowl`, text: "Please Visit My LinkBowl Profile" };
            await navigator.share(shareDetails);
        }
        else {
            console.log("Your Browser shouldn't support Web share")
        }
    }
    const SubMenuItem = (user) => {
        return (
            <div className='d-flex flex-column' style={{ width: "200px" }}>
                <button className="sub-menu-items" onClick={handleShareButton}>Share via link</button>
                <button className="sub-menu-items" onClick={() => {
                    window.open(`https://linkbowl.netlify.app/${user.username}`, '_blank');
                }}>Open my LinkBowl</button>
                <Popover placement="bottom" content={<div id="myqrcode"><QRCode value={user ? `https://linkbowl.netlify.app/${user?.username}` : "https://linkbowl.netlify.app"} bordered={false} style={{ backgroundColor: "white" }} /></div>} trigger="hover">
                    <button className="sub-menu-items" onDoubleClick={downloadQRCode}>Download QR Code</button>
                </Popover>
            </div>
        )
    }
    const addMenuOption = () => {
        return (
            <>
                <Link to="profile" style={{ textDecoration: "none", color: "#000AFF" }}><MenuItem ><CgProfile style={{ margin: "auto 8px", fontSize: "18px" }} /> My Profile</MenuItem></Link>
                <Link to="insight" style={{ textDecoration: "none", color: "#000AFF" }}><MenuItem ><CgInsights style={{ margin: "auto 8px", fontSize: "18px" }} /> Insight</MenuItem></Link>
                <MenuItem style={{color:"#000AFF"}} onClick={() => {
                    dispatch(logoutUser());
                }}><MdOutlineLogout style={{ margin: "auto 8px", fontSize: "18px" }} /> Logout</MenuItem>
            </>
        )
    }
    const { userLoading } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserData())
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Helmet>
                <title>Admin | LinkBowl</title>
            </Helmet>
            {
                userLoading ?
                    <Loader />
                    :
                    <>
                        <div className='d-flex justify-content-between align-items-center vw-100 Admin-menu' style={{ height: "100px" }}>
                            <div className='d-flex align-items-center'>
                                <img src={logo} alt="logo" />
                                <h3>Welcome back, {user?.name}</h3>
                            </div>
                            <Popover placement='bottomLeft' content={addMenuOption} trigger="click">
                                <Avatar alt="avator" src={user?.avatar ? user.avatar : `https://avatar.oxro.io/avatar.svg?name=${user?.name}&background=000aff&caps=3&bold=true`} style={{ margin: "20px", border: "2px solid #000AFF" }} sx={{ width: 50, height: 50 }} id="basic-button" />
                            </Popover>
                        </div>
                        <div className="d-flex justify-content-between align-items-center vw-100 Admin-submenu" style={{ height: "50px", backgroundColor: "#000AFF" }}>
                            <div className='d-flex align-items-center'>
                                <Link to={'/admin/'} className="Admin-menu-links">Links</Link>
                                <Link to={'appearances'} className="Admin-menu-links">Appearances</Link>
                                <Link to={'preview'} className="Admin-menu-links">Preview</Link>
                            </div>
                            <Popover placement="bottomRight" content={SubMenuItem(user)} trigger="click">
                                <button className="Admin-share-btn"><span>SHARE</span><RiShareForwardFill /></button>
                            </Popover>
                        </div>
                        <Routes>
                            <Route path="/" exact element={<AdminLink  />} />
                            <Route path="appearances" element={<AdminApperances />} />
                            <Route path="preview" element={<AdminPreview />} />
                            <Route path="profile" element={<AdminProfile />} />
                            <Route path="insight" element={<AdminInsight />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </>
            }
        </>
    )
}
export default AdminMain;