import { useAppSelector } from '../../hooks';
import { getUserList } from '../../store/user-data/selectors';
import { Review } from '../../types/review.interface';
import BackButton from '../back-button/back-button';
import ReviewCard from '../review-card/review-card';

type ReviewsListProps ={
  reviews: Review[] | null;
}

function ReviewsList({reviews}:ReviewsListProps):JSX.Element{
  const users = useAppSelector(getUserList);
  const fullReviews = reviews?.map((review)=>{
    const userInfo = users?.find((user)=>user.id === review.userId);
    if(!userInfo){
      return review;
    }
    return {...review, name:userInfo.name, avatarPath:userInfo.avatarPath};
  });
  return(
    <aside className="reviews-side-bar">
      <BackButton/>
      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {fullReviews?.map((review)=>(
          <li className="reviews-side-bar__item" key={review.id}>
            <ReviewCard review={review}/>
          </li>))}
      </ul>
      <button className="btn btn--medium reviews-side-bar__button" type="button">Оставить отзыв</button>
    </aside>
  );
}

export default ReviewsList;
