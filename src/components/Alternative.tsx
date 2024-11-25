import {useState} from 'react'

interface Alternative {
    answer: string
    isCorrect: boolean
}

interface AlternativeProps {
    options: Alternative[]
    onSelect: (correctAnswer: string) => void
}

const Alternative = ({ options, onSelect }: AlternativeProps) => {
    const [answerStatus, setAnswerStatus] = useState<string | null>(null)
    const [feedback, setFeedback] = useState<string | null>(null)

    const handleAnswer = (answer: string, isCorrect: boolean) => {
        onSelect(answer)

        setAnswerStatus(answer)
        setFeedback(isCorrect ? "correta" : "incorreta");
    }

  return (
    <div>
        {options.map((opcao, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(opcao.answer, opcao.isCorrect)}
          className={`alternativa-btn w-full p-4 text-lg rounded-md my-2 
            ${feedback === "correta" && answerStatus === opcao.answer ? "bg-green-500" : ""}
            ${feedback === "incorreta" && answerStatus === opcao.answer ? "bg-red-500" : ""}
            ${feedback ? "cursor-not-allowed" : ""}
          `}
          disabled={!!feedback}
        >
          {opcao.answer}
        </button>
      ))}
    </div>
  )
}

export default Alternative