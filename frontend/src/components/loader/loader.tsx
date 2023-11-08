function Loader():JSX.Element{
  return(
    <div className="container">
      <div className="error">
        <h1 className="error__title">Loading...</h1>
        <p className="error__text">Please wait</p>
      </div>
    </div>
  );
}

export default Loader;
