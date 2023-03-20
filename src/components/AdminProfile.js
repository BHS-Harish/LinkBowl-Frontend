import React,{useState} from 'react';
import './AdminStyle.css';
import { Container } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { Modal } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import {deleteMyAccount} from '../redux/actions/authActions';
import deleteImg from '../asset/deleteacc.svg';
function AdminProfile() {
    const avatar = useSelector((state) => state.user.user?.avatar);
    const name = useSelector((state) => state.user.user?.name);
    const username = useSelector((state) => state.user.user?.username);
    const email = useSelector((state) => state.user.user?.email);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch=useDispatch();
    return (
        <>
            <Container fluid className="vw-100 d-flex flex-column align-items-center">
                <div className="adminprofile-containers">
                    <h3>My Account</h3>
                    <div className="adminprofile-image-container">
                        <img src={avatar ? avatar : `https://avatar.oxro.io/avatar.svg?name=${name}&background=000aff&caps=3&bold=true`} alt="profile-pic" />
                    </div>
                    <TextField className="login-field" label="Username" fullWidth value={username} readOnly={true} />
                    <TextField className="login-field" label="Email" fullWidth value={email} readOnly={true} />
                </div>
                <div className="adminprofile-containers adminprofile-delete-account-container">
                    <h3>Danger Zone</h3>
                    <button onClick={()=>{
                        setIsDeleteModalOpen(true);
                    }}>Delete My Account</button>
                </div>
            </Container>
            <Modal open={isDeleteModalOpen} onCancel={()=>{
                setIsDeleteModalOpen(false);
            }} onOk={()=>{
                dispatch(deleteMyAccount());
                setIsDeleteModalOpen(false);
            }}>
                    <p style={{fontSize:"20px",color:"#000AFF",fontWeight:"600",margin:"10px auto"}}>Really want to leave from LinkBowl..?</p>
                    <img src={deleteImg} alt="del-illustration" style={{width:"80%",height:"auto",position:"relative",left:"50%",transform:"translateX(-50%)",margin:"20px auto"}} />
                    <p style={{fontSize:"17px",color:"black",fontWeight:"600",margin:"10px auto"}}>Your data may lose, If you leave LinkBowl. Are you Okay..?</p>
            </Modal>
        </>
    )
}
export default AdminProfile;