import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Question from '../components/Question'
import Alternative from '../components/Alternative'
import Header from '../components/Header'
import NextQuestionButton from '../components/NextQuestionButton'
import NextLevelButton from '../components/NextLevelButton'
import CongratsMessage from '../components/CongratsMessage'
import CorrectAnswer from '../components/CorrectAnswer'
import WrongAnswer from '../components/WrongAnswer'
import RestartQuizButton from '../components/RestartButton'
import ViewScoresButton from '../components/ScoreButton'

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

const Fauna = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [points, setPoints] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false)
  const [showWrongAnswer, setShowWrongAnswer] = useState(false)

  const level = searchParams.get('level') || 'fácil'
  const category = searchParams.get('category') || 'fauna'

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true)
        const endpoint = `http://localhost:5000/${category}`
        const response = await axios.get<QuestionType[]>(endpoint, { params: { level } })

        if (response.data.length > 0) {
          setQuestions(response.data)
          setQuestionIndex(0)
          setPoints(0)
        } else {
          setQuestions([])
        }
      } catch (error) {
        console.error('Erro ao buscar as perguntas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuestions()
  }, [category, level])

  useEffect(() => {
    if (questions.length > 0 && questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex])
      setSelectedAnswer(null)
    } else {
      setCurrentQuestion(null)
    }
  }, [questions, questionIndex])

  const verifyAnswer = (answer: string, isCorrect: boolean) => {
    setSelectedAnswer(answer)

    if (isCorrect) {
      setShowCorrectAnswer(true)
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
    } else {
      setShowWrongAnswer(true)
    }

    setTimeout(() => {
      setShowCorrectAnswer(false)
      setShowWrongAnswer(false)
      setQuestionIndex((prevIndex) => prevIndex + 1)
    }, 1500)
  }

  const saveScoreAndRedirect = () => {
    const storedScores = JSON.parse(localStorage.getItem('playerScores') || '[]')
    const updatedScores = [points, ...storedScores].slice(0, 5)
    localStorage.setItem('playerScores', JSON.stringify(updatedScores))
    navigate('/score')
  }

  const resetQuiz = () => {
    setQuestionIndex(0)
    setPoints(0)
    setSelectedAnswer(null)
  }  

  const isQuizCompleted = questionIndex >= questions.length;

  return (
    <div
      className='w-screen h-screen flex flex-col items-center justify-center'
      style={{
        backgroundImage: "url('image/fauna-bg.png')",
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
        {showCorrectAnswer && <CorrectAnswer />}
        {showWrongAnswer && <WrongAnswer />}
        {isLoading ? (
          <p>Carregando perguntas...</p>
        ) : currentQuestion ? (
          <>
            <Question question={currentQuestion.question} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
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
            {!isQuizCompleted && (
              <NextQuestionButton
                onNext={() => setQuestionIndex((prevIndex) => prevIndex + 1)}
                isDisabled={questionIndex >= questions.length - 1}
              />
            )}
          </>
        ) : (
          <div className='text-center mt-8 p-4'>
            {isQuizCompleted ? (
              <div className='flex flex-col items-center gap-4'>
                <CongratsMessage />
                <RestartQuizButton onClick={resetQuiz} />
                <div className='flex gap-4 mt-4'>
                  <NextLevelButton
                    onNextLevel={() => {
                      const nextLevel = level === 'fácil' ? 'médio' : 'difícil'
                      navigate(`/quiz-${category}?level=${nextLevel}`)
                    }}
                  />
                  <ViewScoresButton onClick={saveScoreAndRedirect} />
                </div>
              </div>
            ) : (
              <div>
                <p>Sem perguntas disponíveis para esta categoria e nível.</p>
                <RestartQuizButton onClick={resetQuiz} />
              </div>
            )}
          </div>

        )}
      </div>
    </div>
  )
}

export default Fauna