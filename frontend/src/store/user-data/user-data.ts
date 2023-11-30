import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, DefaultParam, ReducerName } from '../../utils/constant';
import { UserState } from '../../types/state.type';
import { checkAuth, checkEmail, fetchCurrentUser, fetchReadyUserList, fetchUser, fetchUserList, fetchUserListAmount, login, updateUser } from './api-actions';
import { NewUserGeneral, User } from '../../types/user/user.interface';

const initialState:UserState = {
  authStatus:AuthorizationStatus.Unknown,
  userId: null,
  role: null,
  currentUserData:null,
  userData:null,
  userListData:null,
  readyUsers:null,
  newUserData:null,
  isCurrentUserLoading:false,
  isUserLoading:false,
  isUserListLoading:false,
  isUserUpdating:false,
  isEmailExists:false,
  hasUserError:false,
  totalAmount:DefaultParam.Amount,
};


export const userData = createSlice({
  name: ReducerName.User,
  initialState,
  reducers:{
    createNewUser: (state, actions: PayloadAction<NewUserGeneral>) => {
      state.newUserData = actions.payload;
    },
    setUserData: (state, actions: PayloadAction<User>) => {
      state.currentUserData = actions.payload;
      state.role = actions.payload.role;
      state.userId = actions.payload.id;
      state.authStatus = AuthorizationStatus.Auth;
    },
  },
  extraReducers(builder){
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authStatus = AuthorizationStatus.Auth;
        state.currentUserData = action.payload ?? null;
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
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isCurrentUserLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUserData = action.payload;
        state.isCurrentUserLoading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isCurrentUserLoading = false;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
        state.hasUserError = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isUserLoading = false;
        state.hasUserError = true;
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
      .addCase(fetchReadyUserList.fulfilled, (state, action) => {
        state.readyUsers = action.payload;
      })
      .addCase(fetchUserListAmount.fulfilled, (state, action) => {
        state.totalAmount = action.payload;
      })
      .addCase(fetchUserList.rejected, (state) => {
        state.isUserListLoading = false;
      });
  }
});

export const {createNewUser, setUserData} = userData.actions;
