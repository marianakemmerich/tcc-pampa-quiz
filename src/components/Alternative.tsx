import { useState } from 'react'

interface Alternative {
  answer: string
  isCorrect: boolean
}

interface AlternativeProps {
  option: Alternative
  onSelect: (answer: string, isCorrect: boolean) => void
  isDisabled: boolean
  selectedAnswer: string | null
}

const Alternative = ({
  option,
  onSelect,
  isDisabled,
  selectedAnswer,
}: AlternativeProps) => {
  const handleAnswer = () => {
    onSelect(option.answer, option.isCorrect)
  }

  const isCorrect = selectedAnswer === option.answer && option.isCorrect
  const isIncorrect = selectedAnswer === option.answer && !option.isCorrect

  return (
    <button
      onClick={handleAnswer}
      disabled={isDisabled}
      className={`w-[350px] h-[150px] p-4 text-md font-poppins rounded-md border shadow-md
        ${
          isCorrect
            ?'bg-green-700 text-white'
            : isIncorrect
            ?'bg-red-700 text-white'
            : 'bg-white text-black'
        }
        ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-100'}
      `}
    >
      {option.answer}
    </button>
  )
}

export default Alternative