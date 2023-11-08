function UserCard(): JSX.Element {
  return (
    <div className="user-card-coach__card">
      <div className="user-card-coach__content">
        <div className="user-card-coach__head">
          <h2 className="user-card-coach__title">Валерия</h2>
        </div>
        <div className="user-card-coach__label">
          <a href="popup-user-map.html">
            <svg
              className="user-card-coach__icon-location"
              width="12"
              height="14"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-location"></use>
            </svg>
            <span>Адмиралтейская</span>
          </a>
        </div>
        <div className="user-card-coach__status-container">
          <div className="user-card-coach__status user-card-coach__status--tag">
            <svg
              className="user-card-coach__icon-cup"
              width="12"
              height="13"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-cup"></use>
            </svg>
            <span>Тренер</span>
          </div>
          <div className="user-card-coach__status user-card-coach__status--check">
            <span>Готов тренировать</span>
          </div>
          {/* <div class="user-card-coach-2__status user-card-coach-2__status--check"><span>Не готов тренировать</span></div> */}
        </div>
        <div className="user-card-coach__text">
          <p>
            Привет! Меня зовут Иванова Валерия, мне 34 года.
            Я&nbsp;профессиональный тренер по&nbsp;боксу. Не&nbsp;боюсь
            пробовать новое, также увлекаюсь кроссфитом, йогой и&nbsp;силовыми
            тренировками.
          </p>
          <p>
            Провожу как индивидуальные тренировки, так и&nbsp;групповые занятия.
            Помогу вам достигнуть своей цели и&nbsp;сделать это
            с&nbsp;удовольствием!
          </p>
        </div>
        <button className="btn-flat user-card-coach__sertificate" type="button">
          <svg width="12" height="13" aria-hidden="true">
            <use xlinkHref="#icon-teacher"></use>
          </svg>
          <span>Посмотреть сертификаты</span>
        </button>
        <ul className="user-card-coach__hashtag-list">
          <li className="user-card-coach__hashtag-item">
            <div className="hashtag">
              <span>#бокс</span>
            </div>
          </li>
          <li className="user-card-coach__hashtag-item">
            <div className="hashtag">
              <span>#кроссфит</span>
            </div>
          </li>
          <li className="user-card-coach__hashtag-item">
            <div className="hashtag">
              <span>#силовые</span>
            </div>
          </li>
          <li className="user-card-coach__hashtag-item">
            <div className="hashtag">
              <span>#йога</span>
            </div>
          </li>
        </ul>
        <button className="btn user-card-coach__btn" type="button">
          Добавить в друзья
        </button>
        {/* <button class="btn btn--outlined user-card-coach-2__btn" type="button">Удалить из друзей</button> */}
      </div>
      <div className="user-card-coach__gallary">
        <ul className="user-card-coach__gallary-list">
          <li className="user-card-coach__gallary-item">
            <img
              src="img/content/user-coach-photo1.jpg"
              srcSet="img/content/user-coach-photo1@2x.jpg 2x"
              width="334"
              height="573"
              alt="photo1"
            />
          </li>
          <li className="user-card-coach__gallary-item">
            <img
              src="img/content/user-coach-photo2.jpg"
              srcSet="img/content/user-coach-photo2@2x.jpg 2x"
              width="334"
              height="573"
              alt="photo2"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserCard;
