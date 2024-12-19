import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import BackButton from '../components/BackButton'
import Button from '../components/Button'
import InstructionsModal from '../components/InstructionsModal'
import InstructionsButton from '../components/InstructionsButton'
import UserButton from '../components/UserButton'

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsGuest(user?.isAnonymous || false)
    })
    return unsubscribe
  }, [])

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
      <header
        className='fixed top-2 md:top-0 w-screen flex justify-between px-4 items-center'
      >
        <BackButton navigateTo='/' />
        <div className='flex items-center space-x-4 absolute top-2 right-4'>
          <UserButton isGuest={isGuest} />
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