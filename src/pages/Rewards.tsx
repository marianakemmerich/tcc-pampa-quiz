import React, { useEffect, useState } from 'react'
import rewards from '../data/rewardsData'
import BackBtn from '../components/BackButton'
import RewardModal from '../components/RewardModal'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

const Rewards = () => {
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({})
  const [selectedReward, setSelectedReward] = useState<any>(null)

  useEffect(() => {
    const auth = getAuth()
    const db = getFirestore()

    const fetchScores = async (uid: string) => {
      const scoresRef = collection(db, 'scores')
      const q = query(scoresRef, where('uid', '==', uid))
      const querySnapshot = await getDocs(q)
      const userScores: Record<string, Record<string, number>> = {}

      querySnapshot.forEach((doc) => {
        const { points, category, level } = doc.data()
        if (!userScores[category]) {
          userScores[category] = {}
        }
        userScores[category][level] = points
      })

      setScores(userScores)
      localStorage.setItem('scores', JSON.stringify(userScores))
    }

    const user = auth.currentUser
    if (user && !user.isAnonymous) {
      fetchScores(user.uid)
    } else {
      const storedScores = JSON.parse(localStorage.getItem('playerScores') || '{}')
      setScores(storedScores)
    }
  }, [])

  const isUnlocked = (reward: any) => {
    const visitorScores = JSON.parse(localStorage.getItem('playerScores') || '{}')
    const categoryScore =
      scores[reward.category]?.[reward.level] || visitorScores[reward.category]?.[reward.level] || 0
    return categoryScore >= reward.requiredPoints
  }

  const handleRewardClick = (reward: any) => {
    setSelectedReward(reward)
  }

  const closeModal = () => setSelectedReward(null)

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center overflow-hidden font-poppins'
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className='items-left fixed top-2 md:top-0 w-screen'>
        <BackBtn navigateTo='/menu' />
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
            className={`w-[150px] h-[150px] rounded-lg shadow-lg relative ${isUnlocked(reward) ? 'hover:scale-105' : ''} transition-transform duration-300`}
          >
            <img
              src={reward.image}
              alt={`${reward.commonName} (${reward.scientificName})`}
              className='w-full h-full object-cover rounded-lg cursor-pointer'
              onClick={() => handleRewardClick(reward)}
            />
            {!isUnlocked(reward) && (
              <div className='absolute inset-0 bg-black bg-opacity-90 rounded-lg flex items-center justify-center'>
                <span className='text-white text-3xl'>🔒</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedReward && (
        <RewardModal
          image={selectedReward.image}
          commonName={selectedReward.commonName}
          scientificName={selectedReward.scientificName}
          description={selectedReward.description}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default Rewards