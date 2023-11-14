import '../../styles/common-styles.css';

function AdvertisementThumbnail():JSX.Element{
  return(
    <div className="thumbnail-spec-gym">
      <div className="thumbnail-spec-gym__image">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x"
          />
          <img
            src="img/content/thumbnails/nearest-gym-01.jpg"
            srcSet="img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
            width="330"
            height="190"
            alt=""
          />
        </picture>
      </div>
      <div
        className="thumbnail-spec-gym__header"
        style={{ alignItems: 'center' }}
      >
        <h3 className="thumbnail-spec-gym__title">
        Скоро тут будет интересно
        </h3>
      </div>
    </div>
  );
}

export default AdvertisementThumbnail;
