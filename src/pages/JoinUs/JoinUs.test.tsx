import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import JoinUs from './JoinUs'

describe('Join us page test', () => {
  it('Should render join us page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <JoinUs />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})