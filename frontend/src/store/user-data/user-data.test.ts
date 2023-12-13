import { UserState } from '../../types/state.type';
import { ActionName, AuthorizationStatus, DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeNewUserGeneral, makeFakeUser, makeFakeUsers } from '../../utils/mocks';
import { checkAuth, checkEmail, fetchCurrentUser, fetchReadyUserList, fetchUser, fetchUserList, fetchUserListAmount, login, updateUser } from './api-actions';
import { createNewUser, setUserData, userData } from './user-data';

const fakeUser = makeFakeUser();
const fakeUserGeneral = makeFakeNewUserGeneral();
const fakeUsers = makeFakeUsers();

describe(`Reducer: ${ReducerName.User}`, () => {
  let state: UserState;
  beforeEach(() => {
    state = {
      authStatus:AuthorizationStatus.Unknown,
      userId: null,
      role: null,
      currentUserData:null,
      userData:null,
      userListData:null,
      readyUsers:null,
      newUserData:null,
      isCurrentUserLoading:DefaultParam.Status,
      isUserLoading:DefaultParam.Status,
      isUserListLoading:DefaultParam.Status,
      isUserUpdating:DefaultParam.Status,
      isEmailExists:DefaultParam.Status,
      hasUserError:DefaultParam.Status,
      totalAmount:DefaultParam.Amount,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(userData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  it('should update user general data with createNewUser action', () => {
    const result = userData.reducer(state, createNewUser(fakeUserGeneral));
    expect( result).toEqual({ ...state, newUserData: fakeUserGeneral });
  });

  it('should set user data with setUserData action', () => {
    const result = userData.reducer(state, setUserData(fakeUser));
    expect( result).toEqual({ ...state, role: fakeUser.role, userId:fakeUser.id, authStatus: AuthorizationStatus.Auth });
  });

  describe(`Api action: ${ActionName.CheckAuth}`, () => {
    it('should update authorizationStatus to authorized and save user data if checkAuth fulfilled', () => {
      expect(userData.reducer(state, { type: checkAuth.fulfilled.type, payload: fakeUser })).toEqual({ ...state, authStatus: AuthorizationStatus.Auth, currentUserData: fakeUser, role:fakeUser.role, userId:fakeUser.id });
    });
    it('should update authorizationStatus to not authorized if checkAuth rejected', () => {
      expect(userData.reducer(state, { type: checkAuth.rejected.type })).toEqual({ ...state, authStatus: AuthorizationStatus.NoAuth });
    });
  });
  describe(`Api action: ${ActionName.Login}`, () => {
    const currentUserData = {sub:fakeUser.id, role:fakeUser.role};
    it('should update authorizationStatus to authorized and save user data if login fulfilled', () => {
      expect(userData.reducer(state, { type: login.fulfilled.type, payload: currentUserData })).toEqual({ ...state, authStatus: AuthorizationStatus.Auth, role:currentUserData.role, userId:currentUserData.sub });
    });
    it('should update authorizationStatus to not authorized if login rejected', () => {
      expect(userData.reducer(state, { type: login.rejected.type })).toEqual({ ...state, authStatus: AuthorizationStatus.NoAuth, });
    });
  });

  describe(`Api action: ${ActionName.FetchCurrentUser}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        userData.reducer(state, { type: fetchCurrentUser.pending.type })
      ).toEqual({ ...state, isCurrentUserLoading: true });
    });
    it('should update loading status to "false" and current user if is fullfilled', () => {
      expect(
        userData.reducer(state, {
          type: fetchCurrentUser.fulfilled.type,
          payload: fakeUser,
        })
      ).toEqual({ ...state, currentUserData: fakeUser });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        userData.reducer(state, { type: fetchCurrentUser.rejected.type })
      ).toEqual(state);
    });
  });
  describe(`Api action: ${ActionName.FetchUser}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        userData.reducer(state, { type: fetchUser.pending.type })
      ).toEqual({ ...state, isUserLoading: true });
    });
    it('should update loading status to "false" and user if is fullfilled', () => {
      expect(
        userData.reducer(state, {
          type: fetchUser.fulfilled.type,
          payload: fakeUser,
        })
      ).toEqual({ ...state, userData: fakeUser });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        userData.reducer(state, { type: fetchUser.rejected.type })
      ).toEqual({ ...state, hasUserError: true });
    });
  });

  describe(`Api action: ${ActionName.UpdateUser}`, () => {
    it('should update user status if is pending', () => {
      expect(userData.reducer(state, { type: updateUser.pending.type })).toEqual({ ...state, isUserUpdating: true });
    });
    it('should update user if changed', () => {
      expect(userData.reducer(state, { type: updateUser.fulfilled.type })).toEqual(state);
    });
    it('should not update user status if an error occured', () => {
      expect(userData.reducer(state, { type: updateUser.rejected.type })).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.CheckEmail}`, () => {
    it('should update email status if fulfilled', () => {
      expect(userData.reducer(state, { type: checkEmail.fulfilled.type, payload: DefaultParam.Status })).toEqual(state);
    });
    it('should update email status to exists if rejected', () => {
      expect(userData.reducer(state, { type: checkEmail.rejected.type })).toEqual({ ...state, isEmailExists: true });
    });
  });

  describe(`Api action: ${ActionName.FetchUserList}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        userData.reducer(state, { type: fetchUserList.pending.type })
      ).toEqual({ ...state, isUserListLoading: true });
    });
    it('should update loading status to "false" and loaded users to list if is fullfilled', () => {
      expect(
        userData.reducer(state, {
          type: fetchUserList.fulfilled.type,
          payload: fakeUsers,
        })
      ).toEqual({ ...state, userListData: fakeUsers });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        userData.reducer(state, { type: fetchUserList.rejected.type })
      ).toEqual(state);
    });
  });
  describe(`Api action: ${ActionName.FetchReadyUserList}`, () => {
    it('should update loaded users to list if is fullfilled', () => {
      expect(
        userData.reducer(state, {
          type: fetchReadyUserList.fulfilled.type,
          payload: fakeUsers,
        })
      ).toEqual({ ...state, readyUsers: fakeUsers });
    });

  });
  describe(`Api action: ${ActionName.FetchUserListAmount}`, () => {
    it('should update users amount if is fullfilled', () => {
      expect(
        userData.reducer(state, {
          type: fetchUserListAmount.fulfilled.type,
          payload: fakeUsers.length,
        })
      ).toEqual({ ...state, totalAmount: fakeUsers.length });
    });
  });

});
