import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, ReducerName } from '../../utils/constant';
import { makeFakeUser } from '../../utils/mocks';
import UserAccountPage from './user-account-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
  }
});
const history = createMemoryHistory();
describe('Component: UserAccountPage', () => {
  beforeAll(() => {
    history.push(AppRoute.UserAccount);
  });
  it('should render correctly', () => {
    const additionalInfoId = 'user-additional-info';
    const userInfoId = 'user-info';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserAccountPage />
        </HistoryRouter>
      </Provider>
    );

    const additionalInfoElement = screen.getByTestId(additionalInfoId);
    const infoElement = screen.getByTestId(userInfoId);

    expect(additionalInfoElement).toBeInTheDocument();
    expect(infoElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.UserAccount);
  });
});
