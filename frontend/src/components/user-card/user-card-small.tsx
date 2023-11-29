import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../../types/common/user-role.enum';
import { User } from '../../types/user/user.interface';
import { AppRoute, LocationToName, WorkoutTypeToName } from '../../utils/constant';

type UserCardSmallProps = {
  user: User;
};
function UserCardSmall({ user }: UserCardSmallProps): JSX.Element {
  const {id, name, role, avatarPath, workoutType, location } = user;
  const page = useLocation();
  const isReadyBlock = page.pathname === AppRoute.Main;
  return (
    <div
      className={`thumbnail-user thumbnail-user--role-${
        role === UserRole.Coach ? 'coach ' : 'user'
      } ${isReadyBlock ? 'thumbnail-user--dark' : ''}`}
    >
      <div className="thumbnail-user__image">
        <picture>
          <img
            src={avatarPath}
            width="82"
            height="82"
            alt=""
          />
        </picture>
      </div>
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="#icon-location"></use>
          </svg>
          <address className="thumbnail-user__location-address">
            {LocationToName[location]}
          </address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {workoutType.map((item) => (
          <li className="thumbnail-user__hashtags-item" key={`${item}-${id}`}>
            <div className="hashtag thumbnail-user__hashtag">
              <span>#{WorkoutTypeToName[item]}</span>
            </div>
          </li>
        ))}
      </ul>
      <Link className="btn btn--medium thumbnail-user__button" to={`${AppRoute.UserInfo}/${id}`}>
        Подробнее
      </Link>
    </div>
  );
}

export default UserCardSmall;
