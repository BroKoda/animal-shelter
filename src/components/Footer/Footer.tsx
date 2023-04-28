import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ():JSX.Element => {
  return (
    <div className='container-fluid footer-container'>
      <div className='row'>
        <div className='col-12'>
          <div className='container py-5'>
            <div className='row'>
              <div className='col-4'>
                <h5>Mancs állatvédő egyesület</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Donec hendrerit lacus id faucibus suscipit. Pellentesque.</p>
              </div>
              <div className='col-4'>
                <h5>Kapcsolat</h5>
                <p>24420 Magyarkanizsa</p>
                <p>Szerbia</p>
              </div>
              <div className='col-4 social-links-container'>
                <h5>Kövess minket</h5>
                <Link to={'/facebook'} style={{ textDecoration: 'none' }}>
                  <i className='fa-brands fa-facebook'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer