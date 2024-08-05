import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { getIsAuthorized } from '@store/user-data/selectors';
import { AppRoute } from '@utils/constant';

type PrivateRouteProps = {
  children:JSX.Element;
}
function PrivateRoute({children }:PrivateRouteProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
    isAuthorized ? children : <Navigate to={AppRoute.Intro}/>
  );
}

export default PrivateRoute;
