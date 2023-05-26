import { ContactState } from './ContactState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import ContactSlice, { setFirstName } from './ContactSlice'
import { renderWithProviders } from '../../utils/test-utils'
import Contact from './Contact'
import { BrowserRouter } from 'react-router-dom'

describe('Contact Page tests', () => {
  const initialState: ContactState = {
    emailToSend: {},
    sendStatus: LoadingStatus.initial
  }

  it('Should set the contact first name', () => {
    expect(ContactSlice(initialState, setFirstName('Test name'))).toEqual({
      emailToSend: {
        firstName: 'Test name'
      },
      sendStatus: LoadingStatus.initial
    })
  })

  it('Should render contact page', async () => {
    const { container } = renderWithProviders(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    )
    expect(container).toMatchSnapshot()
  })
})