import { createSlice } from "@reduxjs/toolkit";
export const clientSlice=createSlice({
    name:"client",
    initialState:{
        clientLoading:false
    },
    reducers:{
        clientDataRequest:(state)=>{
            return{
                ...state,
                clientLoading:true
            }
        },
        clientDataSuccess:(state,action)=>{
            return{
                clientLoading:false,
                user:action.payload.user
            }
        },
        clientDataFail:(state)=>{
            return{
                clientLoading:false,
                user:undefined
            }
        }
    }
})

export default clientSlice.reducer;
export const {clientDataRequest,clientDataSuccess,clientDataFail}=clientSlice.actions;