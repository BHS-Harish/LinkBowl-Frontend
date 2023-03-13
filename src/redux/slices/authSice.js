import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        authLoading: false,
        isAuthenticated: false
    },
    reducers: {
        authenticateRequest: (state) => {
            return {
                ...state,
                authLoading:true
            }
        },
        authenticateSuccess: (state, action) => {
            return {
                authLoading :false,
                isAuthenticated : action.payload.success
            }
        },
        authenticateFail: (state, action) => {
            return {
                authLoading :false,
                isAuthenticated : action.payload.success
            }
        },
        logoutUserSuccess:(state)=>{
            return{
                ...state,
                isAuthenticated:false
            }
        },
        logoutUserFail:(state)=>{
            return{
                ...state
            }
        }
    }
})
export default authSlice.reducer;
export const { authenticateRequest, authenticateSuccess, authenticateFail,logoutUserSuccess,logoutUserFail } = authSlice.actions;