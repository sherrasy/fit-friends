import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import AddWorkoutPage from '../../pages/add-workout-page/add-workout-page';
import CoachAccountPage from '../../pages/coach-account-page/coach-account-page';
import CoachFriendsPage from '../../pages/coach-friends-page/coach-friends-page';
import CoachOrdersPage from '../../pages/coach-orders-page/coach-orders-page';
import CoachWorkoutsPage from '../../pages/coach-workouts-page/coach-workouts-page';
import EditWorkoutPage from '../../pages/edit-workout-page/edit-workout-page';
import ErrorPage from '../../pages/error-page/error-page';
import IntroPage from '../../pages/intro-page/intro-page';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import QuestionnairePage from '../../pages/questionnaire-page/questionnaire-page';
import SignUpPage from '../../pages/sign-up-page/sign-up-page';
import UserAccountPage from '../../pages/user-account-page/user-account-page';
import UserFriendsPage from '../../pages/user-friends-page/user-friends-page';
import UserInfoPage from '../../pages/user-info-page/user-info-page';
import UserPurchasesPage from '../../pages/user-purchases-page/user-purchases-page';
import UsersListPage from '../../pages/users-list-page/users-list-page';
import WorkoutInfoPage from '../../pages/workout-info-page/workout-info-page';
import WorkoutsListPage from '../../pages/workouts-list-page/workouts-list-page';
import { getAuthCheckedStatus } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';
import { AppRoute } from '../../utils/constant';
import Loader from '../loader/loader';
import PrivateRoute from '../private-route/private-route';
import UnauthorizedRoute from '../unauthorized-route/unauthorized-route';

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if (!isAuthChecked) {
    return <Loader />;
  }
  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage />} />
      <Route
        path={AppRoute.Main}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.CoachAccount}
          >
            <MainPage />
          </PrivateRoute>
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
          <PrivateRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Main}
          >
            <CoachAccountPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CoachFriends}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <CoachFriendsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Orders}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <CoachOrdersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.CoachWorkouts}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <CoachWorkoutsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.EditWorkout}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Sportsman}
            redirectTo={AppRoute.Error}
          >
            <EditWorkoutPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Questionnaire} element={<QuestionnairePage />} />
      <Route
        path={AppRoute.UserAccount}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UserAccountPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserFriends}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UserFriendsPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.UserInfo} element={<UserInfoPage />} />
      <Route
        path={AppRoute.Purchases}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UserPurchasesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.UserList}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.Error}
          >
            <UsersListPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.WorkoutInfo} element={<WorkoutInfoPage />} />
      <Route
        path={AppRoute.WorkoutsList}
        element={
          <PrivateRoute
            restrictedFor={UserRole.Coach}
            redirectTo={AppRoute.CoachAccount}
          >
            <WorkoutsListPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Error} element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
