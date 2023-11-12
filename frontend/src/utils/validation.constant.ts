export const ValidationPattern = {
  Email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,5}$/,
  Password: /^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z\d0-9]{6,12}$/,
  Name: /^[a-zA-Zа-яА-Я]{1,15}$/,
} as const;

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

export const WORKOUT_TYPE_AMOUNT = 3;
