import React, { useState } from 'react'
import CloseButton from '../assets/icons/green-close-icon.svg'
import Previous from '../assets/icons/previous-icon.svg'
import Next from '../assets/icons/next-icon.svg'

interface InstructionsModalProps {
  onClose: () => void
}

const InstructionsModal = ({ onClose }: InstructionsModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Como jogar',
      content: 'Responda às perguntas corretamente para acumular pontos e desbloquear recompensas.',
    },
    {
      title: 'Pontuação',
      content: (
        <ul className='list-disc list-inside'>
          <li>Fácil: 25 pontos por pergunta.</li>
          <li>Médio: 75 pontos por pergunta.</li>
          <li>Difícil: 150 pontos por pergunta.</li>
        </ul>
      ),
    },
    {
      title: 'Recompensas',
      content: 'Para desbloquear as recompensas é necessário acertar 70% das questões de cada nível.',
    },
  ]

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-poppins'>
      <div className='bg-white p-6 rounded-lg w-4/5 md:w-1/3 relative'>
        <button
          className='absolute top-2 right-2'
          onClick={onClose}
        >
          <img src={CloseButton} alt='Fechar' className='w-[30px] h-[30px]' />
        </button>

        <button
          className='absolute left-2 top-1/2 transform -translate-y-1/2 px-3 py-1'
          onClick={goToPrevious}
        >
          <img src={Previous} alt='Anterior' className='w-[30px] h-[30px]' />
        </button>
        <button
          className='absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1'
          onClick={goToNext}
        >
          <img src={Next} alt='Próximo' className='w-[30px] h-[30px]' />
        </button>

        <h2 className='text-xl font-bold mb-4 text-center'>{slides[currentSlide].title}</h2>
        <div className='mb-6 text-center ml-8 mr-8'>{slides[currentSlide].content}</div>

        <div className='flex justify-center gap-2 mb-4'>
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ?'bg-forestGreen' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InstructionsModal