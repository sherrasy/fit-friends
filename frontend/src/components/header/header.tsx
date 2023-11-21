import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';
import { AppRoute, HeaderTab } from '../../utils/constant';
import { useLayoutEffect, useState } from 'react';

function Header(): JSX.Element {
  const userRole = useAppSelector(getUserRole);
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string>(HeaderTab.Main);
  const mainPagePath =
    userRole === UserRole.Coach ? AppRoute.CoachAccount : AppRoute.Main;
  const accountPagePath =
    userRole === UserRole.Coach ? AppRoute.CoachAccount : AppRoute.UserAccount;
  const friendsListPath = AppRoute.Friends;
  useLayoutEffect(() => {
    switch (pathname) {
      case mainPagePath: {
        setActiveTab(HeaderTab.Main);
        break;
      }
      case accountPagePath: {
        userRole === UserRole.Sportsman && setActiveTab(HeaderTab.Account);
        break;
      }
      case friendsListPath: {
        setActiveTab(HeaderTab.Friends);
        break;
      }
    }
  }, [accountPagePath, friendsListPath, mainPagePath, pathname, userRole]);
  return (
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link
                className={`main-nav__link ${
                  activeTab === HeaderTab.Main ? 'is-active' : ''
                }`}
                to={mainPagePath}
                aria-label="На главную"
              >
                <svg width="18" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-home"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={`main-nav__link ${
                  activeTab === HeaderTab.Account ? 'is-active' : ''
                }`}
                to={accountPagePath}
                aria-label="Личный кабинет"
              >
                <svg width="16" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-user"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <Link
                className={`main-nav__link ${
                  activeTab === HeaderTab.Friends ? 'is-active' : ''
                }`}
                to={friendsListPath}
                aria-label="Друзья"
              >
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <Link className="main-nav__link" to="/" aria-label="Уведомления" onClick={(evt)=> evt.preventDefault()}>
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  <li className="main-nav__subitem">
                    <a className="notification is-active" href="/">
                      <p className="notification__text">
                        Катерина пригласила вас на&nbsp;тренировку
                      </p>
                      <time
                        className="notification__time"
                        dateTime="2023-12-23 12:35"
                      >
                        23 декабря, 12:35
                      </time>
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <div className="search">
          <form action="#" method="get">
            <label>
              <span className="search__label">Поиск</span>
              <input type="search" name="search" />
              <svg
                className="search__icon"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-search"></use>
              </svg>
            </label>
            <ul className="search__list">
              <li className="search__item">
                <a className="search__link" href="/">
                  Бокс
                </a>
              </li>
              <li className="search__item">
                <a className="search__link is-active" href="/">
                  Бег
                </a>
              </li>
              <li className="search__item">
                <a className="search__link" href="/">
                  Аэробика
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header;
