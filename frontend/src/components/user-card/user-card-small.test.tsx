import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import { makeFakeUser } from '../../utils/mocks';
import UserCardSmall from './user-card-small';

const mockStore = configureMockStore();
const fakeUser = makeFakeUser();
const store = mockStore();
const history = createMemoryHistory();
describe('Component: UserCardSmall', () => {

  it('should render correctly', () => {
    const userCardId = 'user-card-small';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <UserCardSmall user={fakeUser} />
        </HistoryRouter>
      </Provider>
    );

    const cardElement = screen.getByTestId(userCardId);
    const nameElement = screen.getByText(fakeUser.name);

    expect(cardElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
  });
});
