import { LoginState } from './LoginState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import LoginSlice, { logInUser, selectLogin, setLoginEmail } from './LoginSlice'
import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
import { RootState, store } from '../../app/store'

describe('Login page tests', () => {
  const appState = store.getState()
  const initialState: LoginState = {
    userToLogin: {},
    status: LoadingStatus.initial,
    userStatus: LoadingStatus.initial,
    signOutUserStatus: LoadingStatus.initial
  }

  it('Should set login email', () => {
    expect(LoginSlice(initialState, setLoginEmail('test@email.com'))).toEqual({
      userToLogin: {
        email: 'test@email.com'
      },
      status: LoadingStatus.initial,
      userStatus: LoadingStatus.initial,
      signOutUserStatus: LoadingStatus.initial
    })
  })

  it('Should render login page', () => {
    const {container} = renderWithProviders(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should set loading state when logging in user', (done) => {
    const nextState: LoginState = LoginSlice(initialState, logInUser.pending)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).status).toEqual(LoadingStatus.loading)
    done()
  })
})