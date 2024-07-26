import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  AppRoute,
  AuthorizationStatus,
  ReducerName,
} from '@utils/constant';
import HistoryRouter from '@components/history-router/history-router';
import { UserRole } from '@frontend-types/common/user-role.enum';
import PrivateRoleRoute from '@components/private-route/private-role-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const RouteText = {
  IsPermitted: 'Is permitted route',
  Redirect: 'Redirect route',
  IsProhibited: 'Is prohibited route',
};
const route = '/private-role';

describe('Component: PrivateRoleRoute', () => {
  beforeEach(() => {
    history.push(route);
  });

  it('should render intro component, when user not authorized', () => {
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
              path={AppRoute.Intro}
              element={<h1>{RouteText.IsProhibited}</h1>}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>{RouteText.Redirect}</h1>}
            />
            <Route
              path={route}
              element={
                <PrivateRoleRoute
                  restrictedFor={UserRole.Sportsman}
                  redirectTo={AppRoute.Main}
                >
                  <h1>{RouteText.IsPermitted}</h1>
                </PrivateRoleRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.IsProhibited)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.IsPermitted)).not.toBeInTheDocument();
    expect(screen.queryByText(RouteText.Redirect)).not.toBeInTheDocument();
  });

  it('should render component for main route, when user is not coach and authorized', () => {
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
              path={AppRoute.Intro}
              element={<h1>{RouteText.IsProhibited}</h1>}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>{RouteText.Redirect}</h1>}
            />
            <Route
              path={route}
              element={
                <PrivateRoleRoute
                  restrictedFor={UserRole.Sportsman}
                  redirectTo={AppRoute.Main}
                >
                  <h1>{RouteText.IsPermitted}</h1>
                </PrivateRoleRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.Redirect)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.IsPermitted)).not.toBeInTheDocument();
    expect(screen.queryByText(RouteText.IsProhibited)).not.toBeInTheDocument();
  });
  it('should render component for coach route, when user is coach and  authorized', () => {
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
              path={AppRoute.Intro}
              element={<h1>{RouteText.IsProhibited}</h1>}
            />
            <Route
              path={AppRoute.Main}
              element={<h1>{RouteText.Redirect}</h1>}
            />
            <Route
              path={route}
              element={
                <PrivateRoleRoute
                  restrictedFor={UserRole.Sportsman}
                  redirectTo={AppRoute.Main}
                >
                  <h1>{RouteText.IsPermitted}</h1>
                </PrivateRoleRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(RouteText.IsPermitted)).toBeInTheDocument();
    expect(screen.queryByText(RouteText.Redirect)).not.toBeInTheDocument();
    expect(screen.queryByText(RouteText.IsProhibited)).not.toBeInTheDocument();
  });
});
