import { useNavigate } from 'react-router-dom';
import WorkoutListCard from '../workout-card/workout-list-card';
import { AppRoute } from '../../utils/constant';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWorkouts } from '../../store/workout-data/api-actions';
import { getPopularWorkouts } from '../../store/workout-data/selectors';
import AdvertisementThumbnail from '../advertisement-thumbnail/advertisement-thumbnail';

function PopularTrainings(): JSX.Element {
  const dispatch = useAppDispatch();
  const workouts = useAppSelector(getPopularWorkouts);
  const navigate = useNavigate();
  const handleRouteChange = () => {
    dispatch(fetchWorkouts());
    navigate(AppRoute.WorkoutsList);
  };
  return (
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button
              onClick={handleRouteChange}
              className="btn-flat popular-trainings__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon popular-trainings__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            {workouts ? (
              workouts.map((item) => (
                <li className="popular-trainings__item" key={item.id}>
                  <WorkoutListCard workout={item} />
                </li>
              ))
            ) : (
              <li className="popular-trainings__item">
                <AdvertisementThumbnail />
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
