import {
    clientDataRequest,
    clientDataSuccess,
    clientDataFail
} from '../slices/clientSlice';
import axios from 'axios';
export const clientDataFetch=(data)=>async (dispatch)=>{
    try {
        dispatch(clientDataRequest());
        await axios.post('http://localhost:8000/api/v1/user',{
            username:data
        },{withCredentials:true}).then((response)=>{
            dispatch(clientDataSuccess(response.data))
        })
    } catch (error) {
        dispatch(clientDataFail())
        console.clear();
    }
}