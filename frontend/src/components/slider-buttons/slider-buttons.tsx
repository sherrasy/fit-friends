import { DefaultParam } from '../../utils/constant';

type SliderButtonsProp = {
  next?: () => void;
  previous?: () => void;
  isDark?:boolean;
};


function SliderButtons({next, previous, isDark = DefaultParam.Status}:SliderButtonsProp):JSX.Element{
  return(
    <div className="popular-trainings__controls">
      <button
        className={`btn-icon popular-trainings__control ${isDark ? 'btn-icon--outlined' : ''}`}
        type="button"
        aria-label="previous"
        onClick={() => previous?.()}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-left"></use>
        </svg>
      </button>
      <button
        className={`btn-icon popular-trainings__control ${isDark ? 'btn-icon--outlined' : ''}`}
        type="button"
        aria-label="next"
        onClick={() => next?.()}
      >
        <svg width="16" height="14" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
    </div>
  );
}

export default SliderButtons;
