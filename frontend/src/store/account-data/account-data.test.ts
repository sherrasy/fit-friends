import { AccountState } from '../../types/state.type';
import { ActionName, DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeCertificates, makeFakeCoachOrders, makeFakeNotifications, makeFakeOrders, makeFakeUsers } from '../../utils/mocks';
import { accountData } from './account-data';
import { addFriend, fetchCoachCertificates, fetchCoachOrders, fetchFriends, fetchNotifications, fetchUserOrders, removeFriend, removeNotification } from './api-actions';

const fakeFriends = makeFakeUsers();
const fakeOrders = makeFakeOrders();
const fakeCoachOrders = makeFakeCoachOrders();
const fakeNotifications = makeFakeNotifications();
const fakeCertificates = makeFakeCertificates();

describe(`Reducer: ${ReducerName.Account}`, () => {
  let state: AccountState;
  beforeEach(() => {
    state = {
      friends:null,
      friendsAmount:DefaultParam.Amount,
      orders:null,
      notifications:null,
      coachOrders:null,
      certificates:null,
      ordersAmount:DefaultParam.Amount,
      isFriendsLoading:DefaultParam.Status,
      isOrdersLoading:DefaultParam.Status,
      isFriendStatusChanging:DefaultParam.Status,
      isNotificationsLoading:DefaultParam.Status,
      isNotificationDeleting:DefaultParam.Status,
      hasNotificationsError:DefaultParam.Status,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(accountData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe(`Api action: ${ActionName.FetchFriends}`, () => {
    const friendsData = {friends: fakeFriends,friendsAmount:fakeFriends.length };

    it('should update loading status to "true" if is pending', () => {
      expect(
        accountData.reducer(state, { type: fetchFriends.pending.type })
      ).toEqual({ ...state, isFriendsLoading: true });
    });
    it('should update loading status to "false" and loaded friends to friends if is fullfilled', () => {
      expect(
        accountData.reducer(state, {
          type: fetchFriends.fulfilled.type,
          payload:          friendsData,
        })
      ).toEqual({ ...state, ...friendsData});
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        accountData.reducer(state, { type: fetchFriends.rejected.type })
      ).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchUserOrders}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        accountData.reducer(state, { type: fetchUserOrders.pending.type })
      ).toEqual({ ...state, isOrdersLoading: true });
    });
    it('should update loading status to "false" and loaded orders to orders if is fullfilled', () => {
      expect(
        accountData.reducer(state, {
          type: fetchUserOrders.fulfilled.type,
          payload: fakeOrders,
        })
      ).toEqual({ ...state, orders: fakeOrders });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        accountData.reducer(state, { type: fetchUserOrders.rejected.type })
      ).toEqual(state);
    });
  });
  describe(`Api action: ${ActionName.FetchCoachOrders}`, () => {
    const ordersData = {orders:fakeCoachOrders, ordersAmount: fakeCoachOrders.length};
    it('should update loading status to "true" if is pending', () => {
      expect(
        accountData.reducer(state, { type: fetchCoachOrders.pending.type })
      ).toEqual({ ...state, isOrdersLoading: true });
    });
    it('should update loading status to "false" and loaded orders to orders if is fullfilled', () => {
      expect(
        accountData.reducer(state, {
          type: fetchCoachOrders.fulfilled.type,
          payload: ordersData,
        })
      ).toEqual({ ...state, coachOrders:ordersData.orders, ordersAmount:ordersData.ordersAmount });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        accountData.reducer(state, { type: fetchCoachOrders.rejected.type })
      ).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchNotifications}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        accountData.reducer(state, { type: fetchNotifications.pending.type })
      ).toEqual({ ...state, isNotificationsLoading: true });
    });
    it('should update loading status to "false" and loaded notifications to notifications if is fullfilled', () => {
      expect(
        accountData.reducer(state, {
          type: fetchNotifications.fulfilled.type,
          payload: fakeNotifications,
        })
      ).toEqual({ ...state, notifications:fakeNotifications });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        accountData.reducer(state, { type: fetchNotifications.rejected.type })
      ).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchCertificates}`, () => {
    it('should update loading status to "false" and loaded certificates to certificates if is fullfilled', () => {
      expect(
        accountData.reducer(state, {
          type: fetchCoachCertificates.fulfilled.type,
          payload: fakeCertificates,
        })
      ).toEqual({ ...state, certificates:fakeCertificates });
    });
  });

  describe(`Api action: ${ActionName.RemoveNotification}`, () => {
    it('should update notification status if is pending', () => {
      expect(accountData.reducer(state, { type: removeNotification.pending.type })).toEqual({ ...state, isNotificationDeleting: true });
    });
    it('should update notification status changed', () => {
      expect(accountData.reducer(state, { type: removeNotification.fulfilled.type })).toEqual(state);
    });
    it('should not update notification status if an error occured', () => {
      expect(accountData.reducer(state, { type: removeNotification.rejected.type })).toEqual({ ...state, hasNotificationsError: true });
    });
  });
  describe(`Api action: ${ActionName.AddFriend}`, () => {
    it('should update friend status if is pending', () => {
      expect(accountData.reducer(state, { type: addFriend.pending.type })).toEqual({ ...state, isFriendStatusChanging: true });
    });
    it('should update friends if friend status changed', () => {
      expect(accountData.reducer(state, { type: addFriend.fulfilled.type })).toEqual(state);
    });
    it('should not update friend status if an error occured', () => {
      expect(accountData.reducer(state, { type: addFriend.rejected.type })).toEqual(state);
    });
  });
  describe(`Api action: ${ActionName.RemoveFriend}`, () => {
    it('should update friend status if is pending', () => {
      expect(accountData.reducer(state, { type: removeFriend.pending.type })).toEqual({ ...state, isFriendStatusChanging: true });
    });
    it('should update friends if friend status changed', () => {
      expect(accountData.reducer(state, { type: removeFriend.fulfilled.type })).toEqual(state);
    });
    it('should not update friend status if an error occured', () => {
      expect(accountData.reducer(state, { type: removeFriend.rejected.type })).toEqual(state);
    });
  });

});
