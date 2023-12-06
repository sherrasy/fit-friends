import { useEffect, useState } from 'react';
import BackButton from '../../components/back-button/back-button';
import FriendCard from '../../components/friend-card/friend-card';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFriends } from '../../store/account-data/api-actions';
import {
  getFriends,
  getFriendsLoadingStatus,
  getFriendsPages,
} from '../../store/account-data/selectors';
import { getCurrentUserData } from '../../store/user-data/selectors';
import { CardsLimit, DefaultParam } from '../../utils/constant';
import ErrorPage from '../error-page/error-page';

function FriendsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(getCurrentUserData);
  const friends = useAppSelector(getFriends);
  const isLoading = useAppSelector(getFriendsLoadingStatus);
  const pagesAmount = useAppSelector(getFriendsPages);
  const [currentPage, setCurrentPage] = useState(DefaultParam.Step);
  const isLastPage = currentPage === pagesAmount;
  const isMoreVisible =
    !isLastPage &&
    pagesAmount > DefaultParam.Step &&
    friends?.length === CardsLimit.Default;
  const isReturnVisible =
    isLastPage && !!(friends && friends.length < CardsLimit.Default);
  const handleShowClick = () => {
    if (currentPage !== pagesAmount) {
      setCurrentPage((prev) => prev + DefaultParam.Step);
    }
  };

  const handleReturnClick = () => {
    setCurrentPage(DefaultParam.Step);
  };

  useEffect(() => {
    dispatch(fetchFriends({page:currentPage}));
  }, [dispatch,currentPage]);

  if (!currentUser) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <Loader />;
  }

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
                {friends?.map((item) => (
                  <li className="friends-list__item" key={item.id}>
                    <FriendCard friend = {item} currentUser={currentUser}/>
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
export default FriendsPage;
