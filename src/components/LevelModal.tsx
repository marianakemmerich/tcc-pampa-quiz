import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LevelModalProps } from '../types/LevelModal'

const LevelModal = ({
  isOpen,
  onClose,
  selectedLevel,
  setSelectedLevel,
  category,
}: LevelModalProps) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleStartGame = () => {
    if (selectedLevel && category) {
      navigate(`/quiz-${category.toLowerCase()}?level=${selectedLevel.toLowerCase()}`)
    }
  }

  const levelColors: Record<string, string> = {
    Fácil: 'bg-green-500 hover:bg-green-600',
    Médio: 'bg-yellow-500 hover:bg-yellow-600',
    Difícil: 'bg-red-500 hover:bg-red-600',
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white justify-center items-center rounded-lg p-6 w-80">
        <h4 className="text-xl text-center font-bold mb-4">Escolha o Nível de Dificuldade</h4>
        <div className="flex flex-col space-y-4">
          {['Fácil', 'Médio', 'Difícil'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 text-white rounded transition ${
                levelColors[level]
              } ${selectedLevel === level ? 'ring-4 ring-opacity-50' : ''}`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleStartGame}
            disabled={!selectedLevel}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition ${
              !selectedLevel ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Jogar
          </button>
        </div>
      </div>
    </div>
  )
}

export default LevelModal