import App from '@components/app/app';
import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from '@utils/constant';
import { createMemoryHistory, MemoryHistory } from 'history';
import { withHistory, withStore } from '@utils/mock-component';
import { makeFakeStore, makeFakeUser, makeFakeWorkout } from '@/utils/mocks';

const fakeUser = makeFakeUser();
const fakeWorkout = makeFakeWorkout();

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Intro" when user navigate to "/"', () => {
    const NameInfoToText = {
      signIn:'Регистрация',
      login:'Вход',
    };
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({}));
    mockHistory.push(AppRoute.Intro);
    render(withStoreComponent);

    const signInElement = screen.getByText(NameInfoToText.signIn);
    const loginElement = screen.getByText(NameInfoToText.login);

    expect(signInElement).toBeInTheDocument();
    expect(loginElement).toBeInTheDocument();
  });

  it('should render "Main" when user navigate to "/login" and already authorized', () => {
    const ElementToTestId = {
      specialForUser:'special-for-you',
      specialOffer:'special-offers',
      popular:'popular-trainings',
      lookForCompany:'look-for-company',
    };
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({status: AuthorizationStatus.Auth}));
    mockHistory.push(AppRoute.Login);
    render(withStoreComponent);
    const specialForUserElement = screen.getByTestId(ElementToTestId.specialForUser);
    const specialOfferElement = screen.getByTestId(ElementToTestId.specialOffer);
    const popularElement = screen.getByTestId(ElementToTestId.popular);
    const lookForCompanyElement = screen.getByTestId(ElementToTestId.lookForCompany);

    expect(specialForUserElement).toBeInTheDocument();
    expect(specialOfferElement).toBeInTheDocument();
    expect(popularElement).toBeInTheDocument();
    expect(lookForCompanyElement).toBeInTheDocument();
  });

  it('should render "UserAccount" when user navigate to "/user-account"', () => {
    const userInfoId = 'user-info';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({status: AuthorizationStatus.Auth}));
    mockHistory.push(AppRoute.UserAccount);
    render(withStoreComponent);

    expect(screen.getByTestId(userInfoId)).toBeInTheDocument();
  });

  it('should render "User" when user navigate to "/user-info/:id"', () => {
    const userCardId = 'user-card';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({status: AuthorizationStatus.Auth,user:fakeUser}));
    mockHistory.push(`${AppRoute.UserInfo}/${fakeUser.id}`);
    render(withStoreComponent);

    expect(screen.getByText(`${fakeUser.name}`)).toBeInTheDocument();
    expect(screen.getByTestId(userCardId)).toBeInTheDocument();
  });

  it('should render "Workout" when user navigate to "/workout-info/:id"', () => {
    const priceLabelText = 'Стоимость';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({status: AuthorizationStatus.Auth,workout:fakeWorkout}));    mockHistory.push(`${AppRoute.WorkoutInfo}/${fakeWorkout.id}`);

    render(withStoreComponent);

    expect(screen.getByLabelText(`${fakeWorkout.name}`)).toBeInTheDocument();
    expect(screen.getByLabelText(priceLabelText)).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    const mockRoute = '/non-existent-route';
    const textData = 'Страница не найдена.';
    const subtextData = 'Возможно, страница была удалена или её вовсе не существовало.';
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({}));
    mockHistory.push(mockRoute);

    render(withStoreComponent);

    const textElement = screen.getByText(textData);
    const subtextElement = screen.getByText(subtextData);

    expect(textElement).toBeInTheDocument();
    expect(subtextElement).toBeInTheDocument();
  });
});
