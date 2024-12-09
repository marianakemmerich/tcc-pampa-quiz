import React from 'react'
import BackButton from '../components/BackButton'
import Button from '../components/Button'

const Menu = () => {
  return (
    <div className='w-screen h-screen items-center justify-center flex flex-col'
    style={{
      backgroundImage: "url('image/cenario.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
        <header className='items-left fixed top-2 md:top-0 w-screen'>
            <BackButton />
        </header>
        <div className='flex flex-col gap-8'>
            <Button label='Jogar' route='/categories' />
            <Button label='Pontuação' route='/score' />
            <Button label='Recompensas' route='/rewards' />
        </div>
    </div>
  )
}

export default Menu