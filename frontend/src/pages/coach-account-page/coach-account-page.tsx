import { ChangeEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import AdvertisementThumbnail from '../../components/advertisement-thumbnail/advertisement-thumbnail';
import CertificateCard from '../../components/certificate-card/certificate-card';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import SliderButtons from '../../components/slider-buttons/slider-buttons';
import Slider from '../../components/slider/slider';
import UserInfo from '../../components/user-info/user-info';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postCertificate } from '../../store/account-data/api-actions';
import { getCertificates } from '../../store/account-data/selectors';
import { getCurrentUserLoadingStatus } from '../../store/user-data/selectors';
import { AppRoute, SliderLimit } from '../../utils/constant';

type ButtonGroupProp = {
  next?: () => void;
  previous?: () => void;
};

const ButtonGroup = ({ next, previous }: ButtonGroupProp) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handlePDFUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) {
      return;
    }
    const certificateFile = evt.target.files[0];
    dispatch(postCertificate({certificateFile}));
  };

  const handleOpenInput = ()=> inputRef.current?.click();

  return(
    <div className="personal-account-coach__label-wrapper">
      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
      <input
        className="visually-hidden"
        type="file"
        name="import"
        accept=".pdf"
        ref={inputRef}
        onChange={handlePDFUpload}
      />
      <button
        className="btn-flat btn-flat--underlined personal-account-coach__button"
        type="button"
        onClick={handleOpenInput}
      >
        <svg width="14" height="14" aria-hidden="true">
          <use xlinkHref="#icon-import"></use>
        </svg>
        <span>Загрузить</span>
      </button>
      <SliderButtons next={next} previous={previous} />
    </div>
  );};

function CoachAccountPage(): JSX.Element {
  const isLoading = useAppSelector(getCurrentUserLoadingStatus);
  const certificates = useAppSelector(getCertificates);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <UserInfo />
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.CoachWorkouts}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-flash"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Мои тренировки
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.AddWorkout}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-add"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">
                        Создать тренировку
                      </span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.Friends}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-friends"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link
                      className="thumbnail-link thumbnail-link--theme-light"
                      to={AppRoute.Orders}
                    >
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true">
                          <use xlinkHref="#icon-bag"></use>
                        </svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <AdvertisementThumbnail />
                    </div>
                  </div>
                  <div className="personal-account-coach__additional-info">

                    <Slider
                      items={SliderLimit.SpecialForUser}
                      currentButtons={<ButtonGroup />}
                      isOutsideButtons
                      additionalClassName="personal-account-coach__list"
                    >
                      {( certificates && certificates.length !== 0) ? certificates.map((item) => (
                        <CertificateCard key={item.id} certificate={item}/>
                      )) : []}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default CoachAccountPage;
