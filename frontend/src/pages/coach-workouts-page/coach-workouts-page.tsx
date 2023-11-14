import CoachWorkoutsFilters from '../../components/filters/coach-workouts-filters';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';

function CoachWorkoutsPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <CoachWorkoutsFilters/>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    <li className="my-trainings__item">
                      <WorkoutListCard/>
                    </li>
                  </ul>
                  <ShowMoreButton/>
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
