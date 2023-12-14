import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import PrivateRoute from './private-route';
import {
  AppRoute,
  AuthorizationStatus,
  ReducerName,
} from '../../utils/constant';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const RouteText = {
  Auth: 'Auth route',
  NoAuth: 'No auth route',
};
const route = '/private';

describe('Component: PrivateRoute', () => {
  beforeEach(() => {
    history.push(route);
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.Unknown,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Intro}
              element={<h1>{RouteText.NoAuth}</h1>}
            />
            <Route
              path={route}
              element={
                <PrivateRoute>
                  <h1>{RouteText.Auth}</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.NoAuth)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.Auth)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.Auth,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Intro}
              element={<h1>{RouteText.NoAuth}</h1>}
            />
            <Route
              path={route}
              element={
                <PrivateRoute>
                  <h1>{RouteText.Auth}</h1>
                </PrivateRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.Auth)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.NoAuth)).not.toBeInTheDocument();
  });
});
