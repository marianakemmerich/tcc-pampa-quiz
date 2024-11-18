import React from 'react'
import logo from '../assets/logo/pampa-quiz-logo.png'
import Button from '../components/Button'

const Home = () => {
  return (
    <div className='w-screen h-screen items-center justify-center flex flex-col'
    style={{
      backgroundImage: "url('image/cenario.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <div className='flex flex-col items-center justify-center'>
        <img src={logo} alt="Pampa Quiz logo" className='w-[3/5] md:w-[500px]' />
      </div>
      <Button label='Jogar' route='/menu' className='mt-14'/>
    </div>
  )
}

export default Home