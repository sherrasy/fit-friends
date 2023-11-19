import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';

function UserPurchasesPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <BackButton/>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div
                    className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                    data-validate-type="checkbox"
                  >
                    <label>
                      <input
                        type="checkbox"
                        value="user-agreement-1"
                        name="user-agreement"
                      />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true">
                          <use xlinkHref="#arrow-check"></use>
                        </svg>
                      </span>
                      <span className="custom-toggle__label">
                        Только активные
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                <li className="my-purchases__item">
                  <WorkoutListCard />
                </li>
              </ul>
              {/* <ShowMoreButton /> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default UserPurchasesPage;
