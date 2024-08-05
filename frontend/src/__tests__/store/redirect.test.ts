import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import { AppRoute } from '@utils/constant';
import { redirect } from '@store/middlewares/redirect.middleware';
import { State } from '@frontend-types/state.type';
import { redirectToRoute } from '@store/action';
import browserHistory from '@/browser-history';

vi.mock('@/browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));


const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    browserHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('should not to be redirect / because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Intro});
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Intro);
  });
});
