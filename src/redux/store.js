import {configureStore} from '@reduxjs/toolkit';
import authSice from './slices/authSice';
import userSlice from './slices/userSlice';
import clientSlice from './slices/clientSlice';
import thunk from 'redux-thunk';
export default configureStore({
    reducer:{
        auth:authSice,
        user:userSlice,
        client:clientSlice
    },
    middleware:[thunk]
});