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
  FetchReadyUserList: 'fetch-ready-user-list',
  FetchUserListAmount: 'fetch-user-list-amount',
  FetchFriends: 'fetch-friends',
  AddFriend: 'add-friend',
  RemoveFriend: 'remove-friend',
  FetchUserOrders: 'fetch-user-orders',
  FetchCoachOrders: 'fetch-coach-orders',
  FetchCertificates: 'fetch-coach-certificates',
  PostCertificate: 'post-certificate',
  FetchWorkouts: 'fetch-workouts',
  FetchExtraWorkouts: 'fetch-extra-workouts',
  FetchUserSpecialWorkouts: 'fetch-special-workouts',
  FetchCoachWorkouts: 'fetch-coach-workouts',
  FetchWorkout: 'fetch-workout',
  CreateWorkout: 'create-workout',
  UpdateWorkout: 'update-workout',
  UpdateVideo: 'update-video',
  FetchReviews: 'fetch-reviews',
  FetchNotifications: 'fetch-notifications',
  UpdateUser: 'update-user',
  RemoveNotification: 'remove-notification',
} as const;

export const ApiRoute = {
  UsersMain: '/users',
  WorkoutsMain: '/workouts',
  CreateWorkout: '/workouts/add',
  Login: '/users/login',
  CheckLogin: '/users/check-login',
  CheckEmail: '/users/check-email',
  Register: '/users/register',
  UsersShow: '/users/show',
  WorkoutsShow: '/workouts/show',
  PurchasesShow: '/workouts/orders',
  OrdersShow: '/workouts/orders/coach-list',
  ReviewsShow: '/workouts/show-reviews',
  Notifications: '/users/notifications',
  CoachWorkoutsShow: '/workouts/coach-list',
  UpdateUser: '/users/update',
  Friends: '/users/friends',
  UploadAvatar: '/users/upload-avatar',
  UploadCertificate: '/users/upload-certificate',
  UploadVideo: '/upload-video',
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

export const FormFieldName = {
  Name:'name',
  Email:'email',
  BirthDate:'birthDate',
  Location:'location',
  Password:'password',
  Sex:'sex',
  Role:'role',
  Price:'price',
  WorkoutType:'workoutType',
  WorkoutTime:'workoutTime',
  FitnessLevel:'fitnessLevel',
  CaloriesTotal: 'caloriesTotal',
  CaloriesPerDay:'caloriesPerDay',
  SuccessInfo:'successInfo',
  Description:'description',
} as const;

export const WorkoutFilterName = {
  PriceMin:'priceMin',
  CaloriesMin:'caloriesMin',
  PriceMax:'priceMax',
  CaloriesMax:'caloriesMax',
} as const;

export const WorkoutFilterSortName = {
  Cheap:'cheap',
  Expensive:'expensive',
  Free:'free',
} as const;

export const PostWorkoutButtonText = {
  Default:'Опубликовать',
  Posting:'Отправка...',
} as const;

export const UserFormError = {
  InvalidTypesLength:'Нельзя выбрать больше трех типов тренировок',
  InvalidEmail:'Этот email уже используется',
  RegistrationFailed:'Возникла ошибка регистрации. Проверьте введенные данные и попробуйте снова.',
  LoginFailed: 'Возникла ошибка входа. Проверьте введенные данные и попробуйте снова.',
} as const;

export const ReadyToTrainText = {
  Coach:['Готов тренировать', 'Не готов тренировать'],
  User:['Готов к тренировке', 'Не готов тренироваться'],
} as const;

export const RequestWorkoutText = {
  Coach:'на персональную тренировку',
  User:'на совместную тренировку',
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

export const UserSexToFormName = {
  male : 'Мужчинам',
  female : 'Женщинам',
  any : 'Всем',
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

export const SliderLimit = {
  Default:4,
  SpecialOffer:1,
  SpecialForUser:3,
};

export const SliderBreakpointLimit = {
  Max:3000,
  Min:1024,
};

export const RandomNumberLimit = {
  Max:12,
  Min:1,
};

export const sortDirections = ['asc', 'desc'];

export const SortingFieldName = {
  Date: 'createdDate',
  Price: 'price',
  AmountOrdered: 'amountOrdered',
  PriceOrdered: 'priceOrdered',
};
