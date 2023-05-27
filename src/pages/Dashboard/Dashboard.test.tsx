import { RootState, store } from '../../app/store'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { DashboardState } from './DashboardState'
import DashboardSlice, { fetchUsers, selectDashboard } from './DashboardSlice'

describe('Dashboard page test', () => {
  const appState = store.getState()
  const initialState: DashboardState = {
    users: [],
    status: LoadingStatus.initial
  }

  it('Should set loading state when fetching users', (done) => {
    const nextState: DashboardState = DashboardSlice(initialState, fetchUsers.pending)
    const rootState: RootState = {... appState, dashboard: nextState}

    expect(selectDashboard(rootState).status).toEqual(LoadingStatus.loading)
    done()
  })

  it('Should set loading state when fetching users', (done) => {
    const nextState: DashboardState = DashboardSlice(initialState, fetchUsers.fulfilled)
    const rootState: RootState = {... appState, dashboard: nextState}

    expect(selectDashboard(rootState).status).toEqual(LoadingStatus.complete)
    done()
  })

  it('Should set loading state when fetching users', (done) => {
    const nextState: DashboardState = DashboardSlice(initialState, fetchUsers.rejected)
    const rootState: RootState = {... appState, dashboard: nextState}

    expect(selectDashboard(rootState).status).toEqual(LoadingStatus.error)
    done()
  })
})