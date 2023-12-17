import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const store = mockStore();
const Path = {
  Initial: '/initial',
  Next: '/next',
};
describe('Component: HistoryRoute', () => {
  beforeEach(() => {
    history.push(Path.Initial);
  });
  it('component should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <h1>{Path.Initial}</h1>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(Path.Initial)).toBeInTheDocument();
  });

  it('should redirect correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={Path.Initial}
              element={<h1>{Path.Initial}</h1>}
            />
            <Route
              path={Path.Next}
              element={<h1>{Path.Next}</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    act(() => history.push(Path.Next));

    expect(screen.getByText(Path.Next)).toBeInTheDocument();
  });
});
