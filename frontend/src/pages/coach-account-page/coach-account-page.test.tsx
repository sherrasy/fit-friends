import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, ReducerName } from '../../utils/constant';
import { makeFakeCoach } from '../../utils/mocks';
import CoachAccountPage from './coach-account-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeCoach();
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
describe('Component: CoachAccountPage', () => {
  beforeAll(() => {
    history.push(AppRoute.CoachAccount);
  });
  it('should render correctly', () => {
    const navigationId = 'coach-navigation';
    const userInfoId = 'user-info';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CoachAccountPage />
        </HistoryRouter>
      </Provider>
    );

    const navigationElement = screen.getByTestId(navigationId);
    const infoElement = screen.getByTestId(userInfoId);

    expect(navigationElement).toBeInTheDocument();
    expect(infoElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(`${AppRoute.CoachAccount}`);
  });
});
