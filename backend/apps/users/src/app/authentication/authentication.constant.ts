export const API_TAG_NAME = 'authentication';

export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound: 'User is not found',
  PasswordWrong: 'Password is wrong',
  InvalidData: 'Data is invalid',
  TokenNotFound: 'Token does not exist',
} as const;

export const AuthMessages = {
  Register: 'User registered successfully',
  Login: 'Login successfull',
  Refresh: 'Get a new access/refresh tokens',
} as const;

export const AuthPath = {
  Main: 'auth',
  Register: 'register',
  Login: 'login',
  Refresh: 'refresh',
  Check: 'check',
  Revoke: 'revoke',
} as const;
