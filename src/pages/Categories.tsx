import React from 'react'
import BackButton from '../components/BackButton'
import CategoryCard from '../components/CategoryCard'
import img from '../assets/logo/pampa-quiz-logo.png'

const Categories = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'
    style={{
      backgroundImage: "url('image/cenario.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <header className='items-left fixed top-2 md:top-0 w-screen'>
          <BackButton />
      </header>
      <div className='grid grid-cols-3 gap-4'>
        <CategoryCard label='Fauna' category='fauna' image={img} className='bg-sunshine' />
        <CategoryCard label='Flora' category='flora' image={img} className='bg-leafGreen' />
        <CategoryCard label='Geral' category='geral' image={img} className='bg-skyBlue'/>
      </div>
      
    </div>
  )
}

export default Categories