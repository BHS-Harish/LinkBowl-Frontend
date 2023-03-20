import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {MdEmail} from 'react-icons/md';
import './ClientStyle.css';
function AdminPreview() {
    const client=useSelector((state)=>state.user?.user)
    return (
        <>
            <Container fluid className='vw-100  d-flex flex-column align-items-center' style={{ backgroundColor: `${client?.theme.bgColor}`, paddingBottom: "30px",minHeight:"100vh" }}>
                <img className="client-avatar" src={client?.avatar ? client?.avatar : `https://avatar.oxro.io/avatar.svg?name=${client?.name}&background=000aff&caps=3&bold=true`} alt='avatar' />
                <h2 className="client-name" style={{ color: `${client?.theme.color}` }}>{client?.name}</h2>
                <p className="client-bio" style={{ color: `${client?.theme.color}` }}>{client?.bio}</p>
                <a href={"mailto:"+client?.email} style={{margin:"10px"}}> <MdEmail style={{color:`${client?.theme.color}`,fontSize:"25px"}}/></a>
	{
                    client?.links && client.links.map((data, index) => {
                        if(data.private===false){
                            return (
                                <div className="client-button-container d-flex justify-content-center align-items-center" style={{ backgroundColor: `${client?.theme.btnBgColor}`, boxShadow: `1px 1px 5px ${client?.theme.btnShadowColor}`, color: `${client?.theme.btnColor}` }} onClick={() => {
                                    window.open(data.url)
                                }}>
                                    {data?.title}
                                </div>
                            )
                        }  
                    })
                }

            </Container>
        </>
    )
}
export default AdminPreview;