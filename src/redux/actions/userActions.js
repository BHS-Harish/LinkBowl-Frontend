import {
    userDataRequest,
    userDataSuccess,
    userDataFail,
    updateLinkRequest,
    updateLinkSuccess,
    updateLinkFail,
    updateAvatarRequest,
    updateAvatarSuccess,
    updateAvatarFail,
    updateNameRequest,
    updateNameSuccess,
    updateNameFail,
    updateBioRequest,
    updateBioSuccess,
    updateBioFail,
    updateThemeRequest,
    updateThemeSuccess,
    updateThemeFail
} from '../slices/userSlice';
import axios from 'axios';
export const getUserData=()=>async (dispatch)=>{
    try {
        dispatch(userDataRequest());
        const {data}=await axios.get('http://localhost:8000/api/v1/getUserDetails',{withCredentials:true});
        dispatch(userDataSuccess(data))
    } catch (error) {
        dispatch(userDataFail())
    }
}
export const editUserLink=(data)=>async(dispatch)=>{
    try{
        dispatch(updateLinkRequest());
        console.log(data)
        await axios.put('http://localhost:8000/api/v1/editUserLink',{
            links:data
        },{withCredentials:true}).then((response)=>{
            dispatch(updateLinkSuccess(response.data));
        })
    }catch(error){
        dispatch(updateLinkFail());
    }
}
export const editUserAvatar=(data)=>async (dispatch)=>{
    try{
        dispatch(updateAvatarRequest());
        console.log(data);
        await axios.put('http://localhost:8000/api/v1/editUserAvatar',{
            avatar:data
        },{withCredentials:true}).then((response)=>{
            dispatch(updateAvatarSuccess(response.data))
        })
    }
    catch(error){
        dispatch(updateAvatarFail());
    }
}
export const editUserName=(data)=>async (dispatch)=>{
    try {
        dispatch(updateNameRequest());
        await axios.put('http://localhost:8000/api/v1/editUserName',{
            name:data
        },{withCredentials:true}).then((response)=>{
            dispatch(updateNameSuccess(response.data))
        })
    } catch (error) {
        dispatch(updateNameFail());
    }
}
export const editUserBio=(data)=>async (dispatch)=>{
    try {
        dispatch(updateBioRequest());
        await axios.put('http://localhost:8000/api/v1/editUserBio',{
            bio:data
        },{withCredentials:true}).then((response)=>{
            dispatch(updateBioSuccess(response.data))
        })
    } catch (error) {
        dispatch(updateBioFail())
    }
}
export const editUserTheme=(data)=>async (dispatch)=>{
    try {
        dispatch(updateThemeRequest());
        await axios.put('http://localhost:8000/api/v1/editUserTheme',{
            theme:data
        },{withCredentials:true}).then((response)=>{
            dispatch(updateThemeSuccess(response.data))
        })
    } catch (error) {
        dispatch(updateThemeFail())
    }
}