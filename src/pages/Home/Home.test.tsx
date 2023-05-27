import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import { LoginState } from '../Login/LoginState'
import LoginSlice, { selectLogin, signOutUser } from '../Login/LoginSlice'
import { RootState, store } from '../../app/store'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { HomeState } from './HomeState'
import HomeSlice, { fetchHomeNews, fetchHomeResidents, selectHome } from './HomeSlice'
import { fetchResidents } from '../Residents/ResidentsSlice'

describe('Home page tests', () => {
  const appState = store.getState()
  const initialState: HomeState = {
    news: [],
    residents: [],
    fetchNewsStatus: LoadingStatus.initial,
    fetchResidentsStatus: LoadingStatus.initial
  }
  it('Should render home page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should set loading state when fetching news for home page', (done) => {
    const nextState: HomeState = HomeSlice(initialState, fetchHomeNews.pending)
    const rootState: RootState = {... appState, home: nextState}

    expect(selectHome(rootState).fetchNewsStatus).toEqual(LoadingStatus.loading)
    done()
  })

  it('Should set loading state when fetching news for home page', (done) => {
    const nextState: HomeState = HomeSlice(initialState, fetchHomeNews.fulfilled)
    const rootState: RootState = {... appState, home: nextState}

    expect(selectHome(rootState).fetchNewsStatus).toEqual(LoadingStatus.complete)
    done()
  })

  it('Should set loading state when fetching news for home page', (done) => {
    const nextState: HomeState = HomeSlice(initialState, fetchHomeNews.rejected)
    const rootState: RootState = {... appState, home: nextState}

    expect(selectHome(rootState).fetchNewsStatus).toEqual(LoadingStatus.error)
    done()
  })

  it('Should set loading state when fetching residents for home page', (done) => {
    const nextState: HomeState = HomeSlice(initialState, fetchHomeResidents.pending)
    const rootState: RootState = {... appState, home: nextState}

    expect(selectHome(rootState).fetchResidentsStatus).toEqual(LoadingStatus.loading)
    done()
  })

  it('Should set loading state when fetching residents for home page', (done) => {
    const nextState: HomeState = HomeSlice(initialState, fetchHomeResidents.fulfilled)
    const rootState: RootState = {... appState, home: nextState}

    expect(selectHome(rootState).fetchResidentsStatus).toEqual(LoadingStatus.complete)
    done()
  })

  it('Should set loading state when fetching residents for home page', (done) => {
    const nextState: HomeState = HomeSlice(initialState, fetchHomeResidents.rejected)
    const rootState: RootState = {... appState, home: nextState}

    expect(selectHome(rootState).fetchResidentsStatus).toEqual(LoadingStatus.error)
    done()
  })
})