import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import '../../assets/components/ResidentCard.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Animal } from '../../pages/Residents/ResidentsState'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'
import { User } from '../../pages/Login/LoginState'
import { useAppDispatch } from '../../app/hooks'
import { setIsUpdate, setIsUpdateId } from '../../pages/Residents/ResidentsSlice'

interface ResidentCardProps {
  resident: Animal
  id: string
  user?: User
  showDeleteDialog: (id: string) => void
}

function getCardLogo (type: string | undefined): string {
  if (type === 'kutya') {
    return 'fa-dog'
  } else if (type === 'macska') {
    return 'fa-cat'
  } else {
    return 'fa-paw'
  }
}

const ResidentCard = ({ resident, id, user, showDeleteDialog }: ResidentCardProps): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [image, setImage] = useState('')
  const cardLogo = getCardLogo(resident.type)

  useEffect(() => {
    const pathRef = ref(storage, `resident-images/${resident.image}`)
    const fetchImage = async () => await getDownloadURL(pathRef)
    fetchImage().then(response => setImage(response))
  }, [resident.image])

  const handleEditButton = useCallback(() => {
    if (id != null) {
      dispatch(setIsUpdate(true))
      dispatch(setIsUpdateId(id))
    }
  }, [dispatch, resident, id, navigate])

  const showDeleteDialogAction = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    showDeleteDialog(id)
  }, [id, showDeleteDialog])

  return (
    <div className="container listing-card resident-card">
      <div className="row">
        <div className="col-12">
          <div className="card-header">
            <div className="card-header-logo">
              <i className={`fa-solid ${cardLogo}`}></i>
            </div>
            <div className="card-header-text">
              <p>{resident.type}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-2">
          <img className="resident-image" src={image} alt="resident image"/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p className="resident-name mt-2">{resident.name}</p>
          <p className="resident-description mt-1">{resident.description}</p>
          <p className="resident-date mt-1">{resident.arrivalDate}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {(user == undefined || user.role != 'admin') &&
            <Link to={`/lakok/adatlap/${id}`}>
              <button className="button call-to-action-button mt-2 w-100">
                Megnézem!
              </button>
            </Link>
          }
          {user?.role === 'admin' &&
            <div className="container px-0">
              <div className="row g-2">
                <div className="col-6">
                  <Link to='/lakok/hozzaadas'>
                    <button className='button call-to-action-button mt-2 w-100' onClick={handleEditButton}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to={`/lakok/adatlap/${id}`}>
                    <button className='button secondary-button mt-2 w-100'>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to={`/lakok/adatlap/${id}`}>
                    <button className='button secondary-button mt-2 w-100' onClick={showDeleteDialogAction}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ResidentCard
