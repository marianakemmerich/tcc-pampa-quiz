import React, { useEffect, useState } from 'react'
import BackBtn from '../components/BackButton'

interface ScoreData {
  [category: string]: {
    [level: string]: number
  }
}

const ScorePage = () => {
  const [scores, setScores] = useState<ScoreData>({})

  useEffect(() => {
    const storedScores: ScoreData = JSON.parse(localStorage.getItem('scores') || '{}')
    setScores(storedScores)
  }, [])

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center'
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='items-left fixed top-2 md:top-0 w-screen'>
        <BackBtn />
      </header>
      <h1 className='text-3xl font-bold mb-6 text-white'>Pontuações</h1>
      <div className='w-full max-w-md bg-sunshine rounded-lg p-6 shadow-lg text-center'>
        {Object.keys(scores).length > 0 ? (
          Object.entries(scores).map(([category, levels]) => (
            <div key={category} className='mb-4'>
              <h2 className="text-2xl font-bold text-yellow-600 capitalize">{category}</h2>
              <ul className='space-y-2'>
                {Object.entries(levels).map(([level, points]) => (
                  <li key={level} className='bg-yellow-600 p-3 rounded text-white text-lg font-medium'>
                    {level}: {points} pontos
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className='text-white'>Nenhuma pontuação salva ainda.</p>
        )}
      </div>
    </div>
  )
}

export default ScorePage