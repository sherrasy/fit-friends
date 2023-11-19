import WorkoutsListFilters from '../../components/filters/workouts-list-filters';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';

function WorkoutsListPage(): JSX.Element {
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
                  <li className="training-catalog__item">
                    <WorkoutListCard/>
                  </li>
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
