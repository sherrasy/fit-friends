import Header from '../../components/header/header';
import LookForCompany from '../../components/look-for-company/look-for-company';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import SpecialOffers from '../../components/special-offers/special-offers';
import WorkoutsForUser from '../../components/workouts-for-user/workouts-for-user';

function MainPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header/>
      <main>
        <h1 className="visually-hidden">
        FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
        </h1>
        <WorkoutsForUser/>
        <SpecialOffers/>
        <PopularTrainings/>
        <LookForCompany/>
      </main>
    </div>
  );
}
export default MainPage;
