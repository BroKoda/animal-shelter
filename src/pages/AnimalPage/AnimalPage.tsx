import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/pages/AnimalPage.scss'
import BaseLayout from '../../layout/BaseLayout'

const AnimalPage = (): JSX.Element => {
  return (
    <BaseLayout>
      <div className="container animal-page-container">
        <div className="row">
          <div className="col-12 mb-4">
            <h1>Anton adatlapja</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <img className="animal-image" src="/dog_placeholder.jpeg" alt="Anton képe"/>
          </div>
          <div className="col-6 align-self-center">
            <p className="animal-name mt-2">
              <strong>Név: </strong>
              Anton
            </p>
            <p className="animal-color mt-1">
              <strong>Szín: </strong>
              Barna
            </p>
            <p className="animal-size mt-1">
              <strong>Méret: </strong>
              Közepes
            </p>
            <p className="animal-birth mt-1">
              <strong>Születési idő: </strong>
              2023.01.01.
            </p>
            <p className="animal-arrival mt-1">
              <strong>Bekerülési idő: </strong>
              2023.01.01.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-4">
            <p className='animal-description-title mb-1'>
              <strong>Anton jellemzői:</strong>
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus est ante, lacinia ut ante quis,
              bibendum mattis mi. Maecenas vitae quam eget lacus tincidunt commodo et finibus justo. Quisque interdum
              massa ac ante pulvinar dictum vitae vitae tortor. Aenean vel pellentesque orci. In vel lacus in lacus
              congue fermentum. Nunc.</p>
          </div>
        </div>
        <div className='row justify-content-end'>
          <div className='col-3 mt-4'>
            <Link to={'/'}>
              <button className='button secondary-button'>
                Vissza
              </button>
            </Link>
          </div>
          <div className='col-3 mt-4'>
            <Link to={'/'}>
              <button className='button call-to-action-button'>
                Örökbefogadom!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default AnimalPage
