import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, ReducerName } from '../../utils/constant';
import { UserState } from '../../types/state.type';
import { checkAuth, checkEmail, fetchUser, fetchUserList, login, updateUser } from './api-actions';
import { NewUserGeneral, User } from '../../types/user.interface';

const initialState:UserState = {
  authStatus:AuthorizationStatus.Unknown,
  userId: null,
  role: null,
  userData:null,
  userListData:null,
  newUserData:null,
  isUserLoading:false,
  isUserListLoading:false,
  isUserUpdating:false,
  isEmailExists:false,
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
      })
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isUserLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isUserUpdating = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isUserUpdating = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isUserUpdating = false;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.isEmailExists = action.payload;
      })
      .addCase(checkEmail.rejected, (state) => {
        state.isEmailExists = true;
      })
      .addCase(fetchUserList.pending, (state) => {
        state.isUserListLoading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.userListData = action.payload;
        state.isUserListLoading = false;
      })
      .addCase(fetchUserList.rejected, (state) => {
        state.isUserListLoading = false;
      });
  }
});

export const {createNewUser, setUserData} = userData.actions;
