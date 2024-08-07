import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks';
import { fetchUser } from '@store/user-data/api-actions';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { User } from '@frontend-types/user/user.interface';
import {
  AppRoute,
  LocationToName,
  ReadyToTrainText,
  RequestWorkoutText,
  WorkoutTypeToName,
} from '@utils/constant';
import FriendRequestStatus from './friend-request-status';

type FriendCardProps = {
  friend: User;
  currentUser: User;
};

function FriendCard({ friend, currentUser }: FriendCardProps): JSX.Element {
  const {
    id,
    name,
    avatarPath,
    location,
    role,
    workoutType,
    coachInfo,
    sportsmanInfo,
  } = friend;
  const {
    role: currentUserRole,
    sportsmanInfo: currentSportsman,
    coachInfo: currentCoach,
  } = currentUser;
  const isUser = role === UserRole.Sportsman;
  const readyStatus = isUser ? sportsmanInfo?.isReady : coachInfo?.isPersonal;
  const isReadyTexts = isUser ? ReadyToTrainText.User : ReadyToTrainText.Coach;
  const currentUserReady =
    currentUserRole === UserRole.Sportsman
      ? currentSportsman?.isReady
      : currentCoach?.isPersonal;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = () => {
    dispatch(fetchUser(id));
    navigate(`${AppRoute.UserInfo}/${id}`);
  };
  return (
    <div className="thumbnail-friend" data-testid="friend-card">
      <div
        className={`thumbnail-friend__info thumbnail-friend__info--theme-${
          isUser ? 'light' : 'dark'
        }` }
        onClick={handleRouteChange}
      >
        <div className="thumbnail-friend__image-status">
          <div className="thumbnail-friend__image">
            <picture>
              <img src={avatarPath } width="78" height="78" alt="" />
            </picture>
          </div>
        </div>
        <div className="thumbnail-friend__header">
          <h2 className="thumbnail-friend__name">{name}</h2>
          <div className="thumbnail-friend__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-friend__location-address">
              {LocationToName[location]}
            </address>
          </div>
        </div>
        <ul className="thumbnail-friend__training-types-list">
          {workoutType.map((item) => (
            <li key={item}>
              <div className="hashtag thumbnail-friend__hashtag">
                <span>#{WorkoutTypeToName[item]}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="thumbnail-friend__activity-bar">
          <div
            className={`thumbnail-friend__ready-status thumbnail-friend__ready-status--is-${
              readyStatus ? 'ready' : 'not-ready'
            }`}
          >
            <span>{readyStatus ? isReadyTexts[0] : isReadyTexts[1]}</span>
          </div>
          {readyStatus && (
            <button className="thumbnail-friend__invite-button" type="button">
              <svg width="43" height="46" aria-hidden="true" focusable="false">
                <use xlinkHref="#icon-invite"></use>
              </svg>
              <span className="visually-hidden">
                Пригласить друга{' '}
                {isUser ? RequestWorkoutText.User : RequestWorkoutText.Coach}
              </span>
            </button>
          )}
        </div>
      </div>
      {currentUserReady && <FriendRequestStatus initiatorRole={role} recieverRole={currentUserRole}/> }
    </div>
  );
}

export default FriendCard;
