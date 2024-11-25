import React, { useState, useEffect } from "react"
import Question from '../components/Question'
import Alternative from '../components/Alternative'
import ProgressBar from '../components/ProgressBar'
import Score from '../components/Score'
import db from '../data/db.json'

type Categoria = "fauna" | "flora" | "geral"
type Nivel = "fácil" | "médio" | "difícil"

interface Option {
  answer: string
  isCorrect: boolean
}

interface QuestionType {
  id: number
  level: Nivel
  category: Categoria
  question: string
  options: Option[]
}

const Game = () => {
  const [category, setCategory] = useState<Categoria>("fauna")
  const [level, setLevel] = useState<Nivel>("fácil")
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [points, setPoints] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)

  const [questions, setQuestions] = useState<QuestionType[]>([])

  // carrega as perguntas sempre que a categoria ou nível mudar
  useEffect(() => {
    const filteredQuestions = db[category].filter((p) => p.level === level)
    
    setQuestions(filteredQuestions as QuestionType[])
    setQuestionIndex(0) // reinicia o índice da pergunta
    setPoints(0) // reseta a pontuação quando mudar a categoria ou nível
  }, [category, level])

  // atualiza a pergunta atual com base no índice
  useEffect(() => {
    if (questions.length > 0 && questionIndex < questions.length) {
      setCurrentQuestion(questions[questionIndex])
    }
  }, [questions, questionIndex])

  const verifyAnswer = (alternative: string) => {
    if (currentQuestion) {
      const correctAnswer = currentQuestion.options.find(
        (option) => option.isCorrect
      );
      if (correctAnswer?.answer === alternative) {
        setPoints(points + 1)
      }
    }
    setSelectedAnswer(alternative)
    setQuestionIndex(questionIndex + 1)
  }

  return (
    <div className="w-screen h-screen items-center justify-center flex flex-col"
      style={{
        backgroundImage: "url('image/fauna-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      <div className="fixed top-0 left-0 w-full px-4 bg-pink-300 h-[100px] z-50 flex flex-col items-center justify-center">
        {/* exibe a barra de progresso */}
        <ProgressBar currentQuestionIndex={questionIndex} totalQuestions={questions.length} />
        {/* exibe a pontuação */}
        <Score points={points} />
      </div>

      {currentQuestion ? (
        <>
          <Question question={currentQuestion.question} />
          <Alternative
            options={currentQuestion.options}
            onSelect={verifyAnswer}
          />
          {selectedAnswer && (
            <div>
              {selectedAnswer ===
                currentQuestion.options.find((option) => option.isCorrect)?.answer
                ? "Resposta correta!"
                : "Resposta errada!"}
            </div>
          )}
        </>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  )
}

export default Game