import { ContactState } from './ContactState'
import { LoadingStatus } from '../../components/LoadingStatus/LoadingStatus'
import ContactSlice, { setEmail, setFirstName, setLastName, setMessage, setPhone } from './ContactSlice'
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

  it('Should set the contact last name', () => {
    expect(ContactSlice(initialState, setLastName('Test name'))).toEqual({
      emailToSend: {
        lastName: 'Test name'
      },
      sendStatus: LoadingStatus.initial
    })
  })

  it('Should set the contact email', () => {
    expect(ContactSlice(initialState, setEmail('test@test.com'))).toEqual({
      emailToSend: {
        email: 'test@test.com'
      },
      sendStatus: LoadingStatus.initial
    })
  })

  it('Should set the contact phone', () => {
    expect(ContactSlice(initialState, setPhone('00 000 0000'))).toEqual({
      emailToSend: {
        phone: '00 000 0000'
      },
      sendStatus: LoadingStatus.initial
    })
  })

  it('Should set the contact message', () => {
    expect(ContactSlice(initialState, setMessage('Test message'))).toEqual({
      emailToSend: {
        message: 'Test message'
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