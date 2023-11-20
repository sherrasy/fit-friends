import { Link } from 'react-router-dom';
import { Workout } from '../../types/workout.interface';
import { AppRoute } from '../../utils/constant';

type WorkoutSmallCardProps = {
  workout: Workout;
};

function WorkoutSmallCard({ workout }: WorkoutSmallCardProps): JSX.Element {
  const { name} = workout;
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
          <Link className="btn btn--small thumbnail-preview__button" to={AppRoute.WorkoutInfo}>Подробнее</Link>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSmallCard;
