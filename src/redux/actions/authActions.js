import {
    authenticateSuccess,
    authenticateFail,
    authenticateRequest,
    logoutUserSuccess,
    logoutUserFail
} from '../slices/authSice';
import axios from 'axios';
import { userDataFail } from '../slices/userSlice';
export const checkAuthenticated=()=>async (dispatch)=>{
    try{
        dispatch(authenticateRequest())
        const {data}=await axios.get('http://localhost:8000/api/v1/checkLoggedInorNot',{withCredentials:true});
        dispatch(authenticateSuccess(data))
    }
    catch(err){
        dispatch(authenticateFail(err.response.data))
    }
}
export const logoutUser=()=>async (dispatch)=>{
    try {
        await axios.get('http://localhost:8000/api/v1/logout',{withCredentials:true})
        dispatch(logoutUserSuccess())
        window.open(`http://localhost:3000/login`, '_self');
        dispatch(userDataFail())
    } catch (error) {
        dispatch(logoutUserFail())
    }
}