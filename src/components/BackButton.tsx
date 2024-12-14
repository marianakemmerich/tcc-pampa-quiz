import React from 'react'
import ArrowBtn from '../assets/icons/left-arrow.svg'

interface BackButtonProps {
  onBackClick?: () => void
  navigateTo?: string
}

const BackButton = ({ onBackClick, navigateTo }: BackButtonProps) => {
  const handleBack = () => {
    if (onBackClick) {
      onBackClick()
    } else if (navigateTo) {
      window.location.href = navigateTo
    } else {
      window.history.back()
    }
  }

  return (
    <div className='p-6'>
      <button onClick={handleBack}>
        <img src={ArrowBtn} alt="Go back" className='w-[40px] md:w-[50px] mt-4 ml-4 md:ml-8' />
      </button>
    </div>
  )
}

export default BackButton