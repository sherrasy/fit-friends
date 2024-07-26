import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '@services/api';
import { State } from '@frontend-types/state.type';
import {
  ActionName,
  ApiRoute,
  DefaultParam,
  ReducerName,
} from '@utils/constant';
import {
  getFriendsQueryString,
  getOrdersQueryString,
} from '@utils/helpers';
import {
  addFriend,
  fetchCoachOrders,
  fetchFriends,
  fetchNotifications,
  fetchUserOrders,
  removeFriend,
  removeNotification,
} from '@store/account-data/api-actions';
import {
  fakeCoachOrders,
  fakeFriend,
  fakeNotifications,
  fakeOrders,
} from './test-mocks';

describe(`Async actions ${ReducerName.Account}`, () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it(`should show friends when dispatched ${ActionName.FetchFriends}`, async () => {
    const queryString = getFriendsQueryString();
    mockAPI
      .onGet(`${ApiRoute.Friends}${queryString}`)
      .reply(200, [fakeFriend])
      .onGet(`${ApiRoute.Friends}/count`)
      .reply(200, DefaultParam.Step);
    if (fakeFriend.avatar) {
      mockAPI
        .onGet(`${ApiRoute.File}/${fakeFriend.avatar}`)
        .reply(200, fakeFriend.avatarPath);
    }
    const store = mockStore();
    await store.dispatch(fetchFriends());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchFriends.pending.type,
      fetchFriends.fulfilled.type,
    ]);
  });

  it(`should add friend when dispatched ${ActionName.AddFriend}`, async () => {
    mockAPI.onPost(`${ApiRoute.Friends}/${fakeFriend.id}`).reply(200);
    const store = mockStore();
    await store.dispatch(addFriend(fakeFriend.id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      addFriend.pending.type,
      fetchFriends.pending.type,
      addFriend.fulfilled.type,
    ]);
  });

  it(`should remove friend when dispatched ${ActionName.RemoveFriend}`, async () => {
    mockAPI.onDelete(`${ApiRoute.Friends}/${fakeFriend.id}`).reply(200);
    const store = mockStore();
    await store.dispatch(removeFriend(fakeFriend.id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      removeFriend.pending.type,
      fetchFriends.pending.type,
      removeFriend.fulfilled.type,
    ]);
  });

  it(`should show user orders when dispatched ${ActionName.FetchUserOrders}`, async () => {
    mockAPI.onGet(ApiRoute.PurchasesShow).reply(200, fakeOrders);
    const store = mockStore();
    await store.dispatch(fetchUserOrders());
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchUserOrders.pending.type,
      fetchUserOrders.fulfilled.type,
    ]);
  });

  it(`should show coach orders when dispatched ${ActionName.FetchCoachOrders}`, async () => {
    const queryString = getOrdersQueryString();
    mockAPI
      .onGet(`${ApiRoute.OrdersShow}${queryString}`)
      .reply(200, fakeCoachOrders)
      .onGet(`${ApiRoute.OrdersShow}/count`)
      .reply(200, fakeCoachOrders.length);
    const store = mockStore();
    await store.dispatch(fetchCoachOrders());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchCoachOrders.pending.type,
      fetchCoachOrders.fulfilled.type,
    ]);
  });

  it(`should show notifications when dispatched ${ActionName.FetchNotifications}`, async () => {
    mockAPI.onGet(ApiRoute.Notifications).reply(200, fakeNotifications);
    const store = mockStore();
    await store.dispatch(fetchNotifications());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchNotifications.pending.type,
      fetchNotifications.fulfilled.type,
    ]);
  });

  it(`should remove notification when dispatched ${ActionName.RemoveNotification}`, async () => {
    mockAPI
      .onDelete(`${ApiRoute.Notifications}/${fakeNotifications[0].id}`)
      .reply(200);
    const store = mockStore();
    await store.dispatch(removeNotification(fakeNotifications[0].id));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      removeNotification.pending.type,
      removeNotification.fulfilled.type,
    ]);
  });
});
