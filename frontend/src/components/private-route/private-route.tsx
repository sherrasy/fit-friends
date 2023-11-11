import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsAuthorized, getUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';
import { AppRoute } from '../../utils/constant';

type PrivateRouteProps = {
  children:JSX.Element;
  restrictedFor: UserRole;
  redirectTo: string;
}
function PrivateRoute({children, restrictedFor, redirectTo}:PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const role = useAppSelector(getUserRole);

  if(!isAuthorized || !role){
    return <Navigate to={AppRoute.Intro}/>;
  }

  return (
    isAuthorized && role !== restrictedFor ? children : <Navigate to={redirectTo}/>
  );
}

export default PrivateRoute;
