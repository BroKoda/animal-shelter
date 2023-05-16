import React, { useEffect, useState } from 'react'
import '../../assets/components/ResidentCard.scss'
import { Link } from 'react-router-dom'
import { Animal } from '../../pages/Residents/ResidentsState'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'

interface ResidentCardProps {
  resident: Animal
  id: string
}

function getCardLogo(type: string | undefined): string {
  if (type === 'kutya') {
    return 'fa-dog'
  } else if (type === 'macska') {
    return 'fa-cat'
  } else {
    return 'fa-paw'
  }
}

const ResidentCard = ({ resident, id }: ResidentCardProps): JSX.Element => {
  const [image, setImage] = useState('')
  const cardLogo = getCardLogo(resident.type)

  useEffect(() => {
    const pathRef = ref(storage, `resident-images/${resident.image}`)
    const fetchImage = async () => await getDownloadURL(pathRef)
    fetchImage().then(response => setImage(response))
  }, [resident.image])

  return (
    <div className='container resident-card'>
      <div className='row'>
        <div className='col-12'>
          <div className='card-header'>
            <div className='card-header-logo'>
              <i className={`fa-solid ${cardLogo}`}></i>
            </div>
            <div className='card-header-text'>
              <p>{resident.type}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <img className='resident-image' src={image} alt='resident image'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <p className='resident-name mt-2'>{resident.name}</p>
          <p className='resident-description mt-1'>{resident.description}</p>
          <p className='resident-date mt-1'>{resident.arrivalDate}</p>
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

export default ResidentCard
