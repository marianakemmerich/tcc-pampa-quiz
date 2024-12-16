interface QuestionProps {
  question: string;
  category: 'fauna' | 'flora' | 'geral'
}

const Question = ({ question, category }: QuestionProps) => {
  const categoryColor = {
    fauna: 'text-yellow-900',
    flora: 'text-green-950',
    geral: 'text-blue-950',
  }

  return (
    <div className="w-full flex items-center justify-center mt-8 mb-2">
      <div className="mx-8 p-4">
        <h2 className={`text-xl font-bold text-center ${categoryColor[category]}`}>
          {question}
        </h2>
      </div>
    </div>
  )
}

export default Question