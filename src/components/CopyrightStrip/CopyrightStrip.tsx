import React from 'react'

const CopyrightStrip = ():JSX.Element => {
  return (
    <div className='container-fluid copyright-strip-container'>
      <div className='row'>
        <div className='col-12'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 text-center'>
                <p>© 2023. Minden jog fenntartva. Mancs Állatvédő Egyesület Magyarkanizsa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CopyrightStrip