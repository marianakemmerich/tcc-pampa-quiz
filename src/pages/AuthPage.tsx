import React, { useState } from 'react'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import BackBtn from '../components/BackButton'
import PampaQuizLogo from '../assets/logo/pampa-quiz-logo.svg'

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/menu')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: username,
        })
      }
      navigate('/menu')
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth)
      navigate('/menu')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div
      className='flex flex-col items-center justify-center h-screen bg-gray-100 font-poppins'
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='fixed top-2 md:top-0 w-screen flex justify-between px-4 items-center'>
        <BackBtn navigateTo='/' />
      </header>

      <img src={PampaQuizLogo} alt='Logo' className='w-[150px] mb-6' />
      <div className='p-6 bg-white rounded shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-4 text-green-950'>
          {isSignUp ? 'Cadastre-se' : 'Entre no jogo'}
        </h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form
          onSubmit={isSignUp ? handleSignUp : handleLogin}
          className='flex flex-col space-y-4'
        >
          {isSignUp && (
            <input
              type="text"
              placeholder='Nome de usuário'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border rounded'
            />
          )}
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded'
          />
          <input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded'
          />
          {isSignUp && (
            <input
              type='password'
              placeholder='Confirme a senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full p-2 border rounded'
            />
          )}
          <button
            type='submit'
            className='w-full bg-forestGreen hover:bg-green-950 text-white p-2 rounded'
          >
            {isSignUp ? 'Cadastrar' : 'Entrar'}
          </button>
        </form>
        <button
          onClick={handleGuestLogin}
          className='w-full bg-skyBlue hover:bg-blue-900 text-white p-2 rounded mt-4'
        >
          Jogar como visitante
        </button>
        <p className='mt-4 text-center'>
          {isSignUp ? 'Já possui uma conta? ' : 'Não possui uma conta? '}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className='text-forestGreen hover:text-green-950 cursor-pointer underline'
          >
            {isSignUp ? 'Entre no jogo.' : 'Cadastre-se.'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default AuthPage