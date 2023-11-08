import FriendCard from '../../components/friend-card/friend-card';
import Header from '../../components/header/header';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

function CoachFriendsPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
                <span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                <li className="friends-list__item">
                  <FriendCard/>
                </li>
              </ul>
              <ShowMoreButton/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default CoachFriendsPage;
