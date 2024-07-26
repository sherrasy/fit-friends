import { useState } from 'react';
import QuestionnaireCoach from '@components/questionnaire/questionnaire-coach';
import QuestionnaireUser from '@components/questionnaire/questionnaire-user';
import SignUpForm from '@components/sign-up-form/sign-up-form';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getNewUserData } from '@store/user-data/selectors';
import { createNewUser } from '@store/user-data/user-data';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { NewUserGeneral } from '@frontend-types/user/user.interface';

function SignUpPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const newUserData = useAppSelector(getNewUserData);

  const [avatarFile, setAvatarFile] = useState<File>();
  const handleDataSubmit = (data: NewUserGeneral, file: File) => {
    dispatch(createNewUser(data));
    setAvatarFile(file);
  };
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
        {!newUserData && <SignUpForm onSubmit = {handleDataSubmit}/>}
        {(newUserData && newUserData.role === UserRole.Sportsman) && <QuestionnaireUser newUserData={newUserData} avatarFile={avatarFile}/>}
        {(newUserData && newUserData.role === UserRole.Coach) && <QuestionnaireCoach newUserData={newUserData} avatarFile={avatarFile}/>}
      </main>
    </div>
  );
}
export default SignUpPage;
