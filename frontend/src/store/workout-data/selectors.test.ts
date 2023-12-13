import { CardsLimit, DefaultParam, ReducerName } from '../../utils/constant';
import { makeFakeReviews, makeFakeWorkout, makeFakeWorkouts } from '../../utils/mocks';
import { getAllWorkouts, getMaxPrice, getPages, getPopularWorkouts, getReviews, getReviewsLoadingStatus, getSpecialUserWorkouts, getSpecialWorkouts, getWorkout, getWorkoutLoadingStatus, getWorkoutPostingStatus, getWorkouts, getWorkoutsLoadingStatus } from './selectors';

describe(`${ReducerName.Workout} selectors`, () => {
  const fakeWorkout = makeFakeWorkout();
  const fakeWorkouts = makeFakeWorkouts();
  const fakeReviews = makeFakeReviews();
  const state = {
    [ReducerName.Workout]: {
      workouts: fakeWorkouts,
      specialOfferWorkouts: fakeWorkouts,
      popularWorkouts: fakeWorkouts,
      workout: fakeWorkout,
      reviews: fakeReviews,
      totalAmount: fakeWorkouts.length,
      maxPrice: DefaultParam.Amount,
      specialUserWorkouts: null,
      fullWorkouts: fakeWorkouts,
      isWorkoutsLoading: DefaultParam.Status,
      isWorkoutLoading: DefaultParam.Status,
      isWorkoutPosting: DefaultParam.Status,
      isReviewsLoading: DefaultParam.Status,
    }
  };

  it('should return workouts data loading status', () => {
    const { isWorkoutsLoading } = state[ReducerName.Workout];
    const result = getWorkoutsLoadingStatus(state);
    expect(result).toBe(isWorkoutsLoading);
  });

  it('should return workout data loading status', () => {
    const { isWorkoutLoading } = state[ReducerName.Workout];
    const result = getWorkoutLoadingStatus(state);
    expect(result).toBe(isWorkoutLoading);
  });
  it('should return workout data posting status', () => {
    const { isWorkoutPosting } = state[ReducerName.Workout];
    const result = getWorkoutPostingStatus(state);
    expect(result).toBe(isWorkoutPosting);
  });

  it('should return reviews data loading status', () => {
    const { isReviewsLoading } = state[ReducerName.Workout];
    const result = getReviewsLoadingStatus(state);
    expect(result).toBe(isReviewsLoading);
  });

  it('should return workouts from state', () => {
    const { workouts } = state[ReducerName.Workout];
    const result = getWorkouts(state);
    expect(result).toEqual(workouts);
  });

  it('should return workout from state', () => {
    const { workout } = state[ReducerName.Workout];
    const result = getWorkout(state);
    expect(result).toEqual(workout);
  });

  it('should return reviews from state', () => {
    const { reviews } = state[ReducerName.Workout];
    const result = getReviews(state);
    expect(result).toEqual(reviews);
  });
  it('should return maxPrice from state', () => {
    const { maxPrice } = state[ReducerName.Workout];
    const result = getMaxPrice(state);
    expect(result).toEqual(maxPrice);
  });
  it('should return special user workouts from state', () => {
    const { specialUserWorkouts } = state[ReducerName.Workout];
    const result = getSpecialUserWorkouts(state);
    expect(result).toEqual(specialUserWorkouts);
  });
  it('should return special workouts from state', () => {
    const { specialOfferWorkouts } = state[ReducerName.Workout];
    const result = getSpecialWorkouts(state);
    expect(result).toEqual(specialOfferWorkouts);
  });
  it('should return popular workouts from state', () => {
    const { popularWorkouts } = state[ReducerName.Workout];
    const result = getPopularWorkouts(state);
    expect(result).toEqual(popularWorkouts);
  });
  it('should return all workouts from state', () => {
    const { fullWorkouts } = state[ReducerName.Workout];
    const result = getAllWorkouts(state);
    expect(result).toEqual(fullWorkouts);
  });
  it('should return pages from state workouts', () => {
    const { totalAmount } = state[ReducerName.Workout];
    const pagesAmount = Math.ceil(totalAmount / CardsLimit.Default);
    const result = getPages(state);
    expect(result).toEqual(pagesAmount);
  });

});
