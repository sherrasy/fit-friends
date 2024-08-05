import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import {
  AppRoute,
  AuthorizationStatus,
  DefaultParam,
  ReducerName,
} from '@utils/constant';
import { makeFakeUser, makeFakeWorkouts } from '@utils/mocks';
import MainPage from '@pages/main-page/main-page';

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
    const DataTestId = {
      SpecialForUser:'special-for-you',
      SpecialOffer:'special-offers',
      Popular:'popular-trainings',
      Company:'look-for-company',
    };
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainPage />
        </HistoryRouter>
      </Provider>
    );

    const specialForUserElement = screen.getByTestId(DataTestId.SpecialForUser);
    const specialOfferElement = screen.getByTestId(DataTestId.SpecialOffer);
    const popularElement = screen.getByTestId(DataTestId.Popular);
    const lookForCompanyElement = screen.getByTestId(DataTestId.Company);

    expect(specialForUserElement).toBeInTheDocument();
    expect(specialOfferElement).toBeInTheDocument();
    expect(popularElement).toBeInTheDocument();
    expect(lookForCompanyElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.Main}`);
  });
});
