import UsersListFilters from '../../components/filters/users-list-filters';
import Header from '../../components/header/header';
import UserCardSmall from '../../components/user-card/user-card-small';
import { useAppSelector } from '../../hooks';
import {
  getUserList,
  getUserListLoadingStatus,
} from '../../store/user-data/selectors';
import Loader from '../../components/loader/loader';

function UsersListPage(): JSX.Element {
  const userList = useAppSelector(getUserList);
  const userListLoading = useAppSelector(getUserListLoadingStatus);

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
                  <div className="show-more users-catalog__show-more">
                    <button
                      className="btn show-more__button show-more__button--more"
                      type="button"
                    >
                      Показать еще
                    </button>
                    <button
                      className="btn show-more__button show-more__button--to-top"
                      type="button"
                    >
                      Вернуться в начало
                    </button>
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
export default UsersListPage;
