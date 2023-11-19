type ShowMoreButtonProps = {
  onShown: ()=> void;
}

function ShowMoreButton({onShown}:ShowMoreButtonProps):JSX.Element{
  return(
    <div className="show-more my-orders__show-more">
      <button className="btn show-more__button show-more__button--more" type="button" onClick={onShown}>Показать еще</button>
    </div>
  );
}

export default ShowMoreButton;
