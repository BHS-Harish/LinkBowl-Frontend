import React from 'react';
import logo from '../asset/lb-png.png';
import '../styles/Loader.css';
function Loader(){
    return(
        <div className='d-flex justify-content-center align-items-center vw-100 vh-100'>
            <img src={logo} alt="logo" className='loader-icon'/>
        </div>
    )
}
export default Loader;