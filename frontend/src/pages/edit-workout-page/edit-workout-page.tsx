import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditWorkoutForm from '../../components/edit-workout-form/edit-workout-form';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentUserData } from '../../store/user-data/selectors';
import {
  fetchReviews,
  fetchWorkout,
} from '../../store/workout-data/api-actions';
import {
  getReviews,
  getReviewsLoadingStatus,
  getWorkout,
  getWorkoutLoadingStatus,
} from '../../store/workout-data/selectors';
import { DefaultParam } from '../../utils/constant';
import ErrorPage from '../error-page/error-page';

function EditWorkoutPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const isReviewsLoading = useAppSelector(getReviewsLoadingStatus);
  const { id } = useParams();
  const workout = useAppSelector(getWorkout);
  const isWorkoutLoading = useAppSelector(getWorkoutLoadingStatus);
  const coach = useAppSelector(getCurrentUserData);
  useEffect(() => {
    if (id) {
      dispatch(fetchWorkout(+id));
      dispatch(fetchReviews(+id));
    }
  }, [dispatch, id]);

  if (!coach || !workout) {
    return <ErrorPage />;
  }
  if (isReviewsLoading || isWorkoutLoading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <ReviewsList
                reviews={reviews}
                isAddReviewActive={DefaultParam.Status}
              />
              <EditWorkoutForm workout={workout} coach={coach} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default EditWorkoutPage;
