export const API_TAG_NAME = 'orders';

export const OrdersError = {
  OrderNotFound: 'Order is not found',
  EmptyOrders: 'There are no orders that can be loaded',
  WrongWorkout: 'Workout with such id doesnt exist',
  WrongUser: 'User id doesn`t match',
} as const;

export const OrdersMessage = {
  Add: 'Order added',
  ShowAll: 'Orders of workouts is showing',
} as const;

export const OrdersPath = {
  Main: 'orders',
  CoachOrders: 'coach-list',
} as const;
