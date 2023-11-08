function ShowMoreButton():JSX.Element{
  return(
    <div className="show-more my-orders__show-more">
      <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
      <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
    </div>
  );
}

export default ShowMoreButton;
