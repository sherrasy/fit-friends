import { useState } from 'react';
import { Certificate } from '@frontend-types/reaction/file.interface';
import { DefaultParam } from '@utils/constant';

type CertificateCardProps = {
  certificate: Certificate;
};
function CertificateCard({ certificate }: CertificateCardProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(DefaultParam.Status);
  const handleEditingChange = () => setIsEditing((prev) => !prev);
  return (
    <div className="certificate-card certificate-card--edit">
      <div className="certificate-card__image">
        <iframe
          src={`${certificate.path}#zoom=72&toolbar=0&navpanes=0&scrollbar=0`}
          width="294"
          height="360"
          title="Сертификат - Биомеханика ударов в боксе"
          data-testid="certificate-card"
        />
      </div>
      <div className="certificate-card__buttons">
        {!isEditing && (
          <button
            className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
            type="button"
            onClick={handleEditingChange}
          >
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="#icon-edit"></use>
            </svg>
            <span>Изменить</span>
          </button>
        )}
        {isEditing && (
          <>
            <button
              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
              type="button"
              onClick={handleEditingChange}
            >
              <svg width="12" height="12" aria-hidden="true">
                <use xlinkHref="#icon-edit"></use>
              </svg>
              <span>Сохранить</span>
            </button>
            <div className="certificate-card__controls">
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-change"></use>
                </svg>
              </button>
              <button
                className="btn-icon certificate-card__control"
                type="button"
                aria-label="next"
              >
                <svg width="14" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-trash"></use>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CertificateCard;
