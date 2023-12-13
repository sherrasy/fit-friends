import { CardsLimit, DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeCertificates, makeFakeCoachOrders, makeFakeNotifications, makeFakeOrders, makeFakeUsers } from '../../utils/mocks';
import { getCertificates, getCoachOrders, getFriendChanging, getFriends, getFriendsLoadingStatus, getFriendsPages, getNotificationDeleting, getNotifications, getNotificationsError, getNotificationsLoading, getOrders, getOrdersLoadingStatus, getOrdersPages } from './selectors';

describe(`${ReducerName.Account} selectors`, () => {
  const fakeFriends = makeFakeUsers();
  const fakeOrders = makeFakeOrders();
  const fakeCoachOrders = makeFakeCoachOrders();
  const fakeNotifications = makeFakeNotifications();
  const fakeCertificates = makeFakeCertificates();
  const state = {
    [ReducerName.Account]: {
      friends:fakeFriends,
      friendsAmount:fakeFriends.length,
      orders:fakeOrders,
      notifications:fakeNotifications,
      coachOrders:fakeCoachOrders,
      certificates:fakeCertificates,
      ordersAmount:fakeCoachOrders.length,
      isFriendsLoading:DefaultParam.Status,
      isOrdersLoading:DefaultParam.Status,
      isFriendStatusChanging:DefaultParam.Status,
      isNotificationsLoading:DefaultParam.Status,
      isNotificationDeleting:DefaultParam.Status,
      hasNotificationsError:DefaultParam.Status,
    }
  };

  it('should return friends data loading status', () => {
    const { isFriendsLoading } = state[ReducerName.Account];
    const result = getFriendsLoadingStatus(state);
    expect(result).toBe(isFriendsLoading);
  });

  it('should return orders data loading status', () => {
    const { isOrdersLoading } = state[ReducerName.Account];
    const result = getOrdersLoadingStatus(state);
    expect(result).toBe(isOrdersLoading);
  });

  it('should return friends data from state', () => {
    const { friends } = state[ReducerName.Account];
    const result = getFriends(state);
    expect(result).toEqual(friends);
  });

  it('should return friend updating status', () => {
    const { isFriendStatusChanging } = state[ReducerName.Account];
    const result = getFriendChanging(state);
    expect(result).toBe(isFriendStatusChanging);
  });

  it('should return pages from state friends', () => {
    const { friendsAmount } = state[ReducerName.Account];
    const pagesAmount = Math.ceil(friendsAmount / CardsLimit.Default);
    const result = getFriendsPages(state);
    expect(result).toEqual(pagesAmount);
  });

  it('should return orders data from state', () => {
    const { orders } = state[ReducerName.Account];
    const result = getOrders(state);
    expect(result).toEqual(orders);
  });

  it('should return certificates data from state', () => {
    const { certificates } = state[ReducerName.Account];
    const result = getCertificates(state);
    expect(result).toEqual(certificates);
  });

  it('should return pages from state coach orders', () => {
    const { ordersAmount } = state[ReducerName.Account];
    const pagesAmount = Math.ceil(ordersAmount / CardsLimit.Default);
    const result = getOrdersPages(state);
    expect(result).toEqual(pagesAmount);
  });

  it('should return coach orders data from state', () => {
    const { coachOrders } = state[ReducerName.Account];
    const result = getCoachOrders(state);
    expect(result).toEqual(coachOrders);
  });

  it('should return notifications data from state', () => {
    const { notifications } = state[ReducerName.Account];
    const result = getNotifications(state);
    expect(result).toEqual(notifications);
  });

  it('should return notifications data loading status', () => {
    const { isNotificationsLoading } = state[ReducerName.Account];
    const result = getNotificationsLoading(state);
    expect(result).toBe(isNotificationsLoading);
  });

  it('should return notifications deleting status', () => {
    const { isNotificationDeleting } = state[ReducerName.Account];
    const result = getNotificationDeleting(state);
    expect(result).toBe(isNotificationDeleting);
  });

  it('should return notifications error data from state', () => {
    const { hasNotificationsError } = state[ReducerName.Account];
    const result = getNotificationsError(state);
    expect(result).toEqual(hasNotificationsError);
  });


});
