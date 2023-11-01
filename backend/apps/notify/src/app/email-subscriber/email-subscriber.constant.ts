export const DEFAULT_OPTION_SPACE = 'application.db';

export const SUBSCRIBERS_COLLECTION_NAME = 'email-subscribers';

export const EXCHANGE_NAME = 'fit-friends.notify';

export const EmailError = {
  InvalidEmail: 'User with this email already exists',
  EmptyName: 'Name is empty',
  InvalidSubscriber: 'No subscriber with such email',
} as const;

export const QueueName = {
  AddSubscriber: 'fit-friends.notify.subscriber',
  UpdateSubscriber: 'fit-friends.notify.subscriber-upload',
  SendWorkouts: 'fit-friends.notify.newsletter',
} as const;
