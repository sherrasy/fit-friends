import UsersListFilters from '../../components/filters/users-list-filters';
import Header from '../../components/header/header';
import UserCardSmall from '../../components/user-card/user-card-small';
import { useAppSelector } from '../../hooks';
import {
  getUserList,
  getUserListLoadingStatus,
  getUserPages,
} from '../../store/user-data/selectors';
import Loader from '../../components/loader/loader';
import { useState } from 'react';
import { CardsLimit, DefaultParam } from '../../utils/constant';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

function UsersListPage(): JSX.Element {
  const userList = useAppSelector(getUserList);
  const pagesAmount = useAppSelector(getUserPages);
  const userListLoading = useAppSelector(getUserListLoadingStatus);
  const [currentPage, setCurrentPage] = useState(DefaultParam.Step);
  const isLastPage = currentPage === pagesAmount;
  const isMoreVisible =
    !isLastPage &&
    pagesAmount > DefaultParam.Amount &&
    userList?.length === CardsLimit.Default;
  const isReturnVisible =
    isLastPage && !(userList && userList.length < CardsLimit.Default);

  const handleShowClick = () => {
    if (currentPage !== pagesAmount) {
      setCurrentPage((prev) => prev + DefaultParam.Step);
    }
  };

  const handleReturnClick = () => {
    setCurrentPage(DefaultParam.Step);
  };

  if (userListLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <UsersListFilters />
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {userList?.map((item) => (
                      <li className="users-catalog__item" key={item.id}>
                        <UserCardSmall user={item}/>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default UsersListPage;
