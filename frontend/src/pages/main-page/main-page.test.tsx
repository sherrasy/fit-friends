import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import {
  AppRoute,
  AuthorizationStatus,
  DefaultParam,
  ReducerName,
} from '../../utils/constant';
import { makeFakeUser, makeFakeWorkouts } from '../../utils/mocks';
import MainPage from './main-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeWorkouts = makeFakeWorkouts();
const store = mockStore({
  [ReducerName.User]: {
    authStatus: AuthorizationStatus.Auth,
    userId: fakeUser.id,
    role: fakeUser.role,
    currentUserData: fakeUser,
    readyUsers: null,
    isCurrentUserLoading: DefaultParam.Status,
  },
  [ReducerName.Account]: {
    notifications: null,
  },
  [ReducerName.Workout]: {
    specialOfferWorkouts: fakeWorkouts,
    popularWorkouts: fakeWorkouts,
    specialUserWorkouts: fakeWorkouts,
  },
});
const history = createMemoryHistory();
describe('Component: MainPage', () => {
  beforeAll(() => {
    history.push(AppRoute.Main);
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>
    );

    const specialForUserElement = screen.getByTestId('special-for-you');
    const specialOfferElement = screen.getByTestId('special-offers');
    const popularElement = screen.getByTestId('popular-trainings');
    const lookForCompanyElement = screen.getByTestId('look-for-company');

    expect(specialForUserElement).toBeInTheDocument();
    expect(specialOfferElement).toBeInTheDocument();
    expect(popularElement).toBeInTheDocument();
    expect(lookForCompanyElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Main}`);
  });
});
