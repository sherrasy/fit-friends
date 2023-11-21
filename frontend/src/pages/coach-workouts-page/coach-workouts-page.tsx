import CoachWorkoutsFilters from '../../components/filters/coach-workouts-filters';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';
import { useAppSelector } from '../../hooks';
import {
  getWorkouts,
  getWorkoutsLoadingStatus,
} from '../../store/workout-data/selectors';

function CoachWorkoutsPage(): JSX.Element {
  const workouts = useAppSelector(getWorkouts);
  const workoutsLoading = useAppSelector(getWorkoutsLoadingStatus);
  if (workoutsLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <CoachWorkoutsFilters />
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    {workouts?.map((item) => (
                      <li className="my-trainings__item" key={item.id}>
                        <WorkoutListCard workout={item} />
                      </li>
                    ))}
                  </ul>
                  {/* <ShowMoreButton/> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default CoachWorkoutsPage;
