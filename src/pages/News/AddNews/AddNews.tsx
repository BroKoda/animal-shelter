import React, { ChangeEvent, MouseEvent, useCallback, useEffect } from 'react'
import BaseLayout from '../../../layout/BaseLayout'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { addNews, setIntro, setNewsBody, setTitle } from '../NewsSlice'
import { LoadingStatus } from '../../../components/LoadingStatus/LoadingStatus'
import ProgressIndicator from '../../../components/ProgressIndicator/ProgressIndicator'
import { useNavigate } from 'react-router-dom'

const AddNews = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { newNews, addNewsStatus} = useAppSelector((state) => state.news)

  useEffect(() => {
    if (addNewsStatus === LoadingStatus.complete) {
      navigate('/hirek')
    }
  }, [addNewsStatus, navigate])

  const handleAddNews = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(addNews(newNews))
  }, [dispatch, newNews.title, newNews.intro, newNews.newsBody])

  const handleSetTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(event.target.value))
  }, [dispatch, newNews.title])

  const handleSetIntro = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setIntro(event.target.value))
  }, [dispatch, newNews.intro])

  const handleSetNewsBody = useCallback((event: string) => {
    dispatch(setNewsBody(event))
  }, [dispatch, newNews.newsBody])

  return (
    <BaseLayout>
      <>
        {addNewsStatus === LoadingStatus.loading &&
          <ProgressIndicator/>
        }

        {addNewsStatus !== LoadingStatus.loading &&
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <h1 className='mb-3'>Hír hozzáadása:</h1>
                <form className="mt-4 mb-5">
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-heading"></i>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Cím"
                      id="title"
                      value={newNews.title ?? ''}
                      onChange={handleSetTitle}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-quote-right"></i>
                    </div>
                    <textarea
                      className="form-control"
                      placeholder="Rövid leírás"
                      id="intro"
                      rows={2}
                      value={newNews.intro ?? ''}
                      onChange={handleSetIntro}
                    />
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-file-lines"></i>
                    </div>
                    <div className='w-100'>
                      <ReactQuill
                        theme='snow'
                        className='w-100'
                        value={newNews.newsBody ?? ''}
                        onChange={handleSetNewsBody}
                      ></ReactQuill>
                    </div>
                  </div>
                  <div className="form-control-container">
                    <div className="form-icon-container">
                      <i className="fa-solid fa-image"></i>
                    </div>
                    <input
                      type='file'
                      className="form-control file-input"
                      placeholder="Kép kiválasztása"
                      id="image"
                      data-button-text='Fájl kiválasztása'
                    />
                  </div>
                  <div className="row justify-content-end">
                    <div className="col-6">
                      <button className="button call-to-action-button w-100" onClick={handleAddNews}>
                        Hír hozzáadása
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