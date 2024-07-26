import { AuthorizationStatus, CardsLimit, DefaultParam, ReducerName } from '@utils/constant';
import { getAuthCheckedStatus, getCurrentUserData, getCurrentUserLoadingStatus, getEmailExistsStatus, getIsAuthorized, getNewUserData, getReadyUsers, getUserData, getUserError, getUserId, getUserList, getUserListLoadingStatus, getUserLoadingStatus, getUserPages, getUserRole, getUserUpdatingStatus } from '@store/user-data/selectors';
import { fakeUser, fakeUserGeneral, fakeUsers } from './test-mocks';

describe(`${ReducerName.User} selectors`, () => {

  const state = {
    [ReducerName.User]: {
      authStatus:AuthorizationStatus.Unknown,
      userId: fakeUser.id,
      role: fakeUser.role,
      currentUserData:fakeUser,
      userData:fakeUser,
      userListData:fakeUsers,
      readyUsers:fakeUsers,
      newUserData:fakeUserGeneral,
      isCurrentUserLoading:DefaultParam.Status,
      isUserLoading:DefaultParam.Status,
      isUserListLoading:DefaultParam.Status,
      isUserUpdating:DefaultParam.Status,
      isEmailExists:DefaultParam.Status,
      hasUserError:DefaultParam.Status,
      totalAmount:DefaultParam.Amount,
    }
  };

  it('should return true if status AUTH', () => {
    const result = getIsAuthorized({ [ReducerName.User]: {...state[ReducerName.User], authStatus:AuthorizationStatus.Auth} });
    expect(result).toEqual(true);
  });
  it('should return false if status is not AUTH', () => {
    const result = getIsAuthorized({ [ReducerName.User]: {...state[ReducerName.User], authStatus:AuthorizationStatus.NoAuth} });
    expect(result).toEqual(DefaultParam.Status);
  });

  it('should return true if status checked', () => {
    const result = getAuthCheckedStatus({ [ReducerName.User]: {...state[ReducerName.User], authStatus:AuthorizationStatus.Auth} });
    expect(result).toEqual(true);
  });
  it('should return false if status is not checked', () => {
    const result = getAuthCheckedStatus({ [ReducerName.User]: {...state[ReducerName.User], authStatus:AuthorizationStatus.Unknown} });
    expect(result).toEqual(DefaultParam.Status);
  });

  it('should return current user from state', () => {
    const { currentUserData } = state[ReducerName.User];
    const result = getCurrentUserData(state);
    expect(result).toEqual(currentUserData);
  });

  it('should return user from state', () => {
    const { userData } = state[ReducerName.User];
    const result = getUserData(state);
    expect(result).toEqual(userData);
  });

  it('should return current user role from state', () => {
    const { role } = state[ReducerName.User];
    const result = getUserRole(state);
    expect(result).toEqual(role);
  });
  it('should return current user id from state', () => {
    const { userId } = state[ReducerName.User];
    const result = getUserId(state);
    expect(result).toEqual(userId);
  });

  it('should return current user data loading status', () => {
    const { isCurrentUserLoading } = state[ReducerName.User];
    const result = getCurrentUserLoadingStatus(state);
    expect(result).toBe(isCurrentUserLoading);
  });

  it('should return user data loading status', () => {
    const { isUserLoading } = state[ReducerName.User];
    const result = getUserLoadingStatus(state);
    expect(result).toBe(isUserLoading);
  });

  it('should return user list data loading status', () => {
    const { isUserListLoading } = state[ReducerName.User];
    const result = getUserListLoadingStatus(state);
    expect(result).toBe(isUserListLoading);
  });
  it('should return user updating status', () => {
    const { isUserUpdating } = state[ReducerName.User];
    const result = getUserUpdatingStatus(state);
    expect(result).toBe(isUserUpdating);
  });

  it('should return email exists status', () => {
    const { isEmailExists } = state[ReducerName.User];
    const result = getEmailExistsStatus(state);
    expect(result).toBe(isEmailExists);
  });

  it('should return new user data from state', () => {
    const { newUserData } = state[ReducerName.User];
    const result = getNewUserData(state);
    expect(result).toEqual(newUserData);
  });

  it('should return user list data from state', () => {
    const { userListData } = state[ReducerName.User];
    const result = getUserList(state);
    expect(result).toEqual(userListData);
  });

  it('should return ready user list data from state', () => {
    const { readyUsers } = state[ReducerName.User];
    const result = getReadyUsers(state);
    expect(result).toEqual(readyUsers);
  });

  it('should return user error data from state', () => {
    const { hasUserError } = state[ReducerName.User];
    const result = getUserError(state);
    expect(result).toEqual(hasUserError);
  });

  it('should return pages from state users', () => {
    const { totalAmount } = state[ReducerName.User];
    const pagesAmount = Math.ceil(totalAmount / CardsLimit.Default);
    const result = getUserPages(state);
    expect(result).toEqual(pagesAmount);
  });

});
