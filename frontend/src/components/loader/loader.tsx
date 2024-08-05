import '@styles/common-styles.css';

function Loader():JSX.Element{
  return(
    <div className="wrapper">
      <div className="loader-container">
        <h1 className="thumbnail-link__text">Loading...</h1>
        <p className="user-info-edit__title">Please wait</p>
      </div>
    </div>
  );
}

export default Loader;
