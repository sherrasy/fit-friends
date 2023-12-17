import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchNotifications,
  removeNotification,
} from '../../store/account-data/api-actions';
import {
  getNotificationDeleting,
  getNotifications,
  getNotificationsError,
} from '../../store/account-data/selectors';
import { getUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/common/user-role.enum';
import { AppRoute, HeaderTab } from '../../utils/constant';
import { formatNotificationDate } from '../../utils/helpers';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(getUserRole);
  const notifications = useAppSelector(getNotifications);
  const isDeleting = useAppSelector(getNotificationDeleting);
  const hasError = useAppSelector(getNotificationsError);
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState<string>(HeaderTab.Main);
  const mainPagePath =
    userRole === UserRole.Coach ? AppRoute.CoachAccount : AppRoute.Main;
  const accountPagePath =
    userRole === UserRole.Coach ? AppRoute.CoachAccount : AppRoute.UserAccount;
  const friendsListPath = AppRoute.Friends;

  const handleNotification = (id: number) => {
    dispatch(removeNotification(id));
  };

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

  useEffect(() => {
    if (!hasError) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, isDeleting, hasError]);

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
                data-testid="move-main"
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
                data-testid="move-account"
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
                data-testid="move-friends"
              >
                <svg width="22" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-friends"></use>
                </svg>
              </Link>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <Link
                className="main-nav__link"
                to="/"
                aria-label="Уведомления"
                onClick={(evt) => evt.preventDefault()}
              >
                <svg width="14" height="18" aria-hidden="true">
                  <use xlinkHref="#icon-notification"></use>
                </svg>
              </Link>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  {notifications?.map(({ id, text, createdDate }) => (
                    <li className="main-nav__subitem" key={id}>
                      <div
                        className="notification is-active"
                        onClick={() => handleNotification(id)}
                      >
                        <p className="notification__text">{text}</p>
                        <time
                          className="notification__time"
                          dateTime={createdDate.toString()}
                        >
                          {formatNotificationDate(createdDate)}
                        </time>
                      </div>
                    </li>
                  ))}
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
