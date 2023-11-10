import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, ReducerName } from '../../utils/constant';
import { UserState } from '../../types/state.type';
import { checkAuth, login } from './api-actions';

const initialState:UserState = {
  authStatus:AuthorizationStatus.Unknown,
  userData: null
};


export const userData = createSlice({
  name: ReducerName.User,
  initialState,
  reducers:{},
  extraReducers(builder){
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
      })
      .addCase(login.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});
