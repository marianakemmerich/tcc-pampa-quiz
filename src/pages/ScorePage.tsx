import React, { useEffect, useState, useRef } from 'react'
import BackBtn from '../components/BackButton'
import SaveScoreButton from '../components/SaveScoreButton'
import ClearScoreButton from '../components/ClearScoreButton'

interface ScoreData {
  [category: string]: {
    [level: string]: number
  }
}

const ScorePage = () => {
  const [scores, setScores] = useState<ScoreData>({})
  const scoreRef = useRef<HTMLDivElement>(null)

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
      ref={scoreRef}
    >
      <header className='items-left fixed top-2 md:top-0 w-screen'>
        <BackBtn navigateTo='/menu' />
      </header>
      <h1 className='text-3xl font-bold mb-6 text-white'>Pontuação</h1>

      <div
        className='w-full max-w-4xl flex flex-wrap justify-center gap-8 rounded-lg p-6 text-center'
      >
        {Object.keys(scores).length > 0 ? (
          Object.entries(scores).map(([category, levels]) => (
            <div
              key={category}
              className={`w-64 p-4 rounded shadow-lg ${categoryStyles[category] || 'bg-gray-500'}`}
            >
              <h2 className='text-2xl font-bold text-white capitalize'>{category}</h2>
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
          <p className='text-white text-lg font-bold'>Nenhuma pontuação salva ainda.</p>
        )}
      </div>
      <div className='flex items-center justify-center space-x-8 mt-6'>
        <ClearScoreButton onClear={clearScores} />
        <SaveScoreButton targetRef={scoreRef} />
      </div>
    </div>
  )
}

export default ScorePage