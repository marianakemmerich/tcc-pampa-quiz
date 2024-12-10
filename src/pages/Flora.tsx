import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Question from '../components/Question'
import Alternative from '../components/Alternative'
import Header from '../components/Header'
import NextQuestionButton from '../components/NextQuestionButton'
import NextLevelButton from '../components/NextLevelButton'
import CongratsMessage from '../components/CongratsMessage'

interface Option {
  answer: string
  isCorrect: boolean
}

interface QuestionType {
  id: number
  level: string
  category: string
  question: string
  options: Option[]
}

const Flora = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [points, setPoints] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const level = searchParams.get('level') || 'fácil'
  const category = 'flora'

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)

        const response = await axios.get<QuestionType[]>(`http://localhost:5000/${category}`, { params: { level } })

        if (response.data.length > 0) {
          setQuestions(response.data)
          setQuestionIndex(0)
          setPoints(0)
        } else {
          console.warn('Nenhuma pergunta encontrada para os filtros fornecidos.')
          setQuestions([])
        }
      } catch (error) {
        console.error('Erro ao buscar as perguntas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [level])

  useEffect(() => {
    if (questions.length > 0 && questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex])
      setSelectedAnswer(null)
    } else {
      setCurrentQuestion(null)
    }
  }, [questions, questionIndex])

  const verifyAnswer = (answer: string, isCorrect: boolean) => {
    if (isCorrect) {
      const pointsPerQuestion = level === 'fácil' ? 25 : level === 'médio' ? 75 : 150
      const newPoints = points + pointsPerQuestion
      setPoints(newPoints)

      const currentScores = JSON.parse(localStorage.getItem('scores') || '{}')
      const updatedScores = {
        ...currentScores,
        [category]: {
          ...currentScores[category],
          [level]: Math.max(currentScores[category]?.[level] || 0, newPoints),
        },
      }
      localStorage.setItem('scores', JSON.stringify(updatedScores))
    }
    setSelectedAnswer(answer)

    setTimeout(() => {
      setQuestionIndex((prevIndex) => prevIndex + 1)
    }, 1000)
  }

  const saveScoreAndRedirect = () => {
    const storedScores = JSON.parse(localStorage.getItem('playerScores') || '[]')
    const updatedScores = [points, ...storedScores].slice(0, 5)
    localStorage.setItem('playerScores', JSON.stringify(updatedScores))
    navigate('/score')
  }

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center'
      style={{
        backgroundImage: "url('image/flora-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Header
        level={level}
        currentQuestionIndex={questionIndex}
        totalQuestions={questions.length}
        points={points}
      />

      <div className='mt-20 flex flex-col items-center justify-center'>
        {isLoading ? (
          <p>Carregando perguntas...</p>
        ) : currentQuestion ? (
          <>
            <Question question={currentQuestion.question} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {currentQuestion.options.map((option, index) => (
                <Alternative
                  key={index}
                  option={option}
                  onSelect={(answer, isCorrect) => verifyAnswer(answer, isCorrect)}
                  isDisabled={!!selectedAnswer}
                  selectedAnswer={selectedAnswer}
                />
              ))}
            </div>
            <NextQuestionButton
              onNext={() => setQuestionIndex((prevIndex) => prevIndex + 1)}
              isDisabled={questionIndex >= questions.length - 1}
            />
          </>
        ) : (
          <div className='text-center mt-8'>
            {questions.length === 0 ? (
              <div>
                <p>Sem perguntas disponíveis para esta categoria e nível.</p>
                <button
                  onClick={() => navigate(`/quiz?level=${level}&category=${category}`)}
                  className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  Reiniciar Quiz
                </button>
              </div>
            ) : (
              <div>
                <CongratsMessage />
                <NextLevelButton
                  onNextLevel={() => {
                    const nextLevel = level === 'fácil' ? 'médio' : 'difícil'
                    navigate(`/quiz-${category}?level=${nextLevel}`)
                  }}
                />
                <button
                  onClick={saveScoreAndRedirect}
                  className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                >
                  Ver Pontuações
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Flora