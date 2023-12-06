import { useAppSelector } from '../../hooks';
import { getSpecialUserWorkouts } from '../../store/workout-data/selectors';
import { SliderLimit } from '../../utils/constant';
import AdvertisementThumbnail from '../advertisement-thumbnail/advertisement-thumbnail';
import SliderButtons from '../slider-buttons/slider-buttons';
import Slider from '../slider/slider';
import WorkoutSmallCard from '../workout-card/workout-small-card';

type ButtonGroupProp = {
  next?: () => void;
  previous?: () => void;
};

const ButtonGroup = ({ next, previous }: ButtonGroupProp) => (
  <div className="special-for-you__title-wrapper">
    <h2 className="special-for-you__title">Специально подобрано для вас</h2>
    <SliderButtons next={next} previous={previous}/>
  </div>
);

function WorkoutsForUser(): JSX.Element {
  const workouts = useAppSelector(getSpecialUserWorkouts);
  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          {(!workouts || !workouts.length) && <AdvertisementThumbnail/>}
          {workouts && workouts.length !== 0 && (
            <Slider
              items={SliderLimit.SpecialForUser}
              currentButtons={<ButtonGroup />}
              isOutsideButtons
            >
              {workouts.map((item) => (
                <WorkoutSmallCard workout={item} key={item.id} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}

export default WorkoutsForUser;
