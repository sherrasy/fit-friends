import { Route, Routes } from 'react-router-dom';
import Loader from '../loader/loader';
import { AppRoute } from '../../utils/constant';
import LoginPage from '../../pages/login-page/login-page';
import IntroPage from '../../pages/intro-page/intro-page';
import SignUpPage from '../../pages/sign-up-page/sign-up-page';
import AddWorkoutPage from '../../pages/add-workout-page/add-workout-page';
import CoachAccountPage from '../../pages/coach-account-page/coach-account-page';
import CoachFriendsPage from '../../pages/coach-friends-page/coach-friends-page';
import CoachOrdersPage from '../../pages/coach-orders-page/coach-orders-page';
import CoachWorkoutsPage from '../../pages/coach-workouts-page/coach-workouts-page';
import EditWorkoutPage from '../../pages/edit-workout-page/edit-workout-page';
import ErrorPage from '../../pages/error-page/error-page';
import QuestionnairePage from '../../pages/questionnaire-page/questionnaire-page';
import UserAccountPage from '../../pages/user-account-page/user-account-page';
import UserFriendsPage from '../../pages/user-friends-page/user-friends-page';
import UserInfoPage from '../../pages/user-info-page/user-info-page';
import UserPurchasesPage from '../../pages/user-purchases-page/user-purchases-page';
import UsersListPage from '../../pages/users-list-page/users-list-page';
import WorkoutInfoPage from '../../pages/workout-info-page/workout-info-page';
import WorkoutsListPage from '../../pages/workouts-list-page/workouts-list-page';
import { useAppSelector } from '../../hooks';
import { getAuthCheckedStatus } from '../../store/user-data/selectors';
import MainPage from '../../pages/main-page/main-page';

function App(): JSX.Element {
  // const dispatch = useAppDispatch();
  // const authStatus = useAppSelector(getIsAuthorized);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);

  if(!isAuthChecked){
    return <Loader/>;
  }
  return (
    <Routes>
      <Route path={AppRoute.Intro} element={<IntroPage/>} />
      <Route path={AppRoute.Main} element={<MainPage/>} />
      <Route path={AppRoute.Login} element={<LoginPage/>} />
      <Route path={AppRoute.Register} element={<SignUpPage />} />
      <Route path={AppRoute.AddWorkout} element={<AddWorkoutPage />} />
      <Route path={AppRoute.CoachAccount} element={<CoachAccountPage />} />
      <Route path={AppRoute.CoachFriends} element={<CoachFriendsPage />} />
      <Route path={AppRoute.Orders} element={<CoachOrdersPage />} />
      <Route path={AppRoute.CoachWorkouts} element={<CoachWorkoutsPage />} />
      <Route path={AppRoute.EditWorkout} element={<EditWorkoutPage />} />
      <Route path={AppRoute.Questionnaire} element={<QuestionnairePage />} />
      <Route path={AppRoute.UserAccount} element={<UserAccountPage />} />
      <Route path={AppRoute.UserFriends} element={<UserFriendsPage />} />
      <Route path={AppRoute.UserInfo} element={<UserInfoPage />} />
      <Route path={AppRoute.Purchases} element={<UserPurchasesPage />} />
      <Route path={AppRoute.UserList} element={<UsersListPage />} />
      <Route path={AppRoute.WorkoutInfo} element={<WorkoutInfoPage />} />
      <Route path={AppRoute.WorkoutsList} element={<WorkoutsListPage />} />
      <Route path={AppRoute.Error} element={<ErrorPage />} />

    </Routes>);
}

export default App;
