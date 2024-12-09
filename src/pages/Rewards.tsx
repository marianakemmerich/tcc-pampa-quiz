import React, { useEffect, useState } from 'react'
import rewards from '../data/rewardsData'
import BackBtn from '../components/BackButton'

const Rewards = () => {
  const [totalScore, setTotalScore] = useState<number>(0)
  const [selectedReward, setSelectedReward] = useState<any>(null)

  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem('totalScore') || '0')
    setTotalScore(storedScore)
  }, [])

  const handleCardClick = (reward: any) => {
    if (totalScore >= reward.requiredPoints) {
      setSelectedReward(reward)
    }
  }

  const closeModal = () => setSelectedReward(null)

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center overflow-hidden'
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='items-left fixed top-2 md:top-0 w-screen'>
            <BackBtn />
        </header>
      <h1 className='text-3xl font-bold mb-2 text-white'>Recompensas</h1>
      <p className='text-lg font-bold text-center text-white'>Conheça os animais que você salvou!</p>
      <div
        className='grid grid-cols-3 gap-4 p-4 max-w-screen-lg'
        style={{
          maxHeight: '70vh',
          justifyContent: 'center',
        }}
      >
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className={`w-[150px] h-[150px] rounded-lg shadow-lg relative ${
              totalScore >= reward.requiredPoints ? 'hover:scale-105' : ''
            } transition-transform duration-300`}
            onClick={() => handleCardClick(reward)}
          >
            <img
              src={reward.image}
              alt={`${reward.commonName} (${reward.scientificName})`}
              className="w-full h-full object-cover rounded-lg"
            />
            {totalScore < reward.requiredPoints && (
              <div className='absolute inset-0 bg-black bg-opacity-90 rounded-lg flex items-center justify-center'>
                <span className='text-white text-3xl'>🔒</span>
              </div>
            )}
            {totalScore >= reward.requiredPoints && (
              <div className='absolute inset-0 bg-black bg-opacity-0 rounded-lg flex flex-col justify-end p-3 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <p className='text-white text-lg font-semibold'>{reward.commonName}</p>
                <p className='text-gray-300 text-sm italic'>{reward.scientificName}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedReward && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='bg-white text-black p-6 rounded-lg shadow-lg max-w-lg text-center'>
            <h2 className='text-2xl font-bold mb-4'>{selectedReward.commonName}</h2>
            <p className='italic mb-4'>{selectedReward.scientificName}</p>
            <p>{selectedReward.description}</p>
            <button
              onClick={closeModal}
              className='mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Rewards