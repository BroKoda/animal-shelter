import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import PageNotFound from './PageNotFound'

describe('Page not found test', () => {
  it('Should render page not found page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})