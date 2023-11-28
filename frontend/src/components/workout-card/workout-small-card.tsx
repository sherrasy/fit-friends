import { useNavigate } from 'react-router-dom';
import { Workout } from '../../types/workout/workout.interface';
import { AppRoute } from '../../utils/constant';
import { useAppDispatch } from '../../hooks';
import { fetchReviews, fetchWorkout } from '../../store/workout-data/api-actions';

type WorkoutSmallCardProps = {
  workout: Workout;
};

function WorkoutSmallCard({ workout }: WorkoutSmallCardProps): JSX.Element {
  const { id, name} = workout;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = ()=>{
    dispatch(fetchWorkout(id));
    dispatch(fetchReviews(id));
    navigate(`${AppRoute.WorkoutInfo}/${id}`);

  };
  return (
    <div className="thumbnail-preview">
      <div className="thumbnail-preview__image">
        <picture>
          <source type="image/webp" srcSet="
          img/content/thumbnails/preview-03.webp,
          img/content/thumbnails/preview-03@2x.webp 2x
        "
          />
          <img src="img/content/thumbnails/preview-03.jpg"
            srcSet="img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-preview__inner">
        <h3 className="thumbnail-preview__title">{name}</h3>
        <div className="thumbnail-preview__button-wrapper">
          <button className="btn btn--small thumbnail-preview__button" onClick={handleRouteChange}>Подробнее</button>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSmallCard;
