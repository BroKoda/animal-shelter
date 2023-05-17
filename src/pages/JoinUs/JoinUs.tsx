import React from 'react'
import { Link } from 'react-router-dom'
import BaseLayout from '../../layout/BaseLayout'
import ContactForm from '../Contact/ContactForm/ContactForm'

const JoinUs = (): JSX.Element => {
  return (
    <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1>Jelentkezz önkéntesnek</h1>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12 col-lg-6 align-self-center mb-4 mb-lg-0">
            <p><strong>Cím: </strong></p>
            <p>
              Beogradska 3-5<br />
              24420 Magyarkanizsa<br />
              Szerbia
            </p>
            <p className='mt-3'><strong>Telefon: </strong></p>
            <p>
              +381 00 000 000
            </p>
            <p className='mt-3'><strong>Email: </strong></p>
            <p>
              mancsmagyarkanizsa@gmail.com
            </p>
            <p className='mt-3'><strong>Facebook: </strong></p>
            <p>
              <Link to={''}>
                Mancs Állatvédő Egyesület
              </Link>
            </p>
          </div>
          <div className="col-12 col-lg-6">
            <ContactForm title='Adataid:'/>
          </div>
        </div>
        <div className='row'>
          <div className="col-12">
            <h4 className='mb-4'>Támogass minked önkéntes adományoddal:</h4>
            <p><strong>Számla tulajdonos: </strong>Mancs Állatvédő Egyesület</p>
            <p className='mt-1'><strong>Bank neve: </strong>OTP Bank</p>
            <p className='mt-1'><strong>Belföldi számláról utalás: </strong>00000000 - 00000000 - 00000000</p>
            <p className='mt-1'><strong>Külfőldi számláról utalás: </strong>SRB62 00000000 - 00000000 - 00000000</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default JoinUs