import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FormControl, Select, MenuItem, InputLabel, TextField, Menu, Dialog, DialogTitle } from '@mui/material';
import { Switch, Popconfirm, message, Divider } from 'antd';
import './AdminStyle.css';
import { GrAdd } from 'react-icons/gr';
import { MdEdit, MdDelete } from 'react-icons/md';
import { checkTheUrl } from './utils/Functions';
import { useSelector ,useDispatch} from 'react-redux';
import { editUserLink } from '../redux/actions/userActions';
function AdminLink() {
    const dispatch=useDispatch();
    //handle addlink start
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleProfileIcon = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleProfileIconClose = () => {
        setAnchorEl(null)
    }
    //handle addlink end
    const[links,setLinks]=useState(useSelector((state)=>state.user.user?.links));
    const [newLink, setNewLink] = useState({ "title": "", "url": "", "private": false });
    const titles = ["Instagram", "Linkedin", "Discord", "Youtube", "Facebook", "Twitter", "Spotify", "Pintrest", "Skype", "Google Meet", "Zoom", "Telegram", "Snapchat", "Google Drive", "Google Form", "Whatsapp"];
    const [selectedTitle, setSelectedTitle] = useState("");
    useEffect(() => {
        setNewLink({ ...newLink, 'title': selectedTitle })
        //eslint-disable-next-line
    }, [selectedTitle])
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [urlError, setUrlError] = useState("");
    useEffect(() => {
        if (checkTheUrl(newLink.title, newLink.url) || checkTheUrl(editLink.title, editLink.url)) {
            setUrlError("Please Enter Respective Url");
            setIsValidUrl(true)
        }
        else {
            setUrlError("");
            setIsValidUrl(false);
        }
        // eslint-disable-next-line
    }, [newLink])
    function deleteLink(index) {
        const temp = [...links];
        temp.splice(index, 1);
        setLinks([...temp]);
        dispatch(editUserLink([...temp]));
        message.success("Link Deleted Successfully")
    }
    const [openDialog, setOpenDialog] = useState(false);
    const [index, setIndex] = useState("");
    const [editLink, setEditLink] = useState({ "title": "", "url": "", "private": false });
    const onClose = () => {
        setOpenDialog(false);
        setEditLink({ "title": "", "url": "", "private": false });
    }
    useEffect(() => {
        if (checkTheUrl(editLink.title, editLink.url)) {
            setUrlError("Please Enter Respective Url");
            setIsValidUrl(true)
        }
        else {
            setUrlError("");
            setIsValidUrl(false);
        }
    }, [editLink])
    return (
        <Container fluid className="vw-100 d-flex flex-column align-items-center">
            <div className="adminlink-new-link-container">
                <button className="adminlink-add-new-link-btn"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleProfileIcon}
                ><GrAdd /> Add Link</button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleProfileIconClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setLinks([...links, newLink]);
                        setSelectedTitle("");
                        dispatch(editUserLink([...links,newLink]));
                        setNewLink({ "title": "", "url": "", "private": false });
                    }}>
                        <FormControl style={{ width: "100%" }} >
                            <InputLabel id="demo-simple-select-autowidth-label">Select Title</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={selectedTitle}
                                onChange={(e) => {
                                    setSelectedTitle(e.target.value);
                                }}
                                autoWidth
                                label="Select Title"
                                size="small"
                                style={{ height: "50px" }}
                                required
                            >
                                <MenuItem value="Others">
                                    <em>Others</em>
                                </MenuItem>
                                {
                                    titles && titles.map((value, key) => {
                                        return (
                                            <MenuItem value={value} key={key}>{value}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            {
                                selectedTitle === "Others" ? <TextField fullWidth label="Title" value={newLink.title} className="login-field" type="text" autoComplete='title' required onFocus={(e) => e.target.select()} onChange={(e) => {
                                    setNewLink({ ...newLink, "title": e.target.value })
                                }} /> : " "
                            }
                            <TextField fullWidth label="Url" className="login-field" type="url" helperText={urlError} autoComplete='url' value={newLink.url} required onChange={(e) => {
                                setNewLink({ ...newLink, "url": e.target.value })
                            }} onFocus={(e) => {
                                e.target.select();
                            }} />
                            <div>
                                <button type='reset' onClick={() => {
                                    setSelectedTitle("");
                                    setNewLink({ "title": "", "url": "", "private": false });
                                }} className='adminlink-reset-btn adminlinkform-btn'>RESET</button>
                                <button type='submit' className='adminlink-add-btn adminlinkform-btn' disabled={isValidUrl}>ADD</button>
                            </div>
                        </FormControl>
                    </form>
                </Menu>
            </div>
            <Divider>Your Links are</Divider>
            <div className="adminlink-lists-container">
                {
                    links && links.map((value, index) => {
                        return (
                            <div className="adminlink-list-container" key={index}>
                                <h6 className='text-truncate'>{value.title}</h6>
                                <p className='text-truncate'>{value.url}</p>
                                <div className='adminlink-list-switch-container'>
                                    <p>Private</p>
                                    <Switch size='small' checked={value.private} disabled />
                                </div>
                                <div className='adminlink-link-action-btn-container d-flex flex-column'>
                                    <button className='adminlink-link-action-btn' onClick={() => {
                                        setEditLink({ ...links[index] });
                                        setIndex(index);
                                        setOpenDialog(true);
                                    }}><MdEdit /></button>
                                    <Popconfirm
                                        title="Delete the Link"
                                        description="Are you sure to delete this link?"
                                        onConfirm={() => { deleteLink(index); }}
                                        okText="Yes"
                                        cancelText="Cancel"
                                        placement='topRight'
                                    >
                                        <button className='adminlink-link-action-btn' style={{ backgroundColor: "#E87A7A" }}><MdDelete /></button>
                                    </Popconfirm>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Dialog open={openDialog} onClose={onClose}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const temp = [...links];
                    temp.splice(index, 1, editLink);
                    setLinks([...temp]);
                    dispatch(editUserLink([...temp]));
                    onClose();
                }}>
                    <DialogTitle style={{ color: "#000aff", fontWeight: "600" }}>EDIT LINK</DialogTitle>
                    <TextField fullWidth label="Title" type="text" className="login-field" value={editLink.title} readOnly={true} />
                    <TextField fullWidth label="Url" type="url" helperText={urlError} className="login-field" value={editLink.url} required onChange={(e) => {
                        setEditLink({ ...editLink, "url": e.target.value });
                    }} />
                    <div className='adminlink-list-switch-container'>
                        <p>Private</p>
                        <Switch size='small' checked={editLink.private} onChange={(checked) => {
                            setEditLink({ ...editLink, "private": checked });
                        }} />
                    </div>
                    <div>
                        <button type='reset' onClick={onClose} className='adminlink-reset-btn adminlinkform-btn'>CLOSE</button>
                        <button type='submit' className='adminlink-add-btn adminlinkform-btn' disabled={isValidUrl}>UPDATE</button>
                    </div>
                </form>
            </Dialog>
        </Container>
    )
}
export default AdminLink;