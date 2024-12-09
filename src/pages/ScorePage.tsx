import React, { useEffect, useState } from 'react'
import BackBtn from '../components/BackButton'

const ScorePage = () => {
  const [scores, setScores] = useState<number[]>([])

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('playerScores') || '[]')
    setScores(storedScores)
  }, [])

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='items-left fixed top-2 md:top-0 w-screen'>
          <BackBtn />
      </header>
      <h1 className="text-3xl font-bold mb-6 text-white">Últimas Pontuações</h1>
      <div className="w-full max-w-md bg-sunshine rounded-lg p-6 shadow-lg text-center">
        <ul className="space-y-4">
          {scores.length > 0 ? (
            scores.map((score, index) => (
              <li
                key={index}
                className="bg-yellow-600 p-4 rounded text-white text-lg font-medium"
              >
                {index + 1}: {score} pontos
              </li>
            ))
          ) : (
            <p className="text-white">Nenhuma pontuação salva ainda.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ScorePage