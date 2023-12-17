import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCoach, makeFakeUser } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import FriendCard from './friend-card';

const mockStore = configureMockStore();
const fakeCoach = makeFakeCoach();
const fakeUser = makeFakeUser();
const history = createMemoryHistory();
const store = mockStore();

describe('Component: FriendCard', () => {

  it('component should render correctly', () => {
    const friendCardId = 'friend-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FriendCard friend={fakeCoach} currentUser={fakeUser}/>
        </HistoryRouter>
      </Provider>
    );
    const friendCardElement = screen.getByTestId(friendCardId);
    const friendNameElement = screen.getByText(fakeCoach.name);

    expect(friendCardElement).toBeInTheDocument();
    expect(friendNameElement).toBeInTheDocument();
  });
});
