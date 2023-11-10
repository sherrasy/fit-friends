import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constant';
import { UserRole } from '../../types/user-role.enum';
import { getIsAuthorized, getUserData } from '../../store/user-data/selectors';
import { useAppSelector } from '../../hooks';


type NotAuthRouteProps = {
  userRole?: UserRole;
  children: JSX.Element;
}

const UnauthorizedRoute = ({ children, userRole}: NotAuthRouteProps): JSX.Element => {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const userData = useAppSelector(getUserData);

  if (isAuthorized && userData?.role === UserRole.Coach)
  {
    return <Navigate to={AppRoute.CoachAccount} />;
  }
  if (isAuthorized && userData?.role === UserRole.Sportsman)
  {
    return <Navigate to={AppRoute.Main} />;
  }
  return children;
};

export default UnauthorizedRoute;

