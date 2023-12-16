import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { UserRole } from '../../types/common/user-role.enum';
import HistoryRouter from '../history-router/history-router';
import FriendRequestStatus from './friend-request-status';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore();
describe('Component: FriendRequestStatus', () => {

  it('component should render correctly', () => {
    const requestStatusId = 'request-status';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FriendRequestStatus initiatorRole={UserRole.Sportsman} recieverRole={UserRole.Coach}/>
        </HistoryRouter>
      </Provider>
    );
    const requestElement = screen.getByTestId(requestStatusId);

    expect(requestElement).toBeInTheDocument();
  });
});
