type ShowMoreButtonProps = {
  onShown?: () => void;
  onReturn?: () => void;
  isShowMoreVisible?: boolean;
  isReturnVisible?: boolean;
};

function ShowMoreButton({
  onShown,
  onReturn,
  isShowMoreVisible,
  isReturnVisible,
}: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="show-more my-orders__show-more">
      {isShowMoreVisible && (
        <button
          className="btn show-more__button show-more__button--more"
          type="button"
          onClick={onShown}
        >
          Показать еще
        </button>
      )}
      {isReturnVisible && (
        <button
          className="btn show-more__button"
          type="button"
          onClick={onReturn}
        >
          Вернуться в начало
        </button>
      )}
    </div>
  );
}

export default ShowMoreButton;
