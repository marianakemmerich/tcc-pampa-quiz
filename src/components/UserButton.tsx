import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import UserIcon from '../assets/icons/user-icon.svg'

interface UserButtonProps {
  isGuest: boolean
}

const UserButton: React.FC<UserButtonProps> = ({ isGuest }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }

  const handleLoginRedirect = () => {
    navigate('/auth')
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="p-2"
      >
        <img
          src={UserIcon}
          alt="Usuário"
          className="w-[40px] md:w-[50px] mt-4 ml-4 md:ml-8"
        />
      </button>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-48">
          {isGuest ? (
            <button
              onClick={handleLoginRedirect}
              className="block w-full px-4 py-2 text-left hover:bg-forestGreen hover:text-white"
            >
              Entrar no jogo
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-left hover:bg-forestGreen hover:text-white"
            >
              Sair do jogo
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default UserButton