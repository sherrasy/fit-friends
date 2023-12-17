import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import App from './app';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { AppRoute, AuthorizationStatus, DefaultParam, ReducerName } from '../../utils/constant';
import HistoryRouter from '../history-router/history-router';
import { makeFakeUser, makeFakeWorkout } from '../../utils/mocks';
import { UserRole } from '../../types/common/user-role.enum';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeWorkout = makeFakeWorkout();

const store = mockStore({
  [ReducerName.User]: {
    authStatus: AuthorizationStatus.Auth,
    userId: fakeUser.id,
    role: UserRole.Sportsman,
    currentUserData: fakeUser,
    userData: fakeUser,
    userListData: null,
    readyUsers: null,
    newUserData: null,
    isCurrentUserLoading: DefaultParam.Status,
    isUserLoading: DefaultParam.Status,
    isUserListLoading: DefaultParam.Status,
    isUserUpdating: DefaultParam.Status,
    isEmailExists: DefaultParam.Status,
    hasUserError: DefaultParam.Status,
    totalAmount: DefaultParam.Amount,
  },
  [ReducerName.Account]: {
    friends: null,
    friendsAmount: DefaultParam.Amount,
    orders: null,
    notifications: null,
    coachOrders: null,
    certificates: null,
    ordersAmount: DefaultParam.Amount,
    isFriendsLoading: DefaultParam.Status,
    isOrdersLoading: DefaultParam.Status,
    isFriendStatusChanging: DefaultParam.Status,
    isNotificationsLoading: DefaultParam.Status,
    isNotificationDeleting: DefaultParam.Status,
    hasNotificationsError: DefaultParam.Status,
  },
  [ReducerName.Workout]: {
    workouts: null,
    specialOfferWorkouts: null,
    popularWorkouts: null,
    workout: fakeWorkout,
    reviews: null,
    totalAmount: DefaultParam.Amount,
    maxPrice: DefaultParam.Amount,
    specialUserWorkouts: null,
    fullWorkouts: null,
    isWorkoutsLoading: DefaultParam.Status,
    isWorkoutLoading: DefaultParam.Status,
    isWorkoutPosting: DefaultParam.Status,
    isReviewsLoading: DefaultParam.Status,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Intro" when user navigate to "/"', () => {
    const NameInfoToText = {
      signIn:'Регистрация',
      login:'Вход',
    };
    history.push(AppRoute.Intro);
    render(fakeApp);

    const signInElement = screen.getByText(NameInfoToText.signIn);
    const loginElement = screen.getByText(NameInfoToText.login);

    expect(signInElement).toBeInTheDocument();
    expect(loginElement).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to "/login" and already authorized', () => {
    const ElementToTestId = {
      specialForUser:'special-for-you',
      specialOffer:'special-offers',
      popular:'popular-trainings',
      lookForCompany:'look-for-company',
    };
    history.push(AppRoute.Login);
    render(fakeApp);
    const specialForUserElement = screen.getByTestId(ElementToTestId.specialForUser);
    const specialOfferElement = screen.getByTestId(ElementToTestId.specialOffer);
    const popularElement = screen.getByTestId(ElementToTestId.popular);
    const lookForCompanyElement = screen.getByTestId(ElementToTestId.lookForCompany);

    expect(specialForUserElement).toBeInTheDocument();
    expect(specialOfferElement).toBeInTheDocument();
    expect(popularElement).toBeInTheDocument();
    expect(lookForCompanyElement).toBeInTheDocument();
  });

  it('should render "UserAccount" when user navigate to "/user-account"', () => {
    const userInfoId = 'user-info';
    history.push(AppRoute.UserAccount);
    render(fakeApp);

    expect(screen.getByTestId(userInfoId)).toBeInTheDocument();
  });

  it('should render "User" when user navigate to "/user-info/:id"', () => {
    const userCardId = 'user-card';
    history.push(`${AppRoute.UserInfo}/${fakeUser.id}`);
    render(fakeApp);

    expect(screen.getByText(`${fakeUser.name}`)).toBeInTheDocument();
    expect(screen.getByTestId(userCardId)).toBeInTheDocument();
  });

  it('should render "Workout" when user navigate to "/workout-info/:id"', () => {
    const priceLabelText = 'Стоимость';
    history.push(`${AppRoute.WorkoutInfo}/${fakeWorkout.id}`);

    render(fakeApp);

    expect(screen.getByLabelText(`${fakeWorkout.name}`)).toBeInTheDocument();
    expect(screen.getByLabelText(priceLabelText)).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    const mockRoute = '/non-existent-route';
    const textData = 'Страница не найдена.';
    const subtextData = 'Возможно, страница была удалена или её вовсе не существовало.';
    history.push(mockRoute);

    render(fakeApp);

    const textElement = screen.getByText(textData);
    const subtextElement = screen.getByText(subtextData);

    expect(textElement).toBeInTheDocument();
    expect(subtextElement).toBeInTheDocument();
  });
});
