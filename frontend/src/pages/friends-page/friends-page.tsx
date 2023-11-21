import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import FriendCard from '../../components/friend-card/friend-card';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFriends } from '../../store/account-data/api-actions';
import Loader from '../../components/loader/loader';
import {
  getFriends,
  getFriendsLoadingStatus,
} from '../../store/account-data/selectors';
import { CardsLimit, DefaultParam } from '../../utils/constant';

function FriendsPage(): JSX.Element {
  const [shownAmount, setShownAmount] = useState(0);
  const dispatch = useAppDispatch();
  const friends = useAppSelector(getFriends);
  const isLoading = useAppSelector(getFriendsLoadingStatus);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  useEffect(() => {
    let isPageMounted = true;
    isPageMounted &&
      friends &&
      setShownAmount(Math.min(CardsLimit.Default, friends.length));
    return () => {
      isPageMounted = false;
    };
  }, [friends]);

  if (isLoading) {
    return <Loader />;
  }

  const handleShownAmount = () => {
    if(friends){
      setShownAmount((prevAmount) =>
        Math.min(prevAmount + CardsLimit.Default, friends.length)
      );}
  };

  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <BackButton />
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {friends?.slice(DefaultParam.Amount, shownAmount).map((item) => (
                  <li className="friends-list__item" key={item.id}>
                    <FriendCard friend = {item}/>
                  </li>
                ))}
              </ul>
              {friends && friends.length > shownAmount && <ShowMoreButton onShown={handleShownAmount}/>}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default FriendsPage;
