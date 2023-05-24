import React, { useEffect } from 'react'
import BaseLayout from '../../layout/BaseLayout'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { fetchResidents } from '../Residents/ResidentsSlice'
import { Resident } from '../Residents/ResidentsState'
import { fetchNews } from '../News/NewsSlice'
import { Link } from 'react-router-dom'

const enum IndexAxis {
  Y = 'y',
  X = 'x'
}

function getResidentOlderThan (residents: Resident[] | undefined): number {
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

const Dashboard = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { residents, news } = useAppSelector((state) => state)
  const residentOlder = getResidentOlderThan(residents?.residents)
  const residentCount = residents.residents?.length
  const newsCount = news.news?.length

  useEffect(() => {
    dispatch(fetchNews())
    dispatch(fetchResidents())
  }, [dispatch])

  // const newsChartData = {
  //   labels: ['random'],
  //   datasets: [{
  //     label: 'egyes',
  //     data: [1,2,3,1,2]
  //   }]
  // }

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
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1>Irányítópult</h1>
          </div>
          <div className="col-12 my-4">
            <Bar options={residentsChartOption} data={residentsChartData}/>
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
    </BaseLayout>
  )
}

export default Dashboard