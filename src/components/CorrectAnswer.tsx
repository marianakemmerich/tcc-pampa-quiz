import React from 'react'

const CorrectAnswer: React.FC = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <img 
        src='image/messages/resposta-correta.svg'
        alt='Resposta Correta!'
        className='w-[500px]'
      />
    </div>
  )
}

export default CorrectAnswer