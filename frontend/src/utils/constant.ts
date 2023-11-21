export const AppRoute = {
  Main: '/main',
  Intro: '/',
  Login: '/login',
  Register: '/register',
  AddWorkout: '/add-workout',
  EditWorkout: '/edit-workout',
  CoachAccount: '/coach-account',
  UserAccount: '/user-account',
  Friends: '/friends',
  UserInfo: '/user-info',
  WorkoutInfo: '/workout-info',
  Orders: '/orders',
  Purchases: '/purchases',
  CoachWorkouts: '/coach-workouts',
  Questionnaire: '/questionnaire',
  UserList:'/user-list',
  WorkoutsList:'/workouts-list',
  Error: '*',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ReducerName = {
  User: 'USER',
  Account: 'ACCOUNT',
  Workout: 'WORKOUT',
} as const;

export const ActionName = {
  CheckAuth: 'checkAuth',
  CheckEmail: 'checkEmail',
  Login: 'login',
  Register: 'register',
  Redirect: 'app/redirectToRoute',
  FetchUser: 'fetch-user',
  FetchCurrentUser: 'fetch-current-user',
  FetchUserList: 'fetch-user-list',
  FetchFriends: 'fetch-friends',
  FetchUserOrders: 'fetch-user-orders',
  FetchCoachOrders: 'fetch-coach-orders',
  FetchWorkouts: 'fetch-workouts',
  FetchUserSpecialWorkouts: 'fetch-special-workouts',
  fetchCoachWorkouts: 'fetch-coach-workouts',
  fetchWorkout: 'fetch-workout',
  fetchReviews: 'fetch-reviews',
  UpdateUser: 'update-user',
} as const;

export const ApiRoute = {
  UsersMain: '/users',
  WorkoutsMain: '/workouts',
  Login: '/users/login',
  CheckLogin: '/users/check-login',
  CheckEmail: '/users/check-email',
  Register: '/users/register',
  UsersShow: '/users/show',
  WorkoutsShow: '/workouts/show',
  PurchasesShow: '/workouts/orders',
  OrdersShow: '/workouts/orders/coach-list',
  ReviewsShow: '/workouts/show-reviews',
  CoachWorkoutsShow: '/workouts/coach-list',
  UpdateUser: '/users/update',
  Friends: '/users/friends',
  UploadAvatar: '/users/upload-avatar',
  File: '/uploads/file',
} as const;

export const ApiConnectParam = {
  Url:'http://localhost:4000/api',
  Timeout: 5000
};

export const ApiErrorsMessage = {
  Unauthorized: 'You\'re not logged in. Some features are not available',
  FetchPagesError:'Can`t get pages data'
} as const;

export const UserFormFieldName = {
  Name:'name',
  Email:'email',
  BirthDate:'birthDate',
  Location:'location',
  Password:'password',
  Sex:'sex',
  Role:'role',
  WorkoutTime:'workoutTime',
  FitnessLevel:'fitnessLevel',
  CaloriesTotal: 'caloriesTotal',
  CaloriesPerDay:'caloriesPerDay',
  SuccessInfo:'successInfo',
  Description:'description',
} as const;

export const UserFormError = {
  InvalidTypesLength:'Нельзя выбрать больше трех типов тренировок',
  InvalidEmail:'Этот email уже используется',
  RegistrationFailed:'Возникла ошибка регистрации. Проверьте введенные данные и попробуйте снова.',
  LoginFailed: 'Возникла ошибка входа. Проверьте введенные данные и попробуйте снова.',
} as const;

export const ReadyToTrainText = {
  Coach:'Готов тренировать',
  User:'Готов к тренировке',
} as const;

export const HeaderTab = {
  Main:'main',
  Account:'account',
  Friends: 'friends',
} as const;

export const UserSexToName = {
  male : 'Мужской',
  female : 'Женский',
  any : 'Неважно',
};
export const UserSexToHashtagName = {
  male : 'для_мужчин',
  female : 'для_женщин',
  any : 'для_всех',
};

export const LocationToName = {
  pionerskaya : 'Пионерская',
  petrogradskaya : 'Петроградская',
  udelnaya : 'Удельная',
  zvyozdnaya : 'Звездная',
  sportivnaya : 'Спортивная',
};

export const WorkoutTypeToName = {
  yoga : 'йога',
  running : 'бег',
  boxing : 'бокс',
  stretching : 'стрейчинг',
  crossfit : 'кроссфит',
  aerobics : 'аэробика',
  pilates : 'пилатес',
};

export const FitnessLevelToName = {
  beginner:'Новичок',
  amateur:'Любитель',
  pro:'Профессионал',
};

export const DefaultParam = {
  Step: 1,
  StepBack: -1,
  Amount: 0,
  Status: false,
};


export const FileTypeName = {
  Avatar: 'avatar',
  UserPhoto: 'user-photo',
  WorkoutPhoto: 'workout-photo',
  Certificate: 'certificate',
  Video: 'video',
} as const;

export const CardsLimit = {
  Default:6,
  CoachOrders:4,
  SpecialOffer:3,
  SpecialForUser:9,
  ReadyUsers:8,
};

export const sortDirections = ['asc', 'desc'];
