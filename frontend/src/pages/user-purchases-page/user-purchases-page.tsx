import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import WorkoutListCard from '../../components/workout-card/workout-list-card';
import { useAppSelector } from '../../hooks';
import {
  getActiveOrders,
  getOrders,
  getOrdersLoadingStatus,
} from '../../store/account-data/selectors';
import { CardsLimit, DefaultParam } from '../../utils/constant';

function UserPurchasesPage(): JSX.Element {
  const [isActiveShown, setIsActiveShown] = useState(DefaultParam.Status);
  const [shownAmount, setShownAmount] = useState(DefaultParam.Amount);
  const purchases = useAppSelector(getOrders);
  const activePurchases = useAppSelector(getActiveOrders);
  const isLoading = useAppSelector(getOrdersLoadingStatus);
  const currentPurchases = isActiveShown ? activePurchases : purchases;

  useEffect(() => {
    let isPageMounted = true;
    isPageMounted &&
    currentPurchases &&
      setShownAmount(Math.min(CardsLimit.Default, currentPurchases.length));
    return () => {
      isPageMounted = false;
    };
  }, [currentPurchases]);

  if (isLoading) {
    return <Loader />;
  }

  const handleIsActiveShown = ()=> setIsActiveShown((prev)=>!prev);

  const handleShownAmount = () => {
    if(currentPurchases){
      setShownAmount((prevAmount) =>
        Math.min(prevAmount + CardsLimit.Default, currentPurchases.length)
      );
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <BackButton />
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
                        onChange={handleIsActiveShown}
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
                {currentPurchases?.slice(DefaultParam.Amount, shownAmount).map((item) => (
                  <li className="my-purchases__item" key={item.orderId}>
                    <WorkoutListCard workout={item.workout} />
                  </li>
                ))}
              </ul>
              {currentPurchases && currentPurchases.length > shownAmount && <ShowMoreButton onShown={handleShownAmount}/>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default UserPurchasesPage;
