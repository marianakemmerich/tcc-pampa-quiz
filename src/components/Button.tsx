import React from 'react'
import { useNavigate } from 'react-router-dom'

interface ButtonProps {
    label: string
    route: string
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const Button = ({ label, route, type = 'button', className = '' }: ButtonProps) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(route)
    }

  return (
    <button onClick={handleClick} className='bg-sunshine w-[200px] h-[60px] rounded font-poppins font-medium text-[20px] md:text-[30px]'>{label}</button>
  )
}

export default Button