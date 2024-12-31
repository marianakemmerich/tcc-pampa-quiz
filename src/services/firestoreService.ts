import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

export const saveScoreToFirestore = async (uid: string, points: number) => {
  try {
    const scoresCollection = collection(db, 'scores') // cria a coleção automaticamente
    await addDoc(scoresCollection, {
      uid,
      points,
      timestamp: new Date(),
    })
    console.log('Score saved to Firestore!')
  } catch (error) {
    console.error('Error saving score:', error)
    throw error // opcional para tratar erros no componente chamador
  }
}