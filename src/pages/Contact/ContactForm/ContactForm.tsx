import React, { ChangeEvent, MouseEvent, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import emailjs from '@emailjs/browser'
import { resetContact, setEmail, setFirstName, setLastName, setMessage, setPhone } from '../ContactSlice'

interface ContactFormProps {
  title: string
}

const ContactForm = ({ title }: ContactFormProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const form = useRef<HTMLFormElement>(null)
  const { emailToSend } = useAppSelector((state) => state.contact)

  const handleSendEmail = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (form.current != null) {
      emailjs.sendForm('service_38v7wda', 'template_6mgb108', form.current, '5h6xOpkT8HrAedbJ5')
        .then((result) => {
          dispatch(resetContact())
          return result
        }, (error) => {
          return error
        })
    }
  }, [form, dispatch])

  const handleSetFirstName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFirstName(event.target.value))
  }, [dispatch, emailToSend.firstName])
  const handleSetLastName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLastName(event.target.value))
  }, [dispatch, emailToSend.lastName])
  const handleSetEmail = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(event.target.value))
  }, [dispatch, emailToSend.email])
  const handleSetPhone = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPhone(event.target.value))
  }, [dispatch, emailToSend.phone])
  const handleSetMessage = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setMessage(event.target.value))
  }, [dispatch, emailToSend.message])

  return (
    <form className="contact-form p-4" ref={form}>
      <h4 className="mb-3">{title}</h4>
      <div className="row">
        <div className="col-12">
          <div className="form-control-container">
            <div className="form-icon-container">
              <i className="fa-solid fa-user"></i>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Vezetéknév"
              id="contactLastName"
              name="c_last_name"
              value={emailToSend.lastName ?? ''}
              onChange={handleSetLastName}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-control-container">
            <div className="form-icon-container">
              <i className="fa-solid fa-user"></i>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Keresztnév"
              id="contactFirstName"
              name="c_first_name"
              value={emailToSend.firstName ?? ''}
              onChange={handleSetFirstName}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-control-container">
            <div className="form-icon-container">
              <i className="fa-solid fa-at"></i>
            </div>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              id="contactEmail"
              name="c_email"
              value={emailToSend.email ?? ''}
              onChange={handleSetEmail}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-control-container">
            <div className="form-icon-container">
              <i className="fa-solid fa-phone"></i>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Telefonszám"
              id="contactPhone"
              name="c_phone"
              value={emailToSend.phone ?? ''}
              onChange={handleSetPhone}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="form-control-container">
            <div className="form-icon-container">
              <i className="fa-solid fa-message"></i>
            </div>
            <textarea
              className="form-control"
              placeholder="Üzenet"
              id="contactMessage"
              name="c_message"
              value={emailToSend.message ?? ''}
              onChange={handleSetMessage}
            />
          </div>
        </div>
      </div>
      <div className="row justify-content-end">
        <div className="col-6 mt-3">
          <button className="button call-to-action-button w-100" onClick={handleSendEmail}>
            Küldés
          </button>
        </div>
      </div>
    </form>
  )
}

export default ContactForm