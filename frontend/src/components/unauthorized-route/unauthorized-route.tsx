import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { getIsAuthorized, getUserRole } from '@store/user-data/selectors';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { AppRoute } from '@utils/constant';


type NotAuthRouteProps = {
  children: JSX.Element;
}

const UnauthorizedRoute = ({ children}: NotAuthRouteProps): JSX.Element => {
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

