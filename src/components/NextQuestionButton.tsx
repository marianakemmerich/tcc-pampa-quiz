import React from 'react'

interface NextQuestionButtonProps {
  onNext: () => void
  isDisabled: boolean
}

const NextQuestionButton = ({ onNext, isDisabled }: NextQuestionButtonProps) => {
  return (
    <button
      onClick={onNext}
      disabled={isDisabled}
      className={`mt-4 px-4 py-2 rounded' ${isDisabled ? 'bg-gray-400 text-black font-bold' : 'bg-leafGreen text-white font-bold'}`}
    >
      Próxima Pergunta
    </button>
  )
}

export default NextQuestionButton