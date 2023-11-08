import ReviewCard from '../review-card/review-card';

function ReviewsList():JSX.Element{
  return(
    <aside className="reviews-side-bar">
      <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg><span>Назад</span>
      </button>
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
