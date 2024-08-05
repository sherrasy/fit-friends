import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '@services/api';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { State } from '@frontend-types/state.type';
import {
  ActionName,
  ApiRoute,
  CardsLimit,
  DefaultParam,
  ReducerName,
  SortingFieldName,
} from '@utils/constant';
import {
  createWorkout,
  fetchCoachWorkouts,
  fetchExtraWorkouts,
  fetchReviews,
  fetchWorkout,
  fetchWorkouts,
  updateWorkout
} from '@store/workout-data/api-actions';
import {
  fakeReviews,
  fakeWorkout,
  fakeWorkouts,
  fakeWorkoutsData
} from './test-mocks';
import { redirectToRoute } from '@store/action';

describe(`Async actions ${ReducerName.Workout}`, () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it(`should show workouts data when dispatched ${ActionName.FetchWorkouts}`, async () => {
    const queryString = `?limit=${CardsLimit.Default}&page=${DefaultParam.Step}&sortBy=${SortingFieldName.Date}`;
    mockAPI
      .onGet(`${ApiRoute.WorkoutsShow}${queryString}`)
      .reply(200, fakeWorkouts);
    const store = mockStore();
    await store.dispatch(fetchWorkouts());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchWorkouts.pending.type,
      fetchWorkouts.fulfilled.type,
    ]);
  });
  it(`should show extra workouts data when dispatched ${ActionName.FetchExtraWorkouts}`, async () => {
    mockAPI
      .onGet(`${ApiRoute.WorkoutsShow}/extra`)
      .reply(200, fakeWorkoutsData);
    const store = mockStore();
    await store.dispatch(fetchExtraWorkouts(UserRole.Sportsman));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchExtraWorkouts.pending.type,
      fetchExtraWorkouts.fulfilled.type,
    ]);
  });

  it(`should show coach workouts data when dispatched ${ActionName.FetchCoachWorkouts}`, async () => {
    const queryString = `?limit=${CardsLimit.Default}&page=${DefaultParam.Step}&sortBy=${SortingFieldName.Date}`;
    mockAPI
      .onGet(`${ApiRoute.CoachWorkoutsShow}${queryString}`)
      .reply(200, fakeWorkouts);
    const store = mockStore();
    await store.dispatch(fetchCoachWorkouts());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchCoachWorkouts.pending.type,
      fetchCoachWorkouts.fulfilled.type,
    ]);
  });

  it(`should show workout data when dispatched ${ActionName.FetchWorkout}`, async () => {
    mockAPI
      .onGet(`${ApiRoute.WorkoutsMain}/${fakeWorkout.id}`)
      .reply(200, fakeWorkouts);
    const store = mockStore();
    await store.dispatch(fetchWorkout(fakeWorkout.id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchWorkout.pending.type,
      fetchWorkout.fulfilled.type,
    ]);
  });

  it(`should show reviews when dispatched ${ActionName.FetchReviews}`, async () => {
    mockAPI.onGet(`${ApiRoute.ReviewsShow}/${fakeWorkout.id}`).reply(200, fakeReviews);
    const store = mockStore();
    await store.dispatch(fetchReviews(fakeWorkout.id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchReviews.pending.type,
      fetchReviews.fulfilled.type,
    ]);
  });

  it(`should add workout when dispatched ${ActionName.CreateWorkout}`, async () => {
    mockAPI.onPost(ApiRoute.CreateWorkout).reply(200);
    const store = mockStore();
    await store.dispatch(createWorkout(fakeWorkout));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      createWorkout.pending.type,
      redirectToRoute.type,
      createWorkout.fulfilled.type,
    ]);
  });
  it(`should update workout when dispatched ${ActionName.UpdateWorkout}`, async () => {
    mockAPI.onPatch(`${ApiRoute.WorkoutsMain}/${fakeWorkout.id}`).reply(200, {...fakeWorkout, name:fakeWorkouts[0].name});
    const store = mockStore();
    await store.dispatch(updateWorkout({...fakeWorkout, name:fakeWorkouts[0].name}));
    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      updateWorkout.pending.type,
      fetchWorkout.pending.type,
      updateWorkout.fulfilled.type,
    ]);
  });

});
