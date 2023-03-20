import { createSlice } from "@reduxjs/toolkit";
export const clientSlice=createSlice({
    name:"client",
    initialState:{
        clientLoading:false,
        isVerified:false,
        userFound:false,
        showMessage:"Verification in Progress..."
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
        },
        verifyUserSuccess:(state,action)=>{
            return{
                ...state,
                userFound:false,
                isVerified:true,
                showMessage:action.payload.message
            }
        },
        verifyUserFail:(state,action)=>{
            return{
                ...state,
                userFound:true,
                isVerified:false,
                showMessage:action.payload.message
            }
        }
    }
})

export default clientSlice.reducer;
export const {clientDataRequest,clientDataSuccess,clientDataFail,verifyUserSuccess,verifyUserFail}=clientSlice.actions;