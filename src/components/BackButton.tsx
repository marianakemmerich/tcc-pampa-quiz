import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBtn from '../assets/icons/left-arrow.svg'

interface BackButtonProps {
  onBackClick?: () => void
  navigateTo?: string
}

const BackButton = ({ onBackClick, navigateTo }: BackButtonProps) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBackClick) {
      onBackClick()
    } else if (navigateTo) {
      navigate(navigateTo)
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
          src={ArrowBtn}
          alt='Voltar'
          className='w-[40px] md:w-[50px] mt-4 ml-4 md:ml-8'
        />
      </button>
    </div>
  )
}

export default BackButton