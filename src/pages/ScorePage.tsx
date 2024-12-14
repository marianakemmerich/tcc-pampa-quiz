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

  const clearScores = () => {
    localStorage.removeItem('scores')
    setScores({})
  }

  const categoryStyles: { [key: string]: string } = {
    fauna: 'bg-sunshine',
    flora: 'bg-leafGreen',
    geral: 'bg-skyBlue',
  }

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center font-poppins'
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
      <div className='w-full max-w-4xl flex flex-wrap justify-center gap-8 rounded-lg p-6 text-center'>
        {Object.keys(scores).length > 0 ? (
          Object.entries(scores).map(([category, levels]) => (
            <div
              key={category}
              className={`w-64 p-4 rounded shadow-lg ${categoryStyles[category] || 'bg-gray-500'}`}
            >
              <h2 className="text-2xl font-bold text-white capitalize">{category}</h2>
              <ul className='space-y-2 mt-3'>
                {Object.entries(levels).map(([level, points]) => (
                  <li
                    key={level}
                    className='bg-white p-3 rounded text-black text-lg font-medium'
                  >
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
      <button
        onClick={clearScores}
        className='mt-6 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600'
      >
        Zerar pontuação
      </button>
    </div>
  )
}

export default ScorePage
