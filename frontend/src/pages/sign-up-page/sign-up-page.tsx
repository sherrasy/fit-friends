import { useAppSelector } from '../../hooks';
import SignUpForm from '../../components/sign-up-form/sign-up-form';
import { getNewUserData } from '../../store/user-data/selectors';
import { UserRole } from '../../types/user-role.enum';
import QuestionnaireUser from '../../components/questionnaire/questionnaire-user';
import QuestionnaireCoach from '../../components/questionnaire/questionnaire-coach';

function SignUpPage(): JSX.Element {
  const newUserData = useAppSelector(getNewUserData);
  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg
            className="background-logo__logo"
            width="750"
            height="284"
            aria-hidden="true"
          >
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg
            className="background-logo__icon"
            width="343"
            height="343"
            aria-hidden="true"
          >
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        {!newUserData && <SignUpForm/>}
        {(newUserData && newUserData.role === UserRole.Sportsman) && <QuestionnaireUser />}
        {(newUserData && newUserData.role === UserRole.Coach) && <QuestionnaireCoach />}
      </main>
    </div>
  );
}
export default SignUpPage;
