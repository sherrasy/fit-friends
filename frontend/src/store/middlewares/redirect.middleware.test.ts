import {configureMockStore} from '@jedmao/redux-mock-store';
import {AnyAction} from 'redux';
import {redirectToRoute} from '../action';
import { redirect } from './redirect.middleware';
import { AppRoute } from '../../utils/constant';
import { State } from '../../types/state.type';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login),
    ]);
  });

  it('should not to be redirect / because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: AppRoute.Intro});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Intro);
  });
});
