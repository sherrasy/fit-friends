import { WorkoutState } from '../../types/state.type';
import { ActionName, DefaultParam, ReducerName } from '../../utils/constant';
import {
  createWorkout,
  fetchCoachWorkouts,
  fetchExtraWorkouts,
  fetchReviews,
  fetchUserSpecialWorkouts,
  fetchWorkout,
  fetchWorkouts,
  updateWorkout,
} from './api-actions';
import { workoutData } from './workout-data';
import { fakeReviews, fakeWorkout, fakeWorkouts, fakeExtraWorkouts } from './test-mocks';


describe(`Reducer: ${ReducerName.Workout}`, () => {
  let state: WorkoutState;
  beforeEach(() => {
    state = {
      workouts: null,
      specialOfferWorkouts: null,
      popularWorkouts: null,
      workout: null,
      reviews: null,
      totalAmount: DefaultParam.Amount,
      maxPrice: DefaultParam.Amount,
      specialUserWorkouts: null,
      fullWorkouts: null,
      isWorkoutsLoading: DefaultParam.Status,
      isWorkoutLoading: DefaultParam.Status,
      isWorkoutPosting: DefaultParam.Status,
      isReviewsLoading: DefaultParam.Status,
    };
  });
  it('without additional parameters should return initial state', () => {
    expect(workoutData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      state
    );
  });

  describe(`Api action: ${ActionName.FetchWorkouts}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        workoutData.reducer(state, { type: fetchWorkouts.pending.type })
      ).toEqual({ ...state, isWorkoutsLoading: true });
    });
    it('should update loading status to "false" and workouts to loaded workouts if is fullfilled', () => {
      expect(
        workoutData.reducer(state, {
          type: fetchWorkouts.fulfilled.type,
          payload: fakeWorkouts,
        })
      ).toEqual({ ...state, workouts: fakeWorkouts });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(
        workoutData.reducer(state, { type: fetchWorkouts.rejected.type })
      ).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchExtraWorkouts}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(
        workoutData.reducer(state, { type: fetchExtraWorkouts.pending.type })
      ).toEqual({ ...state, isWorkoutsLoading: true });
    });
    it('should update loading status to "false" and add extra workouts data if is fullfilled', () => {
      expect(
        workoutData.reducer(state, {
          type: fetchExtraWorkouts.fulfilled.type,
          payload: fakeExtraWorkouts,
        })
      ).toEqual({
        ...state,
        specialOfferWorkouts: fakeExtraWorkouts.specialWorkouts,
        totalAmount: fakeExtraWorkouts.totalWorkouts,
        popularWorkouts: fakeExtraWorkouts.popularWorkouts,
        maxPrice: fakeExtraWorkouts.maxPrice,
        fullWorkouts: fakeExtraWorkouts.fullWorkouts,
      });
    });
  });

  describe(`Api action: ${ActionName.FetchCoachWorkouts}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(workoutData.reducer(state, { type: fetchCoachWorkouts.pending.type })).toEqual({ ...state, isWorkoutsLoading: true });
    });
    it('should update loading status to "false" and workouts to loaded workouts if is fullfilled', () => {
      expect(workoutData.reducer(state, { type: fetchCoachWorkouts.fulfilled.type, payload: fakeWorkouts })).toEqual({ ...state, workouts: fakeWorkouts });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(workoutData.reducer(state, { type: fetchCoachWorkouts.rejected.type })).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchWorkout}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(workoutData.reducer(state, { type: fetchWorkout.pending.type })).toEqual({ ...state, isWorkoutLoading: true });
    });
    it('should update loading status to "false" and workout to loaded workout if is fullfilled', () => {
      expect(workoutData.reducer(state, { type: fetchWorkout.fulfilled.type, payload: fakeWorkout })).toEqual({ ...state, workout: fakeWorkout });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(workoutData.reducer(state, { type: fetchWorkout.rejected.type })).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchReviews}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(workoutData.reducer(state, { type: fetchReviews.pending.type })).toEqual({ ...state, isReviewsLoading: true });
    });
    it('should update loading status to "false" and reviews to loaded reviews if is fullfilled', () => {
      expect(workoutData.reducer(state, { type: fetchReviews.fulfilled.type, payload: fakeReviews })).toEqual({ ...state, reviews: fakeReviews });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(workoutData.reducer(state, { type: fetchReviews.rejected.type })).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.FetchUserSpecialWorkouts}`, () => {
    it('should update loading status to "true" if is pending', () => {
      expect(workoutData.reducer(state, { type: fetchUserSpecialWorkouts.pending.type })).toEqual({ ...state, isWorkoutsLoading: true });
    });
    it('should update loading status to "false" and specialUserWorkouts to loaded workouts if is fullfilled', () => {
      expect(workoutData.reducer(state, { type: fetchUserSpecialWorkouts.fulfilled.type, payload: fakeWorkouts })).toEqual({ ...state, specialUserWorkouts: fakeWorkouts });
    });
    it('should update loading status to "false" if an error occured', () => {
      expect(workoutData.reducer(state, { type: fetchUserSpecialWorkouts.rejected.type })).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.CreateWorkout}`, () => {
    const updatedWorkouts = [fakeWorkout];
    it('should update posting status if is pending', () => {
      expect(workoutData.reducer(state, { type: createWorkout.pending.type })).toEqual({ ...state, isWorkoutPosting: true });
    });
    it('should update workouts if workout is posted', () => {
      expect(workoutData.reducer(state, { type: createWorkout.fulfilled.type, payload:fakeWorkout })).toEqual({ ...state, workouts: updatedWorkouts });
    });
    it('should not update workouts if an error occured', () => {
      expect(workoutData.reducer(state, { type: createWorkout.rejected.type })).toEqual(state);
    });
  });

  describe(`Api action: ${ActionName.UpdateWorkout}`, () => {
    it('should update posting status if is pending', () => {
      expect(workoutData.reducer(state, { type: updateWorkout.pending.type })).toEqual({ ...state, isWorkoutPosting: true });
    });
    it('should update workout if workout is posted', () => {
      expect(workoutData.reducer(state, { type: updateWorkout.fulfilled.type })).toEqual(state);
    });
    it('should not update workouts if an error occured', () => {
      expect(workoutData.reducer(state, { type: updateWorkout.rejected.type })).toEqual(state);
    });
  });
});
