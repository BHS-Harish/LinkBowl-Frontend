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
        const {data}=await axios.get('https://cdn-linkbowl.onrender.com/api/v1/checkLoggedInorNot',{withCredentials:true});
        dispatch(authenticateSuccess(data))
    }
    catch(err){
        dispatch(authenticateFail(err.response.data))
    }
}
export const logoutUser=()=>async (dispatch)=>{
    try {
        await axios.get('https://cdn-linkbowl.onrender.com/api/v1/logout',{withCredentials:true})
        dispatch(logoutUserSuccess())
        dispatch(userDataFail())
        dispatch(authenticateFail());
    } catch (error) {
        dispatch(logoutUserFail())
    }
}
export const deleteMyAccount=()=>async (dispatch)=>{
    try {
        await axios.get('https://cdn-linkbowl.onrender.com/api/v1/deleteaccount',{withCredentials:true})
        dispatch(logoutUserSuccess())
        dispatch(userDataFail())
        dispatch(authenticateFail());
    } catch (error) {
        
    }
}