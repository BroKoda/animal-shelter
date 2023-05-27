import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import Registration from './Registration'
import { RegistrationState } from './RegistrationState'
import RegistrationSlice, {
  setConfirmPassword,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setPhone
} from './RegistrationSlice'

describe('Contact Page tests', () => {
  const initialState: RegistrationState = {
    userToCreate: {},
    status: LoadingStatus.initial
  }

  it('Should set the registration first name', () => {
    expect(RegistrationSlice(initialState, setFirstName('Test name'))).toEqual({
      userToCreate: {
        firstName: 'Test name'
      },
      status: LoadingStatus.initial
    })
  })

  it('Should set the registration last name', () => {
    expect(RegistrationSlice(initialState, setLastName('Test name'))).toEqual({
      userToCreate: {
        lastName: 'Test name'
      },
      status: LoadingStatus.initial
    })
  })

  it('Should set the registration email', () => {
    expect(RegistrationSlice(initialState, setEmail('test@test.com'))).toEqual({
      userToCreate: {
        email: 'test@test.com'
      },
      status: LoadingStatus.initial
    })
  })

  it('Should set the registration phone', () => {
    expect(RegistrationSlice(initialState, setPhone('00 000 0000'))).toEqual({
      userToCreate: {
        phone: '00 000 0000'
      },
      status: LoadingStatus.initial
    })
  })

  it('Should set the registration password', () => {
    expect(RegistrationSlice(initialState, setPassword('1234a'))).toEqual({
      userToCreate: {
        password: '1234a'
      },
      status: LoadingStatus.initial
    })
  })

  it('Should set the registration password confirm', () => {
    expect(RegistrationSlice(initialState, setConfirmPassword('1234a'))).toEqual({
      userToCreate: {
        confirmPassword: '1234a'
      },
      status: LoadingStatus.initial
    })
  })

  it('Should render registration page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <Registration />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})