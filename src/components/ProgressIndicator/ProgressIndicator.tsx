import React from 'react'
import '../../assets/components/ProgressIndicator.scss'

const ProgressIndicator = (): JSX.Element => {
  return (
    <div className='progress-indicator-container'>
      <span className="progress-indicator"></span>
    </div>
  )
}

export default ProgressIndicator