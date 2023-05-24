import React, { MouseEvent, useCallback, useEffect, useState } from 'react'
import '../../assets/components/NewsCard.scss'
import { Link } from 'react-router-dom'
import { NewsDetails } from '../../pages/News/NewsState'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../../firebase'
import { User } from '../../pages/Login/LoginState'
import { useAppDispatch } from '../../app/hooks'
import { setIsUpdate, setIsUpdateId } from '../../pages/News/NewsSlice'

interface NewsCardProps {
  news: NewsDetails
  id: string
  user?: User
  showDeleteDialog: (id: string) => void
}

const NewsCard = ({ news, id, user, showDeleteDialog }: NewsCardProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [image, setImage] = useState('')

  useEffect(() => {
    const pathRef = ref(storage, `news-images/${news.image}`)
    const fetchImage = async () => await getDownloadURL(pathRef)
    fetchImage().then(response => setImage(response))
  }, [news.image])

  const handleEditButton = useCallback(() => {
    if (id != null) {
      dispatch(setIsUpdate(true))
      dispatch(setIsUpdateId(id))
    }
  }, [dispatch, news, id])

  const showDeleteDialogAction = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    showDeleteDialog(id)
  }, [id, showDeleteDialog])

  return (
    <div className='container listing-card news-card'>
      <div className='row'>
        <div className='col-12'>
          <div className='card-header'>
            <div className='card-header-logo'>
              <i className="fa-solid fa-newspaper"></i>
            </div>
            <div className='card-header-text'>
              <p>Hír</p>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 mt-2'>
          <img className='news-image' src={image} alt='News image'/>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <p className='news-title mt-2'>{news.title}</p>
          <p className='news-intro mt-1'>{news.intro}</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          {(user == undefined || user.role != 'admin') &&
            <Link to={`/hirek/${id}`}>
              <button className='button call-to-action-button mt-2 w-100'>
                Tovább olvasok!
              </button>
            </Link>
          }
          {user?.role === 'admin' &&
            <div className="container px-0">
              <div className="row g-2">
                <div className="col-6">
                  <Link to='/hirek/hozzaadas'>
                    <button className='button call-to-action-button mt-2 w-100' onClick={handleEditButton}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to={`/hirek/${id}`}>
                    <button className='button secondary-button mt-2 w-100'>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </Link>
                </div>
                <div className="col-3">
                  <Link to={'/hirek'}>
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

export default NewsCard
