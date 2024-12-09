import React from 'react'

interface ScoreProps {
  points: number
}

const Score = ({ points }: ScoreProps) => {
  return (
    <div className='text-xl font-semibold text-white'>
      {points}
    </div>
  )
}

export default Score