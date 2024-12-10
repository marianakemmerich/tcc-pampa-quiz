interface QuestionProps {
  question: string
}

const Question = ({ question }: QuestionProps) => {
  return (
    <div className="w-full flex items-center justify-center mt-8 mb-2">
      <div className="w-2/3 p-4">
        <h2 className="text-xl text-white font-bold text-center">{question}</h2>
      </div>    
    </div>
  )
}

export default Question