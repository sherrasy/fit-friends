import AddWorkoutForm from '../../components/add-workout-form/add-workout-form';
import Header from '../../components/header/header';

function AddWorkoutPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <AddWorkoutForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default AddWorkoutPage;
