import React from 'react'
import '../../assets/components/Tooltip.scss'

interface TooltipProps {
  text: JSX.Element
}

const Tooltip = ({ text }: TooltipProps): JSX.Element => {
  return (
    <div className='tooltip-container'>
      {text}
    </div>
  )
}

export default Tooltip
