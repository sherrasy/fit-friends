import Header from '../../components/header/header';
import UserCard from '../../components/user-card/user-card';
import WorkoutListCard from '../../components/workout-card/workout-list-card';

function UserInfoPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">
                    Карточка пользователя роль тренер
                  </h1>
                  <div className="user-card-coach__wrapper">
                    <UserCard />
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">
                          Тренировки
                        </h2>
                        <div className="user-card-coach__training-bts">
                          <button
                            className="btn-icon user-card-coach__training-btn"
                            type="button"
                            aria-label="back"
                          >
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-left"></use>
                            </svg>
                          </button>
                          <button
                            className="btn-icon user-card-coach__training-btn"
                            type="button"
                            aria-label="next"
                          >
                            <svg width="14" height="10" aria-hidden="true">
                              <use xlinkHref="#arrow-right"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <ul className="user-card-coach__training-list">
                        <li className="user-card-coach__training-item">
                          <WorkoutListCard />
                        </li>
                      </ul>
                      <form className="user-card-coach__training-form">
                        <button
                          className="btn user-card-coach__btn-training"
                          type="button"
                        >
                          Хочу персональную тренировку
                        </button>
                        <div className="user-card-coach__training-check">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input
                                type="checkbox"
                                value="user-agreement-1"
                                name="user-agreement"
                                checked
                              />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">
                                Получать уведомление на почту о новой тренировке
                              </span>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default UserInfoPage;
