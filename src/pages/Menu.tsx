import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import InstructionsModal from '../components/InstructionsModal'
import InstructionsButton from '../components/InstructionsButton'

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center'
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='fixed top-2 md:top-0 w-screen flex justify-between px-4 items-center'>
        <BackButton navigateTo='/' />
        <div className='absolute top-2 right-4'>
          <InstructionsButton onBackClick={openModal} />
        </div>
      </header>

      <div className='flex flex-col gap-8'>
        <Button label='Jogar' route='/categories' />
        <Button label='Pontuação' route='/score' />
        <Button label='Recompensas' route='/rewards' />
      </div>

      {isModalOpen && <InstructionsModal onClose={closeModal} />}
    </div>
  )
}

export default Menu