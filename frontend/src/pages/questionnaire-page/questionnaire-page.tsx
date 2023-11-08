import QuestionnaireCoach from '../../components/questionnaire/questionnaire-coach';
import QuestionnaireUser from '../../components/questionnaire/questionnaire-user';

function QuestionnairePage(): JSX.Element {
  const userRole = 'sportsman';
  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        {userRole === 'sportsman' ? <QuestionnaireUser/> : <QuestionnaireCoach/>}
      </main>
    </div>
  );
}
export default QuestionnairePage;
