import React from 'react'
import { LevelModalProps } from '../types/LevelModal'
import Button from './Button'

const LevelModal = ({ isOpen, onClose, selectedLevel, setSelectedLevel, onStartGame }: LevelModalProps) => {
    if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white justify-center rounded-lg p-6 w-80">
                <h4 className="text-xl font-bold mb-4">Escolha o Nível de Dificuldade</h4>
                <div className="flex flex-col mb-4">
                    {['Fácil', 'Mediano', 'Difícil'].map(level => (
                        <label key={level} className="flex items-center mb-2">
                            <input
                                type="radio"
                                value={level}
                                checked={selectedLevel === level}
                                onChange={() => setSelectedLevel(level)}
                                className="mr-2"
                            />
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </label>
                    ))}
                </div>
                <div className="flex justify-center">
                    <Button label='Jogar' route='/quiz' />
                </div>
            </div>
    </div>
  )
}

export default LevelModal