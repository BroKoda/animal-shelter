import React from 'react'
import BaseLayout from '../../layout/BaseLayout'
import AnimalCard from '../../components/AnimalCard/AnimalCard'

const Home = (): JSX.Element => {
  return (
    <BaseLayout>
      <div className='container'>
        <div className='row'>
          <div className='col-12 mb-4'>
            <h1>Home</h1>
          </div>
        </div>
        <div className='row g-3'>
          <div className='col-4'>
            <AnimalCard/>
          </div>
          <div className='col-4'>
            <AnimalCard/>
          </div>
          <div className='col-4'>
            <AnimalCard/>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home