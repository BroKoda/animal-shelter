import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import NewsList from './NewsList/NewsList'
import AddNews from './AddNews/AddNews'
import SingleNewsPage from './SingleNewsPage/SingleNewsPage'
import LoginSlice, { setLoginEmail } from '../Login/LoginSlice'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import { NewsState } from './NewsState'
import NewsSlice, { setIntro, setIsUpdate, setIsUpdateId, setNewsBody, setTitle } from './NewsSlice'

describe('News page tests', () => {
  const initialState: NewsState = {
    news: [],
    newsToAdd: {},
    isUpdate: false,
    deleteNewsStatus: LoadingStatus.initial,
    updateNewsStatus: LoadingStatus.initial,
    addNewsStatus: LoadingStatus.initial,
    addNewsImageStatus: LoadingStatus.initial,
    fetchNewsStatus: LoadingStatus.initial,
    fetchSingleNewsStatus: LoadingStatus.initial
  }

  it('Should set news title', () => {
    expect(NewsSlice(initialState, setTitle('Test title'))).toEqual({
      news: [],
      newsToAdd: {
        title: 'Test title'
      },
      isUpdate: false,
      deleteNewsStatus: LoadingStatus.initial,
      updateNewsStatus: LoadingStatus.initial,
      addNewsStatus: LoadingStatus.initial,
      addNewsImageStatus: LoadingStatus.initial,
      fetchNewsStatus: LoadingStatus.initial,
      fetchSingleNewsStatus: LoadingStatus.initial
    })
  })

  it('Should set news intro', () => {
    expect(NewsSlice(initialState, setIntro('Test intro'))).toEqual({
      news: [],
      newsToAdd: {
        intro: 'Test intro'
      },
      isUpdate: false,
      deleteNewsStatus: LoadingStatus.initial,
      updateNewsStatus: LoadingStatus.initial,
      addNewsStatus: LoadingStatus.initial,
      addNewsImageStatus: LoadingStatus.initial,
      fetchNewsStatus: LoadingStatus.initial,
      fetchSingleNewsStatus: LoadingStatus.initial
    })
  })

  it('Should set news body', () => {
    expect(NewsSlice(initialState, setNewsBody('Test body'))).toEqual({
      news: [],
      newsToAdd: {
        newsBody: 'Test body'
      },
      isUpdate: false,
      deleteNewsStatus: LoadingStatus.initial,
      updateNewsStatus: LoadingStatus.initial,
      addNewsStatus: LoadingStatus.initial,
      addNewsImageStatus: LoadingStatus.initial,
      fetchNewsStatus: LoadingStatus.initial,
      fetchSingleNewsStatus: LoadingStatus.initial
    })
  })

  it('Should set isUpdate', () => {
    expect(NewsSlice(initialState, setIsUpdate(true))).toEqual({
      news: [],
      newsToAdd: {},
      isUpdate: true,
      deleteNewsStatus: LoadingStatus.initial,
      updateNewsStatus: LoadingStatus.initial,
      addNewsStatus: LoadingStatus.initial,
      addNewsImageStatus: LoadingStatus.initial,
      fetchNewsStatus: LoadingStatus.initial,
      fetchSingleNewsStatus: LoadingStatus.initial
    })
  })

  it('Should set isUpdate ID', () => {
    expect(NewsSlice(initialState, setIsUpdateId('1'))).toEqual({
      news: [],
      newsToAdd: {},
      isUpdate: false,
      isUpdateId: '1',
      deleteNewsStatus: LoadingStatus.initial,
      updateNewsStatus: LoadingStatus.initial,
      addNewsStatus: LoadingStatus.initial,
      addNewsImageStatus: LoadingStatus.initial,
      fetchNewsStatus: LoadingStatus.initial,
      fetchSingleNewsStatus: LoadingStatus.initial
    })
  })

  it('Should render news page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <NewsList />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should render add news page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <AddNews />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })

  it('Should render single news page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <SingleNewsPage />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})