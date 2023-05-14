import React from 'react'
import '../../assets/pages/Contact.scss'
import BaseLayout from '../../layout/BaseLayout'
import { Link } from 'react-router-dom'

const Contact = (): JSX.Element => {
  return (
    <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1>Kapcsolat</h1>
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
            <form className="contact-form p-4">
              <h4 className="mb-3">Írj nekünk:</h4>
              <div className="row">
                <div className="col-12">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <input type="text" className="form-control" placeholder="Vezetéknév" id="contactLastName"/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <input type="text" className="form-control" placeholder="Keresztnév" id="contactFirstName"/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-at"></i>
                    </div>
                    <input type="email" className="form-control" placeholder="Email" id="contactEmail"/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <input type="text" className="form-control" placeholder="Telefonszám" id="contactPhone"/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-message"></i>
                    </div>
                    <textarea className="form-control" placeholder="Üzenet" id="contactMessage"/>
                  </div>
                </div>
              </div>
              <div className="row justify-content-end">
                <div className="col-6 mt-3">
                  <button className="button call-to-action-button w-100">
                    Küldés
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className='row'>
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2768.622606079509!2d20.02662931221931!3d46.058625370969345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4744971c0b92a935%3A0x94227bbf1d51bedf!2zTWFuY3Mgw4FsbGF0dsOpZMWRIEVneWVzw7xsZXQgTWFneWFya2FuaXpzYQ!5e0!3m2!1sen!2shu!4v1683146272016!5m2!1sen!2shu"
              height="350" width='100%' style={{ border:0, borderRadius: '25px' }} allowFullScreen={false} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default Contact
