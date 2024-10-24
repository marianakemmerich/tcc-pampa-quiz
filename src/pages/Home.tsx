import React from 'react'
import logo from '../assets/logo/pampa-quiz-logo.png'

const Home = () => {
  return (
    <div className='bg-skyBlue w-screen h-screen flex items-center justify-center'>
        <div className='flex items-center justify-center'>
            <img src={logo} alt="Pampa Quiz logo" className='w-[3/5] md:w-[500px] mb-14' />
        </div>
    </div>
  )
}

export default Home