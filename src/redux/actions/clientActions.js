import {
    clientDataRequest,
    clientDataSuccess,
    clientDataFail,
    verifyUserSuccess,
    verifyUserFail,
    verifyUserRequest
} from '../slices/clientSlice';
import axios from 'axios';
export const clientDataFetch=(data)=>async (dispatch)=>{
    try {
        dispatch(clientDataRequest());
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/user',{
            username:data
        },{withCredentials:true}).then((response)=>{
            dispatch(clientDataSuccess(response.data))
        })
    } catch (error) {
        dispatch(clientDataFail())
        console.clear();
    }
}
export const verifyUserFunc = (data) => async (dispatch) => {
    try {
        dispatch(verifyUserRequest());
        await axios.post('https://cdn-linkbowl.onrender.com/api/v1/auth', {
            token:data
        }, { withCredentials: true }).then((response) => {
            dispatch(verifyUserSuccess(response.data));
        })
    } catch (error) {
        dispatch(verifyUserFail(error.response.data));
    }
}
export const addViews=(id)=>async(dispatch)=>{
    try {
        await axios.put('https://cdn-linkbowl.onrender.com/api/v1/updateviews',{
            id
        },{withCredentials:true}).then((res)=>{

        })
    } catch (error) {
        
    }
    console.clear();
}
export const addClicks=(id)=>async(dispatch)=>{
    try {
        await axios.put('https://cdn-linkbowl.onrender.com/api/v1/updateclicks',{
            id
        },{withCredentials:true}).then((res)=>{

        })
    } catch (error) {
        
    }
    console.clear();
}