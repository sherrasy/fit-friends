import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchWorkouts } from '../../store/workout-data/api-actions';
import { getPopularWorkouts } from '../../store/workout-data/selectors';
import { AppRoute, SliderLimit } from '../../utils/constant';
import AdvertisementThumbnail from '../advertisement-thumbnail/advertisement-thumbnail';
import SliderButtons from '../slider-buttons/slider-buttons';
import Slider from '../slider/slider';
import WorkoutListCard from '../workout-card/workout-list-card';

type ButtonGroupProp = {
  next?: () => void;
  previous?: () => void;
};

const ButtonGroup = ({ next, previous }: ButtonGroupProp) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = () => {
    dispatch(fetchWorkouts());
    navigate(AppRoute.WorkoutsList);
  };
  return (
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
      <SliderButtons next={next} previous={previous}/>
    </div>
  );
};

function PopularTrainings(): JSX.Element {
  const workouts = useAppSelector(getPopularWorkouts);
  return (
    <section className="popular-trainings" data-testid="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          {(!workouts || !workouts.length) && <AdvertisementThumbnail/>}
          {workouts && workouts.length && (
            <Slider
              items={SliderLimit.Default}
              currentButtons={<ButtonGroup />}
              isOutsideButtons
            >
              {workouts.map((item) => (
                <WorkoutListCard workout={item} key={item.id}/>
              ))}
            </Slider>
          ) }
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
