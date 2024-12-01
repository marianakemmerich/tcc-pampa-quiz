interface ProgressBarProps {
  currentQuestionIndex: number
  totalQuestions: number
}

const ProgressBar = ({ currentQuestionIndex, totalQuestions }: ProgressBarProps) => {
  const cappedTotalQuestions = Math.min(totalQuestions, 10)
  const cappedCurrentQuestion = Math.min(currentQuestionIndex + 1, cappedTotalQuestions)
  const progress = (currentQuestionIndex / cappedTotalQuestions) * 100

  return (
    <div className="w-4/5">
      {/* barra de progresso */}
      <div className="bg-gray-300 rounded-full h-4">
        <div
          className="bg-leafGreen h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* contador de perguntas */}
      <div className="text-left text-gray-700 mt-2">
        Pergunta {cappedCurrentQuestion} de {cappedTotalQuestions}
      </div>
    </div>
  )
}

export default ProgressBar