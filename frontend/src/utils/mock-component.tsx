import HistoryRouter from '@components/history-router/history-router';
import { State } from '@frontend-types/state.type';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '@services/api';
import MockAdapter from 'axios-mock-adapter';
import { MemoryHistory, createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import { AppThunkDispatch } from './mocks';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
        {component}
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
