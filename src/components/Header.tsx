import React from 'react'
import BackBtn from './BackButton'
import ProgressBar from './ProgressBar'
import Score from './Score'

interface HeaderProps {
  level: string
  currentQuestionIndex: number
  totalQuestions: number
  points: number
}

const Header = ({ level, currentQuestionIndex, totalQuestions, points }: HeaderProps) => {
  return (
    <div className="fixed top-0 left-0 w-full px-4 h-[200px] z-50 flex flex-col justify-between">
      <div className="absolute top-2 left-2">
        <BackBtn />
      </div>
      <div>
        <div className="mt-4 text-lg font-bold text-center text-white">
            Nível {level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
        <div className="mt-4 flex flex-col items-center justify-center">
            <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions} />
            <Score points={points} />
        </div>
      </div>
    </div>
  )
}

export default Header