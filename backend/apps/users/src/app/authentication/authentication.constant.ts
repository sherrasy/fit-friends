export const  API_TAG_NAME ='authentication'

export const AuthError = {
  UserExists: 'User with this email already exists',
  NotFound : 'User is not found',
  PasswordWrong : 'Password is wrong',
  InvalidData: 'Data is invalid'
} as const;

export const AuthMessages = {
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "User data found",
  Refresh: 'Get a new access/refresh tokens',
} as const;

export const AuthPath = {
  Main:'auth',
  Register:'register',
  Login:'login',
  Id:':id',
  Refresh:'refresh',
  Check:'check',
}as const;
