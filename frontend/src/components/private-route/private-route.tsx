import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user-data/selectors';
import { AppRoute } from '../../utils/constant';

type PrivateRouteProps = {
  children:JSX.Element;
  redirectTo: string;
}
function PrivateRoute({children, redirectTo}:PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  if(!isAuthorized){
    return <Navigate to={AppRoute.Intro}/>;
  }

  return (
    isAuthorized ? children : <Navigate to={redirectTo}/>
  );
}

export default PrivateRoute;
