import React, { useState, useEffect } from 'react';
import './AdminStyle.css';
import { Container } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { editUserAvatar, editUserName,editUserBio,editUserTheme } from '../redux/actions/userActions';
function AdminApperances() {
    const avatar = useSelector((state) => state.user.user?.avatar);
    const name = useSelector((state) => state.user.user?.name);
    const bio = useSelector((state) => state.user.user?.bio);
    const theme=useSelector((state)=>state.user.user?.theme);

    const [uname, setUname] = useState(name);
    const [Uflag, setUflag] = useState(false);
    const [isValidName, setIsValidName] = useState(true);
    const [nameError, setNameError] = useState("");

    const [ubio, setUbio] = useState(bio);
    const [Bflag, setBflag] = useState(false);
    const [isValidBio, setIsValidBio] = useState(true);
    const [bioError, setBioError] = useState("");

    const[utheme,setUtheme]=useState(theme);

    useEffect(() => {
        if (uname && uname.length) {
            if (uname.length <= 20) {
                setNameError("");
                setIsValidName(false);
            }
            else {
                setNameError("Name can't exceed 20 Characters");
                setIsValidName(true);
            }
        }
    }, [uname]);
    useEffect(() => {
        if (ubio && ubio.length) {
            if (ubio.length <= 100) {
                setBioError("");
                setIsValidBio(false);
            }
            else {
                setBioError("Bio can't exceed 100 Characters");
                setIsValidBio(true);
            }
        }
    }, [ubio]);
    const dispatch = useDispatch();
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const uploadImage = async (event) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        dispatch(editUserAvatar(base64));
    }
    return (
        <Container fluid className="vw-100 d-flex flex-column align-items-center">
            <div className="adminappear-containers adminappear-profile-container">
                <h3>Profile</h3>
                <div className="adminappear-profile-pic-container">
                    <img src={avatar ? avatar : `https://avatar.oxro.io/avatar.svg?name=${name}&background=000aff&caps=3&bold=true`} alt="profile-pic" />
                    <div className="d-flex flex-column align-items-center ">
                        <input type='file' accept='image/*' onChange={(e) => {
                            uploadImage(e);
                        }} className="adminappear-pick-image" />
                        <button onClick={() => {
                            dispatch(editUserAvatar(""))
                        }} style={{ backgroundColor: "#E87A7A" }}>REMOVE IMAGE</button>
                    </div>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(editUserName(uname));
                }}>
                    <TextField fullWidth label="Name" className='login-field' helperText={nameError} required value={uname} onChange={(e) => {
                        setUflag(true);
                        setUname(e.target.value)
                    }} />
                    {
                        Uflag ?
                            <div className="adminappear-name-btn-container">
                                <button className="btn btn-primary" type='submit' disabled={isValidName}>Update</button>
                                <button className="btn btn-danger" onClick={() => {
                                    setUname(name);
                                    setUflag(false);
                                    setIsValidName(false);
                                    setNameError("");
                                }}>Cancel</button>
                            </div>
                            :
                            ""
                    }
                </form>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(editUserBio(ubio));
                }}>
                    <TextField fullWidth label="Bio" multiline rows={3} className='login-field' helperText={bioError} required value={ubio} onChange={(e) => {
                        setBflag(true);
                        setUbio(e.target.value)
                    }} />
                    {
                        Bflag ?
                            <div className="adminappear-name-btn-container">
                                <button className="btn btn-primary" type='submit' disabled={isValidBio}>Update</button>
                                <button className="btn btn-danger" onClick={() => {
                                    setUbio(bio);
                                    setBflag(false);
                                    setIsValidBio(false);
                                    setBioError("");
                                }}>Cancel</button>
                            </div>
                            :
                            ""
                    }
                </form>
            </div>
            <div className="adminappear-containers adminappear-profile-container">
                <h3>Background</h3>
                <div className="adminappear-color-container">
                    <p>Background Color</p>
                    <div className='adminappear-color-picker-container'>
                        <input type={"color"} value={utheme?.bgColor} onChange={(e)=>{
                            setUtheme({...utheme,"bgColor":e.target.value})
                        }} className="adminappear-color-picker" onBlur={()=>{
                            dispatch(editUserTheme(utheme))
                        }}/>
                        <p>{utheme?.bgColor}</p>
                    </div>
                </div>
            </div>
            <div className="adminappear-containers adminappear-profile-container">
                <h3>Button</h3>
                <div className="adminappear-color-container">
                    <p>Button Color</p>
                    <div className='adminappear-color-picker-container'>
                        <input type={"color"} value={utheme?.btnBgColor} onChange={(e)=>{
                            setUtheme({...utheme,"btnBgColor":e.target.value})
                        }} className="adminappear-color-picker" onBlur={()=>{
                            dispatch(editUserTheme(utheme))
                        }}/>
                        <p>{utheme?.btnBgColor}</p>
                    </div>
                </div>
                <div className="adminappear-color-container">
                    <p>Button Font Color</p>
                    <div className='adminappear-color-picker-container'>
                        <input type={"color"} value={utheme?.btnColor} onChange={(e)=>{
                            setUtheme({...utheme,"btnColor":e.target.value})
                        }} className="adminappear-color-picker" onBlur={()=>{
                            dispatch(editUserTheme(utheme))
                        }}/>
                        <p>{utheme?.btnColor}</p>
                    </div>
                </div>
                <div className="adminappear-color-container">
                    <p>Button Shadow Color</p>
                    <div className='adminappear-color-picker-container'>
                        <input type={"color"} value={utheme?.btnShadowColor} onChange={(e)=>{
                            setUtheme({...utheme,"btnShadowColor":e.target.value})
                        }} className="adminappear-color-picker" onBlur={()=>{
                            dispatch(editUserTheme(utheme))
                        }}/>
                        <p>{utheme?.btnShadowColor}</p>
                    </div>
                </div>
            </div>
            <div className="adminappear-containers adminappear-profile-container">
                <h3>Font</h3>
                <div className="adminappear-color-container">
                    <p>Color</p>
                    <div className='adminappear-color-picker-container'>
                        <input type={"color"} value={utheme?.color} onChange={(e)=>{
                            setUtheme({...utheme,"color":e.target.value})
                        }} className="adminappear-color-picker" onBlur={()=>{
                            dispatch(editUserTheme(utheme))
                        }}/>
                        <p>{utheme?.color}</p>
                    </div>
                </div>
            </div>
        </Container>
    )
}
export default AdminApperances;