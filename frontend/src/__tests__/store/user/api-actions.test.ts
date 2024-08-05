import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '@services/api';
import { State } from '@frontend-types/state.type';
import {
  ActionName,
  ApiRoute,
  CardsLimit,
  DefaultParam,
  ReducerName,
} from '@utils/constant';
import { fakeSportsmanInfo, fakeUser, fakeUserGeneral } from './test-mocks';
import {
  checkAuth,
  checkEmail,
  fetchCurrentUser,
  fetchReadyUserList,
  fetchUser,
  fetchUserList,
  fetchUserListAmount,
  login,
  register,
  updateUser,
} from '@store/user-data/api-actions';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { redirectToRoute } from '@store/action';
import { AUTH_TOKEN_KEY_NAME } from '@services/token';
import { setUserData } from '@store/user-data/user-data';

describe(`Async actions ${ReducerName.User}`, () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it(`should set authorization status when dispatched ${ActionName.CheckAuth}`, async () => {
    mockAPI.onGet(ApiRoute.CheckLogin).reply(200, fakeUser);
    if (fakeUser.avatar) {
      mockAPI
        .onGet(`${ApiRoute.File}/${fakeUser.avatar}`)
        .reply(200, fakeUser.avatarPath);
    }

    const store = mockStore();
    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([checkAuth.pending.type, checkAuth.fulfilled.type]);
  });

  it(`should set email exists status when dispatched ${ActionName.CheckEmail}`, async () => {
    mockAPI.onPost(ApiRoute.CheckEmail).reply(200, fakeUser);

    const store = mockStore();
    await store.dispatch(checkEmail(fakeUser.email));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([checkEmail.pending.type, checkEmail.fulfilled.type]);
  });

  it(`should save login token data when dispatched ${ActionName.Login}`, async () => {
    mockAPI
      .onPost(ApiRoute.Login)
      .reply(200, {accessToken: fakeUser.token});

    const store = mockStore();
    Storage.prototype.setItem = vi.fn();

    await store.dispatch(login({email:fakeUserGeneral.email, password:fakeUserGeneral.password}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      login.pending.type,
      login.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
    expect(Storage.prototype.setItem).toHaveBeenCalledWith(AUTH_TOKEN_KEY_NAME, fakeUser.token);
  });

  it(`should post user data when dispatched ${ActionName.Register}`, async () => {
    mockAPI
      .onPost(ApiRoute.Register)
      .reply(200, fakeUser)
      .onPost(ApiRoute.Login)
      .reply(200, {accessToken: fakeUser.token});

    const store = mockStore();
    await store.dispatch(register({...fakeUserGeneral, ...fakeSportsmanInfo}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      register.pending.type,
      setUserData.type,
      fetchCurrentUser.pending.type,
      redirectToRoute.type,
      register.fulfilled.type,
    ]);
  });

  it(`should show user  when dispatched ${ActionName.FetchUser}`, async () => {
    mockAPI.onGet(`${ApiRoute.UsersMain}/${fakeUser.id}`).reply(200, fakeUser);
    if (fakeUser.avatar) {
      mockAPI
        .onGet(`${ApiRoute.File}/${fakeUser.avatar}`)
        .reply(200, fakeUser.avatarPath);
    }
    const store = mockStore();
    await store.dispatch(fetchUser(fakeUser.id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([fetchUser.pending.type, fetchUser.fulfilled.type]);
  });

  it(`should show current user when dispatched ${ActionName.FetchCurrentUser}`, async () => {
    mockAPI.onGet(`${ApiRoute.UsersMain}/${fakeUser.id}`).reply(200, fakeUser);
    if (fakeUser.avatar) {
      mockAPI
        .onGet(`${ApiRoute.File}/${fakeUser.avatar}`)
        .reply(200, fakeUser.avatarPath);
    }
    const store = mockStore();
    await store.dispatch(fetchUser(fakeUser.id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([fetchUser.pending.type, fetchUser.fulfilled.type]);
  });

  it(`should show ready user list when dispatched ${ActionName.FetchReadyUserList}`, async () => {
    const queryString = `?role=${UserRole.Sportsman}`;
    mockAPI
      .onGet(`${ApiRoute.UsersShow}${queryString}`)
      .reply(200, [fakeUser]);
    if (fakeUser.avatar) {
      mockAPI
        .onGet(`${ApiRoute.File}/${fakeUser.avatar}`)
        .reply(200, fakeUser.avatarPath);
    }
    const store = mockStore();
    await store.dispatch(fetchReadyUserList());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchReadyUserList.pending.type,
      fetchUserListAmount.pending.type,
      fetchReadyUserList.fulfilled.type,
    ]);
  });

  it(`should show user list when dispatched ${ActionName.FetchUserList}`, async () => {
    const queryString = `?limit=${CardsLimit.Default}&page=${DefaultParam.Step}`;
    mockAPI
      .onGet(`${ApiRoute.UsersShow}${queryString}`)
      .reply(200, [fakeUser]);
    if (fakeUser.avatar) {
      mockAPI
        .onGet(`${ApiRoute.File}/${fakeUser.avatar}`)
        .reply(200, fakeUser.avatarPath);
    }
    const store = mockStore();
    await store.dispatch(fetchUserList());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchUserList.pending.type,
      fetchUserListAmount.pending.type,
      fetchUserList.fulfilled.type,
    ]);
  });

  it(`should show user list amount when dispatched ${ActionName.FetchUserListAmount}`, async () => {
    mockAPI.onGet(`${ApiRoute.UsersShow}/count`).reply(200, DefaultParam.Step);
    const store = mockStore();
    await store.dispatch(fetchUserListAmount());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchUserListAmount.pending.type,
      fetchUserListAmount.fulfilled.type,
    ]);
  });

  it(`should update user when dispatched ${ActionName.UpdateUser}`, async () => {
    mockAPI
      .onPatch(ApiRoute.UpdateUser)
      .reply(200, { ...fakeUser, name: fakeUserGeneral.name });
    const store = mockStore();
    await store.dispatch(
      updateUser({ ...fakeUser, name: fakeUserGeneral.name })
    );
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      updateUser.pending.type,
      fetchCurrentUser.pending.type,
      updateUser.fulfilled.type,
    ]);
  });

});
