import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { ReducerName } from '@utils/constant';
import { makeFakeCertificate } from '@utils/mocks';
import HistoryRouter from '@components/history-router/history-router';
import CertificateCard from '@components/certificate-card/certificate-card';
import { UserRole } from '@frontend-types/common/user-role.enum';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeCertificate = makeFakeCertificate();
const store = mockStore({
  [ReducerName.User]: {
    role: UserRole.Coach,
  },
  [ReducerName.Account]: {
    notifications: null,
    certificares:[fakeCertificate]
  },
});
describe('Component: CertificateCard', () => {

  it('component should render correctly', () => {
    const certificateId = 'certificate-card';
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CertificateCard certificate={fakeCertificate}/>
        </HistoryRouter>
      </Provider>
    );
    const certificateElement = screen.getByTestId(certificateId);

    expect(certificateElement).toBeInTheDocument();
  });
});
