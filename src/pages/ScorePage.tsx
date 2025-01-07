import React, { useEffect, useState, useRef } from 'react'
import BackBtn from '../components/BackButton'
import SaveScoreButton from '../components/SaveScoreButton'
import ClearScoreButton from '../components/ClearScoreButton'
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

interface ScoreData {
  [category: string]: {
    [level: string]: number
  }
}

const ScorePage = () => {
  const [scores, setScores] = useState<ScoreData>({})
  const [visitorScores, setVisitorScores] = useState<ScoreData>({})
  const scoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedVisitorScores = JSON.parse(localStorage.getItem('playerScores') || '{}')
    setVisitorScores(storedVisitorScores)

    const handleBeforeUnload = () => {
      localStorage.removeItem('playerScores')
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  useEffect(() => {
    const auth = getAuth()
    const db = getFirestore()

    const fetchScores = async (uid: string) => {
      const scoresRef = collection(db, 'scores')
      const q = query(scoresRef, where('uid', '==', uid))
      const querySnapshot = await getDocs(q)
      const userScores: ScoreData = {}

      querySnapshot.forEach((doc) => {
        const { points, category, level } = doc.data()
        if (!userScores[category]) {
          userScores[category] = {}
        }
        userScores[category][level] = points
      })

      setScores(userScores)
    }

    onAuthStateChanged(auth, (user) => {
      if (user && !user.isAnonymous) {
        localStorage.removeItem('playerScores')
        fetchScores(user.uid)
      } else {
        const storedVisitorScores = JSON.parse(localStorage.getItem('playerScores') || '{}')
        setVisitorScores(storedVisitorScores)
        setScores({})
      }
    })
  }, [])

  const clearScores = async () => {
    const auth = getAuth()
    const db = getFirestore()
  
    const user = auth.currentUser
    if (user) {
      try {
        const scoresRef = collection(db, 'scores')
        const q = query(scoresRef, where('uid', '==', user.uid))
        const querySnapshot = await getDocs(q)
  
        querySnapshot.forEach(async (docSnap) => {
          await deleteDoc(doc(db, 'scores', docSnap.id))
        })
  
        localStorage.removeItem('scores')
        localStorage.removeItem('playerScores')
  
        setScores({})
        setVisitorScores({})
        console.log('Pontuação apagada com sucesso do Firestore e localStorage!')
      } catch (error) {
        console.error('Erro ao deletar pontuação:', error)
        console.log('Erro ao apagar pontuação.')
      }
    } else {
      localStorage.removeItem('scores')
      localStorage.removeItem('playerScores')
  
      setScores({})
      setVisitorScores({})
      console.log('Pontuação apagada do localStorage!')
    }
  }  

  const categoryStyles: { [key: string]: string } = {
    fauna: 'bg-sunshine',
    flora: 'bg-leafGreen',
    geral: 'bg-skyBlue',
  }

  const renderScoreCard = (category: string, level: string, score: number) => (
    <li
      key={`${category}-${level}`}
      className='bg-white p-3 rounded text-black text-lg font-medium'
    >
      {level}: {score || 0} pontos
    </li>
  )

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

      <div className='w-full max-w-6xl flex justify-center gap-8 rounded-lg p-6 text-center'>
        {['fauna', 'flora', 'geral'].map((category) => (
          <div
            key={category}
            className={`flex-1 w-64 p-4 rounded shadow-lg ${categoryStyles[category] || 'bg-gray-500'} mb-4`}
          >
            <h3 className='text-xl font-bold text-white capitalize'>{category}</h3>
            <ul className='space-y-2 mt-3'>
              {['fácil', 'médio', 'difícil'].map((level) => {
                const authenticatedScore = scores[category]?.[level] || 0;
                const visitorScore = visitorScores[category]?.[level] || 0;
                return renderScoreCard(
                  category,
                  level,
                  authenticatedScore || visitorScore
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {Object.keys(scores).length === 0 && Object.keys(visitorScores).length === 0 && (
        <p className='text-white text-lg font-bold'>Nenhuma pontuação salva ainda.</p>
      )}

      <div className='flex items-center justify-center space-x-8 mt-6'>
        <ClearScoreButton onClear={clearScores} />
        <SaveScoreButton targetRef={scoreRef} />
      </div>
    </div>
  )
}

export default ScorePage