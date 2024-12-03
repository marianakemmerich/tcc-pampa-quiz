import React, { useState, useEffect } from "react"
import Question from "../components/Question"
import Alternative from "../components/Alternative"
import ProgressBar from "../components/ProgressBar"
import Score from "../components/Score"
import db from "../data/db.json"

type Nivel = "fácil" | "médio" | "difícil"

interface Option {
  answer: string
  isCorrect: boolean
}

interface QuestionType {
  id: number
  level: Nivel
  category: string
  question: string
  options: Option[]
}

const Flora = () => {
  const [level, setLevel] = useState<Nivel>("fácil")
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [points, setPoints] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)

  const [questions, setQuestions] = useState<QuestionType[]>([])

  useEffect(() => {
    const filteredQuestions = db.flora.filter((p) => p.level === level)
    setQuestions(filteredQuestions as QuestionType[])
    setQuestionIndex(0)
    setPoints(0)
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
      setPoints(points + 1)
    }
    setSelectedAnswer(answer)
    setQuestionIndex(questionIndex + 1)
  }

  return (
    <div
      className="w-screen h-screen items-center justify-center flex flex-col"
      style={{
        backgroundImage: "url('image/flora-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 left-0 w-full px-4 bg-pink-300 h-[100px] z-50 flex flex-col items-center justify-center">
        {/* barra de progresso */}
        <ProgressBar
          currentQuestionIndex={questionIndex}
          totalQuestions={questions.length}
        />
        {/* pontuação */}
        <Score points={points} />
      </div>

      {currentQuestion ? (
        <>
          <Question question={currentQuestion.question} />
          {currentQuestion.options.map((option, index) => (
            <Alternative
              key={index}
              option={option}
              onSelect={(answer, isCorrect) => verifyAnswer(answer, isCorrect)}
              isDisabled={!!selectedAnswer}
              selectedAnswer={selectedAnswer}
            />
          ))}
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
        <div>{questions.length === 0 ? "Sem perguntas disponíveis." : "Carregando..."}</div>
      )}
    </div>
  )
}

export default Flora