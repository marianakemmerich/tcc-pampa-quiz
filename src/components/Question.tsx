interface QuestionProps {
    question: string
}

const Question = ({ question }: QuestionProps) => {
  return (
    <div>
        <h2 className="text-xl font-bold mb-12">{question}</h2>
    </div>
  )
}

export default Question