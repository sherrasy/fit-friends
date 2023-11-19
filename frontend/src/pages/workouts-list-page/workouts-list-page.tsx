import WorkoutsListFilters from '../../components/filters/workouts-list-filters';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';
import { useAppSelector } from '../../hooks';
import { getWorkouts, getWorkoutsLoadingStatus } from '../../store/workout-data/selectors';
import ErrorPage from '../error-page/error-page';

function WorkoutsListPage(): JSX.Element {
  const workoutsList = useAppSelector(getWorkouts);
  const workoutsListLoading = useAppSelector(getWorkoutsLoadingStatus);

  if (!workoutsList) {
    return <ErrorPage />;
  }
  if (workoutsListLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <WorkoutsListFilters/>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {workoutsList.map((item)=>(
                    <li className="training-catalog__item" key={item.id}>
                      <WorkoutListCard workout ={item}/>
                    </li>
                  ))}
                </ul>
                {/* <ShowMoreButton/> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default WorkoutsListPage;
