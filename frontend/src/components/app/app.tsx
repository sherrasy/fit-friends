import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import AddWorkoutPage from '../../pages/add-workout-page/add-workout-page';
import CoachAccountPage from '../../pages/coach-account-page/coach-account-page';
import CoachOrdersPage from '../../pages/coach-orders-page/coach-orders-page';
import CoachWorkoutsPage from '../../pages/coach-workouts-page/coach-workouts-page';
import EditWorkoutPage from '../../pages/edit-workout-page/edit-workout-page';
import ErrorPage from '../../pages/error-page/error-page';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import SignUpPage from '../../pages/sign-up-page/sign-up-page';
import UserAccountPage from '../../pages/user-account-page/user-account-page';
import FriendsPage from '../../pages/friends-page/friends-page';
import UserInfoPage from '../../pages/user-info-page/user-info-page';
import UserPurchasesPage from '../../pages/user-purchases-page/user-purchases-page';
import UsersListPage from '../../pages/users-list-page/users-list-page';
import WorkoutInfoPage from '../../pages/workout-info-page/workout-info-page';
import WorkoutsListPage from '../../pages/workouts-list-page/workouts-list-page';
import { getAuthCheckedStatus, getCurrentUserData, getUserRole } from '../../store/user-data/selectors';
import { UserRole } from '../../types/common/user-role.enum';
import { AppRoute } from '../../utils/constant';
import Loader from '../loader/loader';
import UnauthorizedRoute from '../unauthorized-route/unauthorized-route';
import { useEffect } from 'react';
import { fetchReadyUserList, fetchUserList } from '../../store/user-data/api-actions';
import { fetchCoachWorkouts, fetchExtraWorkouts, fetchUserSpecialWorkouts, fetchWorkouts } from '../../store/workout-data/api-actions';
import { fetchCoachOrders, fetchFriends, fetchNotifications, fetchUserOrders } from '../../store/account-data/api-actions';
import PrivateRoleRoute from '../private-route/private-role-route';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const userRole = useAppSelector(getUserRole);
  const userInfo = useAppSelector(getCurrentUserData);

  useEffect(()=>{
    if(userRole === UserRole.Sportsman && userInfo){
      dispatch(fetchUserList());
      dispatch(fetchReadyUserList());
      dispatch(fetchWorkouts());
      dispatch(fetchExtraWorkouts(userRole));
      dispatch(fetchUserSpecialWorkouts(userInfo));
      dispatch(fetchUserOrders());
      dispatch(fetchNotifications());
    }
    if(userRole === UserRole.Coach && userInfo){
      dispatch(fetchCoachWorkouts());
      dispatch(fetchCoachOrders());
      dispatch(fetchExtraWorkouts(userRole));
      dispatch(fetchFriends());
      dispatch(fetchNotifications());
    }
  },[dispatch, userRole, userInfo]);

  if (!isAuthChecked) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage />} />
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.CoachAccount}
          >
            <MainPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <UnauthorizedRoute>
            <LoginPage />
          </UnauthorizedRoute>
        }
      />
      <Route
        path={AppRoute.Register}
        element={
          <UnauthorizedRoute>
            <SignUpPage />
          </UnauthorizedRoute>
        }
      />
      <Route path={AppRoute.AddWorkout} element={<AddWorkoutPage />} />
      <Route
        path={AppRoute.CoachAccount}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Main}
          >
            <CoachAccountPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={AppRoute.Orders}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <CoachOrdersPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={AppRoute.CoachWorkouts}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <CoachWorkoutsPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={`${AppRoute.EditWorkout}/:id`}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <EditWorkoutPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={AppRoute.UserAccount}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UserAccountPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={AppRoute.Friends}
        element={
          <PrivateRoute
            redirectTo={AppRoute.Error}
          >
            <FriendsPage />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.UserInfo}/:id`} element={<UserInfoPage />} />
      <Route
        path={AppRoute.Purchases}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UserPurchasesPage />
          </PrivateRoleRoute>
        }
      />
      <Route
        path={AppRoute.UserList}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UsersListPage />
          </PrivateRoleRoute>
        }
      />
      <Route path={`${AppRoute.WorkoutInfo}/:id`} element={<WorkoutInfoPage />} />
      <Route
        path={AppRoute.WorkoutsList}
        element={
          <PrivateRoleRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.CoachAccount}
          >
            <WorkoutsListPage />
          </PrivateRoleRoute>
        }
      />
      <Route path={AppRoute.Error} element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
