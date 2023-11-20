import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constant';
import { WorkoutState } from '../../types/state.type';
import { fetchUserSpecialWorkouts, fetchWorkouts } from './api-actions';

const initialState:WorkoutState = {
  workouts:null,
  specialUserWorkouts:null,
  isWorkoutsLoading:false,
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

