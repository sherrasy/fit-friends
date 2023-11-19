import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../utils/constant';
import { fetchUserList } from '../../store/user-data/api-actions';
import { getReadyUsers } from '../../store/user-data/selectors';
import UserCardSmall from '../user-card/user-card-small';

function LookForCompany(): JSX.Element {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(getReadyUsers);
  const navigate = useNavigate();
  const handleRouteChange = () => {
    dispatch(fetchUserList());
    navigate(AppRoute.UserList);
  };
  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper">
          <div className="look-for-company__title-wrapper">
            <h2 className="look-for-company__title">
              Ищут компанию для тренировки
            </h2>
            <button
              onClick={handleRouteChange}
              className="btn-flat btn-flat--light look-for-company__button"
              type="button"
            >
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="look-for-company__controls">
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="previous"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button
                className="btn-icon btn-icon--outlined look-for-company__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="look-for-company__list">
            {userList?.map((item) => (
              <li className="look-for-company__item" key={item.id}>
                <UserCardSmall user={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;
