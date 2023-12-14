import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AppRoute,
  AuthorizationStatus,
  ReducerName,
} from '../../utils/constant';
import HistoryRouter from '../history-router/history-router';
import UnauthorizedRoute from './unauthorized-route';
import { UserRole } from '../../types/common/user-role.enum';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const RouteText = {
  AuthUser: 'Auth route user',
  AuthCoach: 'Auth route coach',
  NoAuth: 'No auth route',
};
const route = '/unauthorized';
describe('Component: UnauthorizedRoute', () => {
  beforeEach(() => {
    history.push(route);
  });

  it('should render component for authorizing route, when user not authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.Unknown,
        role: null,
      },
    });
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>{RouteText.AuthUser}</h1>}
            />
            <Route
              path={AppRoute.CoachAccount}
              element={<h1>{RouteText.AuthCoach}</h1>}
            />
            <Route
              path={route}
              element={
                <UnauthorizedRoute>
                  <h1>{RouteText.NoAuth}</h1>
                </UnauthorizedRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.NoAuth)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.AuthUser)).not.toBeInTheDocument();
    expect(screen.queryByText(RouteText.AuthCoach)).not.toBeInTheDocument();
  });

  it('should render component for main route, when user is sportsman and  authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.Auth,
        role: UserRole.Sportsman,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>{RouteText.AuthUser}</h1>}
            />
            <Route
              path={AppRoute.CoachAccount}
              element={<h1>{RouteText.AuthCoach}</h1>}
            />
            <Route
              path={route}
              element={
                <UnauthorizedRoute>
                  <h1>{RouteText.NoAuth}</h1>
                </UnauthorizedRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.AuthUser)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.NoAuth)).not.toBeInTheDocument();
    expect(screen.queryByText(RouteText.AuthCoach)).not.toBeInTheDocument();
  });
  it('should render component for coach account route, when user is coach and  authorized', () => {
    const store = mockStore({
      [ReducerName.User]: {
        authStatus: AuthorizationStatus.Auth,
        role: UserRole.Coach,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>{RouteText.AuthUser}</h1>}
            />
            <Route
              path={AppRoute.CoachAccount}
              element={<h1>{RouteText.AuthCoach}</h1>}
            />
            <Route
              path={route}
              element={
                <UnauthorizedRoute>
                  <h1>{RouteText.NoAuth}</h1>
                </UnauthorizedRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.AuthCoach)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.NoAuth)).not.toBeInTheDocument();
    expect(screen.queryByText(RouteText.AuthUser)).not.toBeInTheDocument();
  });
});
