interface QuestionProps {
    question: string
}

const Question = ({ question }: QuestionProps) => {
  return (
    <div>
        <h2>{question}</h2>
    </div>
  )
}

export default Question