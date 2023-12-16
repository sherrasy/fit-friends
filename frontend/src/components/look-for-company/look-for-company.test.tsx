import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '../../utils/constant';
import { makeFakeUsers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import LookForCompany from './look-for-company';

const mockStore = configureMockStore();
const fakeUsers = makeFakeUsers();
const history = createMemoryHistory();
const store = mockStore({
  [ReducerName.User]: {
    readyUsers: fakeUsers,
  },
});
describe('Component: LookForCompany', () => {

  it('component should render correctly', () => {
    const companyBlockId = 'look-for-company';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LookForCompany />
        </HistoryRouter>
      </Provider>
    );
    const lookForCompanyElement = screen.getByTestId(companyBlockId);

    expect(lookForCompanyElement).toBeInTheDocument();
  });
});
