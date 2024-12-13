import React from 'react'

interface ScoreButtonProps {
  onClick: () => void
}

const ScoreButton = ({ onClick }: ScoreButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='mt-4 mr-4 px-4 py-2 w-[250px] h-[60px] bg-blue-600 text-lg text-white font-poppins font-bold rounded'
    >
      Ver Pontuação
    </button>
  )
}

export default ScoreButton