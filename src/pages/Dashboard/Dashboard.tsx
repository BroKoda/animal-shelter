import React, { useEffect } from 'react'
import BaseLayout from '../../layout/BaseLayout'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchResidents } from '../Residents/ResidentsSlice'
import { Resident } from '../Residents/ResidentsState'
import { fetchNews } from '../News/NewsSlice'
import { Link } from 'react-router-dom'
import { fetchUsers } from './DashboardSlice'
import { Users } from './DashboardState'
import { News } from '../News/NewsState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import Error from '../../components/Error/Error'
import ProgressIndicator from '../../components/ProgressIndicator/ProgressIndicator'

const enum IndexAxis {
  Y = 'y',
  X = 'x'
}

function getResidentOlderThan(residents: Resident[] | undefined): number {
  let count = 0
  const today = new Date().valueOf()
  const thirtyDay = today - 2592000000
  if (residents != null) {
    residents.forEach((resident) => {
      if (resident.animal?.arrivalDate != null) {
        const arrival = new Date(resident.animal?.arrivalDate).valueOf()
        if (arrival < thirtyDay) {
          count += 1
        }
      }
    })
  }
  return count
}

function getNewsOlderThan(news: News[] | undefined): number {
  let count = 0
  const today = new Date().valueOf()
  const thirtyDay = today - 2592000000
  if (news != null) {
    news.forEach((singleNews) => {
      if (singleNews.newsDetails?.time != null) {
        const published = new Date(singleNews.newsDetails?.time).valueOf()
        if (published > thirtyDay) {
          count += 1
        }
      }
    })
  }
  return count
}

function getAdminRoleCount(users: Users[] | undefined): number {
  let count = 0
  if (users != null) {
    users.forEach((user) => {
      console.log(user)
      if (user.role === 'admin') {
        count += 1
      }
    })
  }
  return count
}

function getPublicistCount(users: Users[] | undefined): number {
  let count = 0
  if (users != null) {
    users.forEach((user) => {
      console.log(user)
      if (user.role === 'publicist') {
        count += 1
      }
    })
  }
  return count
}

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { residents, news, dashboard } = useAppSelector((state) => state)
  const residentOlder = getResidentOlderThan(residents?.residents)
  const newsOlder = getNewsOlderThan(news?.news)
  const residentCount = residents.residents?.length
  const newsCount = news.news?.length
  const registeredUsers = dashboard?.users?.length
  const adminCount = getAdminRoleCount(dashboard?.users)
  const publicistCount = getPublicistCount(dashboard?.users)

  useEffect(() => {
    dispatch(fetchNews())
    dispatch(fetchResidents())
    dispatch(fetchUsers())
  }, [dispatch])

  const residentsChartData = {
    labels: ['Több min 1 hónapja lakó', 'Összes lakó'],
    datasets: [{
      label: 'Lakók',
      borderColor: '#7868E6',
      borderWidth: 1,
      backgroundColor: '#EDEEF7',
      data: [residentOlder, residentCount]
    }]
  }
  const residentsChartOption = {
    indexAxis: IndexAxis.Y,
    scales: {
      x: {
        ticks: {
          stepSize: 1
        }
      }
    }
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  return (
    <BaseLayout>
      <>
        {(residents.fetchResidentsStatus === LoadingStatus.error || news.fetchNewsStatus === LoadingStatus.error) &&
          <Error/>
        }

        {(residents.fetchResidentsStatus === LoadingStatus.loading || news.fetchNewsStatus === LoadingStatus.loading) &&
          <ProgressIndicator/>
        }

        {(residents.fetchResidentsStatus === LoadingStatus.complete || news.fetchNewsStatus === LoadingStatus.complete) &&
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1>Irányítópult</h1>
              </div>
              <div className='col-12 mt-4'>
                <p>Oldalon elérhető hírek száma: <strong>{newsCount}</strong></p>
                <p>Hírek ebben a hónapban: <strong>{newsOlder}</strong></p>
                <p className='mt-3'>Admin felhaszálók: <strong>{adminCount}</strong></p>
                <p>Újságíró jogosultságó felhasználók száma: <strong>{publicistCount}</strong></p>
                <p>Regisztrált felhasználók száma: <strong>{registeredUsers}</strong></p>
                <p></p>
              </div>
              <div className="col-12 my-4">
                <Bar height={100} options={residentsChartOption} data={residentsChartData}/>
              </div>
              <div className="col-12 col-md-6">
                <Link to={'/lakok'}>
                  <button className="button call-to-action-button w-100">
                    Ugrás a lakókhoz!
                  </button>
                </Link>
              </div>
              <div className="col-12 col-md-6">
                <Link to={'/hirek'}>
                  <button className="button call-to-action-button w-100">
                    Ugrás a hírekhez!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      </>
    </BaseLayout>
  )
}

export default Dashboard