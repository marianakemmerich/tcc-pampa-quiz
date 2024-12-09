import React from 'react'

interface NextLevelButtonProps {
  onNextLevel: () => void
}

const NextLevelButton = ({ onNextLevel }: NextLevelButtonProps) => {
  return (
    <button
      onClick={onNextLevel}
      className='mt-4 px-4 py-2 bg-leafGreen text-white rounded'
    >
      Próximo Nível
    </button>
  )
}

export default NextLevelButton