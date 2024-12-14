import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from './BackButton'
import ProgressBar from './ProgressBar'
import Score from './Score'

interface HeaderProps {
  level: string
  currentQuestionIndex: number
  totalQuestions: number
  points: number
}

const Header = ({ level, currentQuestionIndex, totalQuestions, points }: HeaderProps) => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()


  const handleBackClick = () => {
    setShowModal(true)
  }

  const handleConfirmExit = () => {
    setShowModal(false)
    navigate('/menu')
  }

  const handleCancelExit = () => {
    setShowModal(false)
  }

  return (
    <div className='fixed top-0 left-0 w-full px-4 h-[200px] z-50 flex flex-col justify-between'>
      <div className='absolute top-2 left-2'>
        <BackButton onBackClick={handleBackClick} />
      </div>
      <div>
        <div className='mt-4 text-lg font-bold text-center text-white'>
          Nível {level.charAt(0).toUpperCase() + level.slice(1)}
        </div>
        <div className='mt-4 flex flex-col items-center justify-center'>
          <ProgressBar
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
          />
          <Score points={points} />
        </div>
      </div>

      {showModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-[450px] h-[300px] flex items-center justify-center text-center'>
            <div className='flex flex-col items-center justify-center'>
              <h3 className='mb-2 text-3xl font-bold font-poppins'>Deseja sair do jogo?</h3>
              <p className='mb-4 text-lg font-poppins'>Seu progresso até aqui será perdido.</p>
              <div className='flex justify-around w-1/2 mt-8'>
                <button
                  className='px-4 py-2 mx-2 bg-forestGreen text-white font-poppins font-bold rounded'
                  onClick={handleConfirmExit}
                >
                  Ok
                </button>
                <button
                  className='px-4 py-2 mx-4 bg-gray-400 text-black font-poppins font-bold rounded'
                  onClick={handleCancelExit}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header