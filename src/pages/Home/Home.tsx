import React from 'react'
import BaseLayout from '../../layout/BaseLayout'

const Home = (): JSX.Element => {
  return (
    <BaseLayout>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h1>Home</h1>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Home