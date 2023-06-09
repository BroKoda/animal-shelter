import React, { ChangeEvent, MouseEvent, useCallback, useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addNews,
  addNewsImage,
  fetchSingleNews,
  resetNews,
  setIntro,
  setNewsBody,
  setTitle,
  updateNews
} from '../NewsSlice'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import Error from '../../../components/Error/Error'
import Tooltip from '../../../components/Tooltip/Tooltip'

const AddNews = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.login.user)
  const { newsToAdd, addNewsStatus, isUpdate, isUpdateId, updateNewsStatus } = useAppSelector((state) => state.news)

  useEffect(() => {
    if (user == null || (user.role !== 'admin' && user.role !== 'publicist')) {
      navigate('/')
    }
  })

  useEffect(() => {
    if (addNewsStatus === LoadingStatus.complete || updateNewsStatus == LoadingStatus.complete) {
      dispatch(resetNews())
      navigate('/hirek')
    }
  }, [addNewsStatus, navigate, updateNewsStatus])

  useEffect(() => {
    if (isUpdate && isUpdateId != null) {
      dispatch(fetchSingleNews(isUpdateId))
    }
  }, [dispatch, isUpdate, isUpdateId])

  const handleAddNews = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (isUpdate && isUpdateId != null) {
      const update = {
        newsDetails: newsToAdd,
        id: isUpdateId
      }
      dispatch(updateNews(update))
    } else {
      const news = {
        time: new Date().valueOf(),
        ... newsToAdd
      }
      dispatch(addNews(news))
    }
  }, [dispatch, newsToAdd.title, newsToAdd.intro, newsToAdd.newsBody, newsToAdd.image])

  const handleSetTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value))
  }, [dispatch, newsToAdd.title])

  const handleSetIntro = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setIntro(event.target.value))
  }, [dispatch, newsToAdd.intro])

  const handleSetNewsBody = useCallback((event: string) => {
    dispatch(setNewsBody(event))
  }, [dispatch, newsToAdd.newsBody])

  const handleSetFile = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      const image = event.target.files[0]
      const name = `${v4()}`
      dispatch(addNewsImage({ image, name }))
    }
  }, [dispatch, newsToAdd.image])

  return (
    <BaseLayout>
      <>
        {(addNewsStatus === LoadingStatus.error || updateNewsStatus === LoadingStatus.error) &&
          <Error/>
        }

        {(addNewsStatus === LoadingStatus.loading || updateNewsStatus === LoadingStatus.loading) &&
          <ProgressIndicator/>
        }

        {(addNewsStatus === LoadingStatus.initial || updateNewsStatus === LoadingStatus.initial ||
            addNewsStatus === LoadingStatus.complete || updateNewsStatus === LoadingStatus.complete) &&
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h1 className="mb-3">Hír hozzáadása:</h1>
                <form className="mt-4 mb-5">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-heading"></i>
                      <Tooltip text={<p>A hír címe<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cím"
                      id="title"
                      value={newsToAdd.title ?? ''}
                      onChange={handleSetTitle}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-quote-right"></i>
                      <Tooltip text={<p>A hír bevezető szövege<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Rövid leírás"
                      id="intro"
                      rows={2}
                      value={newsToAdd.intro ?? ''}
                      onChange={handleSetIntro}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-file-lines"></i>
                      <Tooltip text={<p>A hír tartalma<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <div className="w-100">
                      <ReactQuill
                        theme="snow"
                        className="w-100"
                        value={newsToAdd.newsBody ?? ''}
                        onChange={handleSetNewsBody}
                      ></ReactQuill>
                    </div>
                  </div>
                  <div className={`form-control-container ${isUpdate ? 'd-none' : ''}`}>
                    <div className="form-icon-container">
                      <i className="fa-solid fa-image"></i>
                      <Tooltip text={<p>A hír képe<br/> Mező kitöltése kötelező!</p>}></Tooltip>
                    </div>
                    <input
                      type="file"
                      className="form-control file-input"
                      placeholder="Kép kiválasztása"
                      id="news-image"
                      name="news-image"
                      data-button-text="Fájl kiválasztása"
                      onChange={handleSetFile}
                    />
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-6">
                      <button className="button call-to-action-button w-100" onClick={handleAddNews}>
                        {isUpdate ? 'Hír módosítása' : 'Hír hozzáadása'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </>
    </BaseLayout>
  )
}

export default AddNews