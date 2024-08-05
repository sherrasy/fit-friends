import { Review } from '@frontend-types/reaction/review.interface';

 type ReviewCardProps = {
  review:Review;
 }
function ReviewCard({review}:ReviewCardProps):JSX.Element{
  const {name, avatarPath, rating,message } = review;
  const defaultUser = {
    name :'Пользователь',
    avatarPath:'/img/content/avatars/users/photo-1.png'
  };
  return(
    <div className="review" data-testid='review-card'>
      <div className="review__user-info">
        <div className="review__user-photo">
          <picture>
            <img src={avatarPath ? avatarPath : defaultUser.avatarPath }
              width="64" height="64"
              alt="Изображение пользователя"
            />
          </picture>
        </div><span className="review__user-name">{name ? name : defaultUser.name}</span>
        <div className="review__rating">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span>{rating}</span>
        </div>
      </div>
      <p className="review__comment">{message}</p>
    </div>
  );
}

export default ReviewCard;
