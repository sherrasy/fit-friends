import './error-page.css';

function ErrorPage(): JSX.Element {
  return (
    <main className="error-container">
      <div className="error">
        <h1 className="error__title">404</h1>
        <span className="error__text">Страница не найдена.</span>
        <p className="error__subtext"> Возможно, страница была удалена или её вовсе не существовало.</p>
      </div>
    </main>
  );
}
export default ErrorPage;
