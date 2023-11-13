import BackButton from '../back-button/back-button';
import ReviewCard from '../review-card/review-card';

function ReviewsList():JSX.Element{
  return(
    <aside className="reviews-side-bar">
      <BackButton/>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        <li className="reviews-side-bar__item">
          <ReviewCard/>
        </li>
      </ul>
      <button className="btn btn--medium reviews-side-bar__button" type="button">Оставить отзыв</button>
    </aside>
  );
}

export default ReviewsList;
