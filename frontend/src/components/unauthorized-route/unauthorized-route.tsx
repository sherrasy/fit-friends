import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constant';
import { UserRole } from '../../types/common/user-role.enum';
import { getIsAuthorized, getUserRole } from '../../store/user-data/selectors';
import { useAppSelector } from '../../hooks';


type NotAuthRouteProps = {
  userRole?: UserRole;
  children: JSX.Element;
}

const UnauthorizedRoute = ({ children, userRole}: NotAuthRouteProps): JSX.Element => {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const role = useAppSelector(getUserRole);

  if (isAuthorized && role === UserRole.Coach)
  {
    return <Navigate to={AppRoute.CoachAccount} />;
  }
  if (isAuthorized && role === UserRole.Sportsman)
  {
    return <Navigate to={AppRoute.Main} />;
  }
  return children;
};

export default UnauthorizedRoute;

