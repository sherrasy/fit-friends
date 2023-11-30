import { useEffect } from 'react';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ReviewsList from '../../components/reviews-list/reviews-list';
import WorkoutInfoCard from '../../components/workout-card/workout-info-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchUser } from '../../store/user-data/api-actions';
import { getUserData, getUserError } from '../../store/user-data/selectors';
import { getReviews, getReviewsLoadingStatus, getWorkout, getWorkoutLoadingStatus } from '../../store/workout-data/selectors';
import ErrorPage from '../error-page/error-page';
import { useParams } from 'react-router-dom';
import { fetchReviews, fetchWorkout } from '../../store/workout-data/api-actions';

function WorkoutInfoPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const workout = useAppSelector(getWorkout);
  const coach = useAppSelector(getUserData);
  const coachError = useAppSelector(getUserError);
  const reviews = useAppSelector(getReviews);
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const isWorkoutLoading = useAppSelector(getWorkoutLoadingStatus);

  useEffect(()=>{
    if (workout) {
      dispatch(fetchUser(workout.coachId));
    }
  }, [dispatch, workout]);

  useEffect(()=>{
    if (id) {
      dispatch(fetchWorkout(+id));
      dispatch(fetchReviews(+id));
    }
  }, [dispatch, id]);

  if(!workout || coachError || !coach){
    return <ErrorPage/>;
  }

  if(isReviewsLoading || isWorkoutLoading){
    return <Loader/>;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsList reviews={reviews}/>
              <WorkoutInfoCard workout={workout} coach={coach}/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default WorkoutInfoPage;
