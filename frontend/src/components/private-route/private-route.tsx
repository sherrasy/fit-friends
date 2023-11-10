import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../utils/constant';
import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user-data/selectors';

type PrivateRouteProps = {
  children:JSX.Element;
}
function PrivateRoute({children}:PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    isAuthorized ? children : <Navigate to={AppRoute.Login}/>
  );
}

export default PrivateRoute;
