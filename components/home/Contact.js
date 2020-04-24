import React, { useState } from 'react';
import useTranslation from "../../hooks/useTranslation";
import Modal from '../Modal';
import fetch from "isomorphic-unfetch";

const Contact = ({ homepage }) => {

  const { locale, t } = useTranslation()

  /* Form variables and functions */
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })

  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    message: '',
    privacy: false,
    language: `${locale}`,
    message_ok: `${t('message_sent')}`,
    message_error: `${t('message_error')}`
  })

  const handleResponse = (status, msg) => {
    if (status === 200) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg }
      })
      setInputs({
        name: '',
        email: '',
        message: '',
        privacy: false,
        language: `${locale}`,
        message_ok: `${t('message_sent')}`,
        message_error: `${t('message_error')}`
      })
    } else {
      setStatus({
        info: { error: true, msg: msg }
      })
    }
  }

  const handleOnChange = e => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }

  const handleCheckboxOnChange = e => {
    e.persist()
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.checked
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }

  const handleOnSubmit = async e => {
    e.preventDefault()
    setStatus(prevStatus => ({ ...prevStatus, submitting: true }))
    const res = await fetch('../api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    })
    const text = await res.text()
    handleResponse(res.status, text)
  }

  return (
      <div>
        <section id="contact" className="Home__contact bg-darkgray">

          <div className="container">
            <div className="row">

              <div className="col-sm-12">

                <div className="Home__section-padding">
                  <h2 className="Home__section-title block-center">{homepage.acf.titulo_seccion_contacto}</h2>
                </div>

              </div>

            </div>
          </div>

          <div className="container Home__section-padding">
            <div className="row">

              <div className="col-md-6">

                <form onSubmit={handleOnSubmit}>
                  <input type="text" hidden readOnly value={inputs.language}/>
                  <input type="text" hidden readOnly value={inputs.message_ok}/>
                  <input type="text" hidden readOnly value={inputs.message_error}/>

                  <label htmlFor="name">{t('name_tag')}</label>
                  <input
                      id="name"
                      type="text"
                      onChange={handleOnChange}
                      required
                      value={inputs.name}
                  />
                  <label htmlFor="email">{t('email_tag')}</label>
                  <input
                      id="email"
                      type="email"
                      onChange={handleOnChange}
                      required
                      value={inputs.email}
                  />
                  <label htmlFor="message">{t('message_tag')}</label>
                  <textarea
                      id="message"
                      onChange={handleOnChange}
                      required
                      value={inputs.message}
                  />
                  <label htmlFor="privacy" className="privacy-label">
                    <input
                        id="privacy"
                        type="checkbox"
                        onChange={handleCheckboxOnChange}
                        required
                        value={inputs.privacy}
                    />
                    <div className="privacy-wrapper">
                      <span dangerouslySetInnerHTML={{__html: homepage.acf.etiqueta_privacidad}}></span><Modal linkText={t('privacypolicy_title')} title={t('legaltext_title')} content={t('legalnotice')} closetext={t('close')} />*
                    </div>
                  </label>

                  <div className="submit-btn-container">
                    <button type="submit" disabled={status.submitting} className="submit-contact-btn">
                      {!status.submitting
                          ? !status.submitted
                              ? t('submit')
                              : t('submitted')
                          : t('submitting')}
                    </button>
                  </div>

                </form>

                {status.info.error && (
                    <div className="error">Error: {status.info.msg}</div>
                )}
                {!status.info.error && status.info.msg && (
                    <div className="success">{status.info.msg}</div>
                )}


              </div>

              <div className="col-md-6">

                <div className="Home__contact__content" dangerouslySetInnerHTML={{__html: homepage.acf.informacion_tratamiento_datos}}></div>

              </div>

            </div>
          </div>

        </section>

        { /*language=CSS*/ }
        <style jsx>{`            
                .Home__contact {
                    padding-bottom: 70px;
                }

                .Home__contact .Home__section-padding:nth-child(2) {
                    padding-top: 0;
                }

                .Home__contact .Home__section-title {
                    margin-bottom: 0;
                }

                /* Form styles */
                form {
                    float: left;
                    width: 100%;
                }
                label {
                    float: left;
                    width: 100%;
                    margin-bottom: 5px;

                    color: #666666;
                    font-size: 1rem;
                    font-weight: 500;
                    text-align: left;
                    line-height: 1.3;
                }

                label.privacy-label {
                    font-size: 0.85rem;
                }

                label.privacy-label .privacy-wrapper {
                    float: left;
                    width: calc(100% - 45px);
                    margin-bottom: 30px;
                }

                :global(.privacy-wrapper p) {
                    display: inline;
                }

                input,
                button,
                textarea,
                .error,
                .success {
                    float: left;
                    width: 100%;
                    box-sizing: border-box;

                    margin: 0;
                    margin-bottom: 15px;
                    border: 1px solid #d1d1d1;
                    border-radius: 3px;
                    padding: 0.5em;
                    vertical-align: middle;
                    white-space: normal;
                    background: none;
                    line-height: 1;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: all 0.2s ease;
                }
                input[type=checkbox] {
                    float: left;
                    width: 15px;
                    margin-right: 5px;
                    margin-bottom: 3px;
                }
                button {
                    padding: 0.65em 1em;
                    background: #4a90e2;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    text-transform: uppercase;
                    line-height: 1.3;
                }

                .submit-contact-btn {
                    float: right;
                    width: 100%;
                    max-width: 200px;
                }

                textarea {
                    height: 4em;
                    max-width: 622px;
                }
                input:focus,
                textarea:focus,
                button:focus {
                    outline: 0;
                    border-color: #4a90e2;
                }

                button:hover {
                    background: rgba(0, 118, 255, 0.8);
                }

                button:focus {
                    box-shadow: 0 0 0 2px rgba(0, 118, 255, 0.5);
                }

                :global(
                    .bg-darkgray label,
                    .bg-darkgray,
                    .bg-darkgray .Home__section-title,
                    .bg-darkgray input,
                    .bg-darkgray textarea
                    ) {
                    color: #ffffff;
                }

                :global(.bg-darkgray a) {
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 600;
                }

                :global(.bg-darkgray button) {
                    background: #ffffff;
                    color: #4a4a4a;
                }

                :global(.bg-darkgray button:hover) {
                    background: #eeeeee;
                }

                :global(.bg-darkgray button:focus) {
                    background: #eeeeee;
                }
                button:disabled {
                    pointer-events: none;
                    background: #999;
                }

                .error,
                .success {
                    padding: 0.65em 1em;
                    color: #fff;
                    border: none;
                    cursor: default;
                    font-weight: 500;
                    transition: all 0.2s ease;
                    line-height: 1.5;
                    text-align: center;
                }

                .error {
                    background: #ee0000;
                }
                .success {
                    background: #4a90e2;
                }
                /* End Form styles */

                .Home__contact__content {
                    float: left;
                    width: 100%;
                    line-height: 1.5;
                    margin-top: 25px;
                }
                

                @media (max-width: 991px) {
                    .Home__contact__content {
                        margin-top: 50px;
                    }
                }

                @media (max-width: 767px) {
                    .Home__contact__section-padding {
                        padding-left: 50px;
                        padding-right: 50px;
                    }
                }

                @media (max-width: 640px) {
                    .submit-contact-btn {
                        float: none;
                    }

                    .submit-btn-container {
                        text-align: center;
                    }
                }

            `}</style>
      </div>
  );
};

export default Contact;
