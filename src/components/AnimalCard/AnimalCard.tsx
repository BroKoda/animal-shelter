import React, { useEffect, useState } from 'react'
import '../../assets/components/AnimalCard.scss'
import { Link } from 'react-router-dom'
import { Animal } from '../../pages/Residents/ResidentsState'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'

interface AnimalCardProps {
  resident: Animal
  id: string
}

const AnimalCard = ({ resident, id }: AnimalCardProps): JSX.Element => {
  const [image, setImage] = useState('')

  useEffect(() => {
    const pathRef = ref(storage, `resident-images/${resident.image}`)
    const fetchImage = async () => await getDownloadURL(pathRef)
    fetchImage().then(response => setImage(response))
  }, [resident.image])

  return (
    <div className='container animal-card'>
      <div className='row'>
        <div className='col-12'>
          <div className='card-header'>
            <div className='card-header-logo'>
              <img src='/mancs_logo_white.png' alt='Mancs logo' />
            </div>
            <div className='card-header-text'>
              <p>Doggo</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <img className='animal-image' src={image} alt='Animal image'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <p className='animal-name mt-2'>{resident.name}</p>
          <p className='animal-description mt-1'>{resident.description}</p>
          <p className='animal-date mt-1'>{resident.arrivalDate}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Link to={`/lakok/adatlap/${id}`}>
            <button className='button call-to-action-button mt-2'>
              Megnézem!
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AnimalCard
