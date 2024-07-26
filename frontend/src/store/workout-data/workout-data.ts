import { createSlice } from '@reduxjs/toolkit';
import { WorkoutState } from '@frontend-types/state.type';
import { DefaultParam, ReducerName } from '@utils/constant';
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

const initialState: WorkoutState = {
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

export const workoutData = createSlice({
  name: ReducerName.Workout,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(fetchWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.isWorkoutsLoading = false;
      })
      .addCase(fetchWorkouts.rejected, (state) => {
        state.isWorkoutsLoading = false;
      })
      .addCase(fetchExtraWorkouts.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(fetchExtraWorkouts.fulfilled, (state, action) => {
        state.popularWorkouts = action.payload.popularWorkouts ?? null;
        state.specialOfferWorkouts = action.payload.specialWorkouts ?? null;
        state.totalAmount = action.payload.totalWorkouts;
        state.maxPrice = action.payload.maxPrice;
        state.fullWorkouts = action.payload.fullWorkouts ?? null;
        state.isWorkoutsLoading = DefaultParam.Status;
      })
      .addCase(fetchCoachWorkouts.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(fetchCoachWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.isWorkoutsLoading = DefaultParam.Status;
      })
      .addCase(fetchCoachWorkouts.rejected, (state) => {
        state.isWorkoutsLoading = DefaultParam.Status;
      })
      .addCase(fetchWorkout.pending, (state) => {
        state.isWorkoutLoading = true;
      })
      .addCase(fetchWorkout.fulfilled, (state, action) => {
        state.workout = action.payload;
        state.isWorkoutLoading = DefaultParam.Status;
      })
      .addCase(fetchWorkout.rejected, (state) => {
        state.isWorkoutLoading = DefaultParam.Status;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = DefaultParam.Status;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isReviewsLoading = DefaultParam.Status;
      })
      .addCase(fetchUserSpecialWorkouts.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(fetchUserSpecialWorkouts.fulfilled, (state, action) => {
        state.specialUserWorkouts = action.payload ?? null;
        state.isWorkoutsLoading = DefaultParam.Status;
      })
      .addCase(fetchUserSpecialWorkouts.rejected, (state) => {
        state.isWorkoutsLoading = DefaultParam.Status;
      })
      .addCase(createWorkout.pending, (state) => {
        state.isWorkoutPosting = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts ? state.workouts.push(action.payload) : state.workouts = [action.payload];
        state.isWorkoutPosting = DefaultParam.Status;
      })
      .addCase(createWorkout.rejected, (state) => {
        state.isWorkoutPosting = DefaultParam.Status;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.isWorkoutPosting = true;
      })
      .addCase(updateWorkout.fulfilled, (state) => {
        state.isWorkoutPosting = DefaultParam.Status;
      })
      .addCase(updateWorkout.rejected, (state) => {
        state.isWorkoutPosting = DefaultParam.Status;
      });
  },
});
