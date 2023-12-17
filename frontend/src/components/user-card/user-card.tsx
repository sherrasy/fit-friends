import { useAppDispatch, useAppSelector } from '../../hooks';
import { addFriend, removeFriend } from '../../store/account-data/api-actions';
import { getFriendChanging, getUserFriendStatus } from '../../store/account-data/selectors';
import { getUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/common/user-role.enum';
import { User } from '../../types/user/user.interface';
import {
  LocationToName,
  ReadyToTrainText,
  WorkoutTypeToName,
} from '../../utils/constant';

type UserCardProps = {
  user: User;
};
function UserCard({ user }: UserCardProps): JSX.Element {
  const {
    id,
    name,
    location,
    description,
    workoutType,
    role,
    sportsmanInfo,
    coachInfo,
  } = user;
  const dispatch = useAppDispatch();
  const isBefriended = useAppSelector(getUserFriendStatus(id));
  const currentRole = useAppSelector(getUserRole);
  const isUpdating = useAppSelector(getFriendChanging);
  const isCurrentCoach = currentRole === UserRole.Coach;
  const isCoach = role === UserRole.Coach;
  const isReady = isCoach ? coachInfo?.isPersonal : sportsmanInfo?.isReady;
  const isReadyTexts = isCoach ? ReadyToTrainText.Coach : ReadyToTrainText.User;
  const defaultPhotosByRole = {
    sportsman: [
      '/img/content/user-card-photo1.jpg',
      '/img/content/user-card-photo2.jpg',
    ],
    coach: [
      '/img/content/user-coach-photo1.jpg',
      '/img/content/user-coach-photo2.jpg',
    ],
  };
  const handleFriendAdd = ()=>{ dispatch(addFriend(id));};

  const handleFriendRemove = ()=>{ dispatch(removeFriend(id));};

  return (
    <div className="user-card-coach__card" data-testid="user-card">
      <div className="user-card-coach__content">
        <div className="user-card-coach__head">
          <h2 className="user-card-coach__title">{name}</h2>
        </div>
        <div className="user-card-coach__label">
          <a href="popup-user-map.html">
            <svg
              className="user-card-coach__icon-location"
              width="12"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>{LocationToName[location]}</span>
          </a>
        </div>
        <div className="user-card-coach__status-container">
          {isCoach && (
            <div className="user-card-coach__status user-card-coach__status--tag">
              <svg
                className="user-card-coach__icon-cup"
                width="12"
                height="13"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-cup"></use>
              </svg>
              <span>Тренер</span>
            </div>
          )}
          <div
            className={`user-card-coach${!isReady ? '-2' : ''}__status user-card-coach${!isReady ? '-2' : ''}__status--check`}
          >
            <span>{isReady ? isReadyTexts[0] : isReadyTexts[1]}</span>
          </div>
        </div>
        <div className="user-card-coach__text">{description}</div>
        {isCoach && (
          <button
            className="btn-flat user-card-coach__sertificate"
            type="button"
          >
            <svg width="12" height="13" aria-hidden="true">
              <use xlinkHref="#icon-teacher"></use>
            </svg>
            <span>Посмотреть сертификаты</span>
          </button>
        )}
        <ul className="user-card-coach__hashtag-list">
          {workoutType.map((item) => (
            <li className="user-card-coach__hashtag-item" key={`${item}-${id}`}>
              <div className="hashtag">
                <span>#{WorkoutTypeToName[item]}</span>
              </div>
            </li>
          ))}
        </ul>
        {!isBefriended && !isCurrentCoach && (
          <button className="btn user-card-coach__btn" type="button" disabled={isUpdating} onClick={handleFriendAdd}>
            Добавить в друзья
          </button>
        )}
        {isBefriended && (
          <button className="btn btn--outlined user-card-coach-2__btn" type="button" disabled={isUpdating} onClick={handleFriendRemove}>
            Удалить из друзей
          </button>
        )}
      </div>
      <div className="user-card-coach__gallary">
        <ul className="user-card-coach__gallary-list">
          <li className="user-card-coach__gallary-item">
            <img
              src={defaultPhotosByRole[role][0]}
              width="334"
              height="573"
              alt="photo1"
            />
          </li>
          <li className="user-card-coach__gallary-item">
            <img
              src={defaultPhotosByRole[role][1]}
              width="334"
              height="573"
              alt="photo2"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;
