import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute, DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeUser, makeFakeUsers } from '../../utils/mocks';
import FriendsPage from './friends-page';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();
const fakeUsers = makeFakeUsers();
const store = mockStore({
  [ReducerName.User]: {
    role: fakeUser.role,
    currentUserData: fakeUser,
  },
  [ReducerName.Account]: {
    notifications: null,
    friends: fakeUsers,
    friendsAmount: fakeUsers.length,
    isFriendsLoading: DefaultParam.Status,
  },
});
const history = createMemoryHistory();
describe('Component: FriendsPage', () => {
  beforeAll(() => {
    history.push(AppRoute.Friends);
  });
  it('should render correctly', () => {
    const titleUsers = 'Мои друзья';
    const listId = 'friends-list';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FriendsPage />
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getByText(titleUsers);
    const listElement = screen.getByTestId(listId);

    expect(titleElement).toBeInTheDocument();
    expect(listElement).toBeInTheDocument();
    expect(history.location.pathname).toBe(AppRoute.Friends);
  });
});
