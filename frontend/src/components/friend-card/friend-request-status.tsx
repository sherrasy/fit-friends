import { UserRole } from '@frontend-types/common/user-role.enum';
import { RequestWorkoutText } from '@utils/constant';

type FriendRequestStatusProps = {
  initiatorRole: UserRole;
  recieverRole: UserRole;
};


function FriendRequestStatus({initiatorRole, recieverRole}:FriendRequestStatusProps): JSX.Element {
  const isIncoming = false;
  const status = 'pending';
  const requestText = recieverRole === UserRole.Sportsman && initiatorRole === UserRole.Sportsman ? RequestWorkoutText.User : RequestWorkoutText.Coach;
  const statusText = !isIncoming && status === 'pending' ? 'отправлен' : '';
  return (
    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user" >
      <p className="thumbnail-friend__request-text" data-testid="request-status">
        Запрос {`${requestText} ${statusText}`}
      </p>
      {isIncoming && (
        <div className="thumbnail-friend__button-wrapper">
          <button
            className="btn btn--medium btn--dark-bg thumbnail-friend__button"
            type="button"
          >
            Принять
          </button>
          <button
            className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
            type="button"
          >
            Отклонить
          </button>
        </div>
      )}
    </div>
  );
}

export default FriendRequestStatus;
