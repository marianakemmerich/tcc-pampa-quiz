import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBtn from '../assets/icons/left-arrow.svg'

const BackButton = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }

  return (
    <div className='p-6'>
        <button onClick={handleBack}>
            <img src={ArrowBtn} alt="Go back" className='w-[50px] md:w-[60px] mt-4 ml-4 md:ml-8' />
        </button>
    </div>
  )
}

export default BackButton