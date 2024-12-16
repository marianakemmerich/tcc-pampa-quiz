import React from 'react'

interface ClearScoreButtonProps {
  onClear: () => void
}

const ClearScoreButton = ({ onClear }: ClearScoreButtonProps) => {
  return (
    <button
      onClick={onClear}
      className='px-4 py-2 w-[200px] h-[60px] text-lg text-white font-bold rounded bg-red-600 hover:bg-red-800'
    >
      Zerar pontuação
    </button>
  )
}

export default ClearScoreButton