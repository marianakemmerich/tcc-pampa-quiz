import React from 'react'
import restart from '../assets/icons/restart.svg'

interface RestartButtonProps {
  onClick: () => void
}

const RestartButton = ({ onClick }: RestartButtonProps ) => {
  return (
    <button
      onClick={onClick}
      className='mt-8 px-4 py-2 bg-blue-600 text-white rounded ml-4'
    >
      <img src={restart} alt="Reiniciar quiz" className='w-[45px]' />
    </button>
  )
}

export default RestartButton