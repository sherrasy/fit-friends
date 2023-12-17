import { Link } from 'react-router-dom';
import AdvertisementThumbnail from '../../components/advertisement-thumbnail/advertisement-thumbnail';
import Header from '../../components/header/header';
import UserInfo from '../../components/user-info/user-info';
import { useAppSelector } from '../../hooks';
import { getCurrentUserData } from '../../store/user-data/selectors';
import { AppRoute } from '../../utils/constant';

function UserAccountPage(): JSX.Element {
  const userInfo = useAppSelector(getCurrentUserData);
  const caloriesPerDay = userInfo?.sportsmanInfo?.caloriesPerDay;
  const caloriesPerWeek = caloriesPerDay && caloriesPerDay * 7;
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo/>
              <div className="inner-page__content">
                <div className="personal-account-user">
                  <div className="personal-account-user__schedule">
                    <form action="#" method="get">
                      <div className="personal-account-user__form">
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">
                              План на день, ккал
                            </span>
                            <input
                              type="text"
                              name="schedule-for-the-day"
                              defaultValue={caloriesPerDay}
                              disabled
                            />
                          </label>
                        </div>
                        <div className="personal-account-user__input">
                          <label>
                            <span className="personal-account-user__label">
                              План на неделю, ккал
                            </span>
                            <input
                              type="text"
                              name="schedule-for-the-week"
                              defaultValue={caloriesPerWeek}
                              disabled
                            />
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="personal-account-user__additional-info" data-testid="user-additional-info">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.Friends}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.Purchases}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-shopping-cart"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span>
                    </Link>
                    <AdvertisementThumbnail/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default UserAccountPage;
