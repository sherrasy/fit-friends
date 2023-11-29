import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutOrdersCard from '../../components/workout-card/workout-orders-card';
import { useAppSelector } from '../../hooks';
import {
  getCoachOrders,
  getOrdersLoadingStatus,
} from '../../store/account-data/selectors';

function CoachOrdersPage(): JSX.Element {
  const orders = useAppSelector(getCoachOrders);
  const isLoading = useAppSelector(getOrdersLoadingStatus);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <BackButton />
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    <button className="btn-filter-sort" type="button">
                      <span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-up"></use>
                      </svg>
                    </button>
                    <button className="btn-filter-sort" type="button">
                      <span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref="#icon-sort-down"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {orders?.map((order) => (
                  <li className="my-orders__item" key={order.id}>
                    <WorkoutOrdersCard order={order} />
                  </li>
                ))}
              </ul>
              {/* <ShowMoreButton /> */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default CoachOrdersPage;
