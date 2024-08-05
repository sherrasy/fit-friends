import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '@components/history-router/history-router';
import { AppRoute, ReducerName } from '@utils/constant';
import { makeFakeUser } from '@utils/mocks';
import UserInfoPage from '@pages/user-info-page/user-info-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
    userData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
  },
  [ReducerName.Workout]: {
    workouts: null,
  },
});
const history = createMemoryHistory();
describe('Component: UserInfoPage', () => {
  beforeAll(() => {
    history.push(`${AppRoute.UserAccount}/${fakeUser.id}`);
  });
  it('should render correctly', () => {
    const userInfoCard = 'user-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserInfoPage />
        </HistoryRouter>
      </Provider>
    );

    const infoElement = screen.getByTestId(userInfoCard);

    expect(infoElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.UserAccount}/${fakeUser.id}`);
  });
});
