export const ErrorMessage = {
  Name: 'Only ru/en letters',
  Email: 'Email is invalid',
} as const;

export const DEFAULT_MIN_PRICE = 0;

export const DEFAULT_ORDER_TYPE = 'абонемент';

export const USERNAME_PATTERN = /^[a-zA-Zа-яА-Я\s]+$/g;

export const NameLength = {
  Min: 1,
  Max: 15,
};

export const DescriptionLength = {
  Min: 10,
  Max: 140,
};

export const CaloriesAmount = {
  Min: 1000,
  Max: 5000,
};

export const WorkoutsAmount = {
  Min: 1,
  Max: 50,
};

export const PasswordLength = {
  Min: 6,
  Max: 12,
};

export const ReviewTextLength = {
  Min: 100,
  Max: 1024,
};

export const RaitingCount = {
  Min: 1,
  Max: 5,
};
