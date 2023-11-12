import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, ReducerName } from '../../utils/constant';
import { UserState } from '../../types/state.type';
import { checkAuth, login } from './api-actions';
import { NewUserGeneral, User } from '../../types/user.interface';

const initialState:UserState = {
  authStatus:AuthorizationStatus.Unknown,
  userId: null,
  role: null,
  userData:null,
  newUserData:null,
};


export const userData = createSlice({
  name: ReducerName.User,
  initialState,
  reducers:{
    createNewUser: (state, actions: PayloadAction<NewUserGeneral>) => {
      state.newUserData = actions.payload;
    },
    setUserData: (state, actions: PayloadAction<User>) => {
      state.userData = actions.payload;
      state.role = actions.payload.role;
      state.userId = actions.payload.id;
      state.authStatus = AuthorizationStatus.Auth;
    },
  },
  extraReducers(builder){
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userData = action.payload ?? null;
        state.role = action.payload?.role ?? null;
        state.userId = action.payload?.id ?? null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.userId = action.payload?.sub ?? null;
        state.role = action.payload?.role ?? null;
      })
      .addCase(login.rejected, (state) => {
        state.authStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const {createNewUser, setUserData} = userData.actions;
