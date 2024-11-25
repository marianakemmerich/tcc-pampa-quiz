import React from 'react'

interface ProgressBarProps {
  currentQuestionIndex: number
  totalQuestions: number
}

const ProgressBar = ({ currentQuestionIndex, totalQuestions }: ProgressBarProps) => {
  const progress = (currentQuestionIndex / totalQuestions) * 100

  return (
    <div className="w-full bg-gray-300 rounded-full h-2">
      <div
        className="bg-green-500 h-8 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar