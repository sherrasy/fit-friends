import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, SliderLimit } from '../../utils/constant';
import { fetchUserList } from '../../store/user-data/api-actions';
import { getReadyUsers } from '../../store/user-data/selectors';
import UserCardSmall from '../user-card/user-card-small';
import SliderButtons from '../slider-buttons/slider-buttons';
import Slider from '../slider/slider';
import AdvertisementThumbnail from '../advertisement-thumbnail/advertisement-thumbnail';

type ButtonGroupProp = {
  next?: () => void;
  previous?: () => void;
};

const ButtonGroup = ({ next, previous }: ButtonGroupProp) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRouteChange = () => {
    dispatch(fetchUserList());
    navigate(AppRoute.UserList);
  };
  return (
    <div className="look-for-company__title-wrapper">
      <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
      <button
        onClick={handleRouteChange}
        className="btn-flat btn-flat--light look-for-company__button"
        type="button"
      >
        <span>Смотреть все</span>
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="#arrow-right"></use>
        </svg>
      </button>
      <SliderButtons next={next} previous={previous} isDark/>
    </div>
  );
};

function LookForCompany(): JSX.Element {
  const userList = useAppSelector(getReadyUsers);

  return (
    <section className="look-for-company">
      <div className="container">
        <div className="look-for-company__wrapper slider-main-reverse">
          {(!userList || !userList.length) && <AdvertisementThumbnail />}
          {userList && userList.length !== 0 && (
            <Slider
              items={SliderLimit.Default}
              currentButtons={<ButtonGroup />}
              isOutsideButtons
            >
              {userList.map((item) => (
                <UserCardSmall user={item} key={item.id} />
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
}

export default LookForCompany;
