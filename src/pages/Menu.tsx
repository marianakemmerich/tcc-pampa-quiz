import React from 'react'
import BackButton from '../components/BackButton'
import Button from '../components/Button'

const Menu = () => {
  return (
    <div className='bg-skyBlue w-screen h-screen items-center justify-center flex flex-col'>
        <header className='items-left fixed top-2 md:top-0 w-screen'>
            <BackButton />
        </header>
        <div className='flex flex-col gap-8'>
            <Button label='Jogar' route='/game' />
            <Button label='Opções' route='/options' />
            <Button label='Pontuação' route='/score' />
        </div>
    </div>
  )
}

export default Menu