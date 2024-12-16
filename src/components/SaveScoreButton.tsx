import React from 'react'
import html2canvas from 'html2canvas'

interface SaveButtonProps {
  targetRef: React.RefObject<HTMLDivElement>
}

const SaveScoreButton = ({ targetRef }: SaveButtonProps) => {
  const handleSave = async () => {
    if (targetRef.current) {
      const canvas = await html2canvas(targetRef.current)
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = 'pontuacao.png'
      link.click()
    }
  }

  return (
    <button
      onClick={handleSave}
      className='px-4 py-2 w-[250px] h-[60px] text-lg text-white font-bold rounded bg-green-700 hover:bg-green-900'
    >
      Salvar pontuação
    </button>
  )
}

export default SaveScoreButton