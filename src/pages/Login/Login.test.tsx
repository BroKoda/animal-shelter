import { LoginState } from './LoginState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import LoginSlice, {
  getUserDetails,
  logInUser,
  selectLogin,
  setLoginEmail,
  setLoginPassword,
  signOutUser
} from './LoginSlice'
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

  it('Should set login password', () => {
    expect(LoginSlice(initialState, setLoginPassword('testPass'))).toEqual({
      userToLogin: {
        password: 'testPass'
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

  it('Should set loading state when logging in user', (done) => {
    const nextState: LoginState = LoginSlice(initialState, logInUser.fulfilled)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).status).toEqual(LoadingStatus.complete)
    done()
  })

  it('Should set loading state when logging in user', (done) => {
    const nextState: LoginState = LoginSlice(initialState, logInUser.rejected)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).status).toEqual(LoadingStatus.error)
    done()
  })

  it('Should set loading state when fetching user data', (done) => {
    const nextState: LoginState = LoginSlice(initialState, getUserDetails.pending)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).userStatus).toEqual(LoadingStatus.loading)
    done()
  })

  it('Should set loading state when fetching user data', (done) => {
    const nextState: LoginState = LoginSlice(initialState, getUserDetails.fulfilled)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).userStatus).toEqual(LoadingStatus.complete)
    done()
  })

  it('Should set loading state when fetching user data', (done) => {
    const nextState: LoginState = LoginSlice(initialState, getUserDetails.rejected)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).userStatus).toEqual(LoadingStatus.error)
    done()
  })

  it('Should set loading state when logging out user', (done) => {
    const nextState: LoginState = LoginSlice(initialState, signOutUser.pending)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).signOutUserStatus).toEqual(LoadingStatus.loading)
    done()
  })

  it('Should set loading state when logging out user', (done) => {
    const nextState: LoginState = LoginSlice(initialState, signOutUser.fulfilled)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).signOutUserStatus).toEqual(LoadingStatus.complete)
    done()
  })

  it('Should set loading state when logging out user', (done) => {
    const nextState: LoginState = LoginSlice(initialState, signOutUser.rejected)
    const rootState: RootState = {... appState, login: nextState}

    expect(selectLogin(rootState).signOutUserStatus).toEqual(LoadingStatus.error)
    done()
  })
})