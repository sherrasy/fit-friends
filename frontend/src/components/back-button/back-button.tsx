import { useNavigate } from 'react-router-dom';
import { DefaultParam } from '../../utils/constant';

function BackButton():JSX.Element{
  const navigate = useNavigate();
  const handleBack = ()=> navigate(DefaultParam.StepBack);
  return(
    <button className="btn-flat friends-list__back" type="button" onClick={handleBack}>
      <svg width="14" height="10" aria-hidden="true">
        <use xlinkHref="#arrow-left"></use>
      </svg><span>Назад</span>
    </button>
  );
}

export default BackButton;
