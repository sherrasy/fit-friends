import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { UserRole } from '../../types/common/user-role.enum';
import { DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeUser } from '../../utils/mocks';
import UserCard from './user-card';

const mockStore = configureMockStore();
const fakeUser = makeFakeUser();
const store = mockStore({
  [ReducerName.User]: {
    role: UserRole.Sportsman,
  },
  [ReducerName.Account]: {
    isFriendStatusChanging: DefaultParam.Status,
  },
});
const history = createMemoryHistory();
describe('Component: UserCard', () => {

  it('should render correctly', () => {
    const userCardId = 'user-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserCard user={fakeUser} />
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(userCardId);
    const nameElement = screen.getByText(fakeUser.name);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
