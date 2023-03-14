import {
    clientDataRequest,
    clientDataSuccess,
    clientDataFail
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