import { useEffect, useState } from 'react';
import BackButton from '@components/back-button/back-button';
import Header from '@components/header/header';
import Loader from '@components/loader/loader';
import ShowMoreButton from '@components/show-more-button/show-more-button';
import WorkoutOrdersCard from '@components/workout-card/workout-orders-card';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  getCoachOrders,
  getOrdersLoadingStatus,
  getOrdersPages,
} from '@store/account-data/selectors';
import { Query } from '@frontend-types/query.type';
import { CardsLimit, DefaultParam, SortingFieldName, sortDirections } from '@utils/constant';
import { fetchCoachOrders } from '@store/account-data/api-actions';

function CoachOrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getCoachOrders);
  const isLoading = useAppSelector(getOrdersLoadingStatus);
  const pagesAmount = useAppSelector(getOrdersPages);
  const [query, setQuery] = useState<Query>({
    limit: CardsLimit.CoachOrders,
    sortDirection: sortDirections[1],
  });
  const [currentSortDirection, setCurrentSortDirection] = useState({
    priceOrdered: sortDirections[0],
    amountOrdered: sortDirections[1],
  });
  const [currentPage, setCurrentPage] = useState(DefaultParam.Step);
  const isLastPage = currentPage === pagesAmount;
  const isMoreVisible =
    !isLastPage &&
    pagesAmount > DefaultParam.Amount &&
    orders?.length === CardsLimit.CoachOrders;
  const isReturnVisible =
    isLastPage && !!(orders && orders.length < CardsLimit.CoachOrders);

  const handleShowClick = () => {
    if (currentPage !== pagesAmount) {
      setCurrentPage((prev) => prev + DefaultParam.Step);
    }
  };

  const handleReturnClick = () => {
    setCurrentPage(DefaultParam.Step);
  };

  const handleSortChange = (sortBy: string, sortDirection:string) => {
    setQuery({ ...query, sortBy, sortDirection });
  };

  const handleSortingByPrice = ()=>{
    const sortDirection = currentSortDirection.priceOrdered === sortDirections[0] ? sortDirections[1] : sortDirections[0];
    setCurrentSortDirection({...currentSortDirection, priceOrdered:sortDirection});
    handleSortChange(SortingFieldName.PriceOrdered, sortDirection);
  };

  const handleSortingByAmount = ()=>{
    const sortDirection = currentSortDirection.amountOrdered === sortDirections[0] ? sortDirections[1] : sortDirections[0];
    setCurrentSortDirection({...currentSortDirection, amountOrdered:sortDirection});
    handleSortChange(SortingFieldName.AmountOrdered, sortDirection);
  };

  useEffect(() => {
    dispatch(
      fetchCoachOrders({
        ...query,
        page: currentPage,
      })
    );
  }, [dispatch, query, currentPage]);

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
                    <button className="btn-filter-sort" type="button" onClick={handleSortingByPrice} autoFocus={query.sortBy === SortingFieldName.PriceOrdered}>
                      <span>Сумме</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref={`#icon-sort-${currentSortDirection.priceOrdered === sortDirections[0] ? 'up' : 'down'}`}></use>
                      </svg>

                    </button>
                    <button className="btn-filter-sort" type="button" onClick={handleSortingByAmount} autoFocus={query.sortBy === SortingFieldName.AmountOrdered}>
                      <span>Количеству</span>
                      <svg width="16" height="10" aria-hidden="true">
                        <use xlinkHref={`#icon-sort-${currentSortDirection.amountOrdered === sortDirections[0] ? 'up' : 'down'}`}></use>
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
              <ShowMoreButton
                onShown={handleShowClick}
                onReturn={handleReturnClick}
                isShowMoreVisible={isMoreVisible}
                isReturnVisible={isReturnVisible}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default CoachOrdersPage;
