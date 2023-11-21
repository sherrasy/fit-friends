import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constant';
import { WorkoutState } from '../../types/state.type';
import { fetchCoachWorkouts, fetchReviews, fetchUserSpecialWorkouts, fetchWorkout, fetchWorkouts } from './api-actions';

const initialState:WorkoutState = {
  workouts:null,
  workout:null,
  reviews:null,
  specialUserWorkouts:null,
  isWorkoutsLoading:false,
  isWorkoutLoading:false,
  isReviewsLoading:false,
};


export const workoutData = createSlice({
  name: ReducerName.Workout,
  initialState,
  reducers:{ },
  extraReducers(builder){
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
      });
  }
});

