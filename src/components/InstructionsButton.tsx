import React from 'react'
import Help from '../assets/icons/help-icon.png'

interface InstructionsButtonProps {
  onBackClick?: () => void
  navigateTo?: string
}

const InstructionsButton = ({ onBackClick, navigateTo }: InstructionsButtonProps) => {
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
      <button
        onClick={handleBack}
        className='transition-transform duration-200 ease-in-out hover:scale-110'
      >
        <img
          src={Help}
          alt='Voltar'
          className='w-[40px] md:w-[50px] mt-4 ml-4 md:ml-8'
        />
      </button>
    </div>
  )
}

export default InstructionsButton