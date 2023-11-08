function PopularTrainings():JSX.Element{
  return(
    <section className="popular-trainings">
      <div className="container">
        <div className="popular-trainings__wrapper">
          <div className="popular-trainings__title-wrapper">
            <h2 className="popular-trainings__title">Популярные тренировки</h2>
            <button className="btn-flat popular-trainings__button" type="button">
              <span>Смотреть все</span>
              <svg width="14" height="10" aria-hidden="true">
                <use xlinkHref="#arrow-right"></use>
              </svg>
            </button>
            <div className="popular-trainings__controls">
              <button className="btn-icon popular-trainings__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg>
              </button>
              <button className="btn-icon popular-trainings__control" type="button" aria-label="next">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </button>
            </div>
          </div>
          <ul className="popular-trainings__list">
            <li className="popular-trainings__item">
              <div className="thumbnail-training">
                <div className="thumbnail-training__inner">
                  <div className="thumbnail-training__image">
                    <picture>
                      <source type="image/webp" srcSet="
                        img/content/thumbnails/training-06.webp,
                        img/content/thumbnails/training-06@2x.webp 2x
                      "
                      />
                      <img src="img/content/thumbnails/training-06.jpg" srcSet="
                        img/content/thumbnails/training-06@2x.jpg 2x
                      " width="330" height="190" alt=""
                      />
                    </picture>
                  </div>
                  <p className="thumbnail-training__price">
                    <span className="thumbnail-training__price-value">1600</span><span>₽</span>
                  </p>
                  <h3 className="thumbnail-training__title">
                run, forrest, run
                  </h3>
                  <div className="thumbnail-training__info">
                    <ul className="thumbnail-training__hashtags-list">
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag">
                          <span>#бег</span>
                        </div>
                      </li>
                      <li className="thumbnail-training__hashtags-item">
                        <div className="hashtag thumbnail-training__hashtag">
                          <span>#500ккал</span>
                        </div>
                      </li>
                    </ul>
                    <div className="thumbnail-training__rate">
                      <svg width="16" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-star"></use>
                      </svg><span className="thumbnail-training__rate-value">5</span>
                    </div>
                  </div>
                  <div className="thumbnail-training__text-wrapper">
                    <p className="thumbnail-training__text">
                  Узнайте правильную технику бега, развивайте
                  выносливость и&nbsp;откройте для себя все секреты
                  длительных пробежек.
                    </p>
                  </div>
                  <div className="thumbnail-training__button-wrapper">
                    <a className="btn btn--small thumbnail-training__button-catalog" href="/">Подробнее</a>
                    <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="/">Отзывы</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PopularTrainings;
