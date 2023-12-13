import { createSlice } from '@reduxjs/toolkit';
import { WorkoutState } from '../../types/state.type';
import { DefaultParam, ReducerName } from '../../utils/constant';
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
  isWorkoutsLoading: false,
  isWorkoutLoading: false,
  isWorkoutPosting: false,
  isReviewsLoading: false,
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
        state.isWorkoutsLoading = false;
      })
      .addCase(fetchCoachWorkouts.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(fetchCoachWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
        state.isWorkoutsLoading = false;
      })
      .addCase(fetchCoachWorkouts.rejected, (state) => {
        state.isWorkoutsLoading = false;
      })
      .addCase(fetchWorkout.pending, (state) => {
        state.isWorkoutLoading = true;
      })
      .addCase(fetchWorkout.fulfilled, (state, action) => {
        state.workout = action.payload;
        state.isWorkoutLoading = false;
      })
      .addCase(fetchWorkout.rejected, (state) => {
        state.isWorkoutLoading = false;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.isReviewsLoading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.isReviewsLoading = false;
      })
      .addCase(fetchUserSpecialWorkouts.pending, (state) => {
        state.isWorkoutsLoading = true;
      })
      .addCase(fetchUserSpecialWorkouts.fulfilled, (state, action) => {
        state.specialUserWorkouts = action.payload ?? null;
        state.isWorkoutsLoading = false;
      })
      .addCase(fetchUserSpecialWorkouts.rejected, (state) => {
        state.isWorkoutsLoading = false;
      })
      .addCase(createWorkout.pending, (state) => {
        state.isWorkoutPosting = true;
      })
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts ? state.workouts.push(action.payload) : state.workouts = [action.payload];
        state.isWorkoutPosting = false;
      })
      .addCase(createWorkout.rejected, (state) => {
        state.isWorkoutPosting = false;
      })
      .addCase(updateWorkout.pending, (state) => {
        state.isWorkoutPosting = true;
      })
      .addCase(updateWorkout.fulfilled, (state) => {
        state.isWorkoutPosting = false;
      })
      .addCase(updateWorkout.rejected, (state) => {
        state.isWorkoutPosting = false;
      });
  },
});
