export const API_TAG_NAME = 'friends';

export const FriendsError = {
  NotFound: 'Friend is not found',
  AlreadyAdded: 'You already befriended this user',
} as const;

export const FriendsMessage = {
  Add: 'Friend added successfully',
  Show: 'Friend list is showing',
  Remove: 'Friend removed',
} as const;

export const FriendsPath = {
  Main: 'friends',
  Id: ':id',
} as const;
