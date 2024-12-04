import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import CategoryCard from '../components/CategoryCard'
import LevelModal from '../components/LevelModal'
import imgFauna from '../assets/icons/fauna-icon.png'
import imgFlora from '../assets/icons/flora-icon.png'
import imgGeral from '../assets/icons/geral-icon.png'

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  // Defina explicitamente o tipo de categoria
  type Category = 'fauna' | 'flora' | 'geral'

  const categoryImages: Record<Category, string> = {
    fauna: imgFauna,
    flora: imgFlora,
    geral: imgGeral
  }

  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('image/cenario.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className="items-left fixed top-2 md:top-0 w-screen">
        <BackButton />
      </header>

      <div className="grid grid-cols-3 gap-4">
        {['fauna', 'flora', 'geral'].map((category, index) => (
          <CategoryCard
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
            category={category}
            image={categoryImages[category as Category]}
            className={['bg-sunshine', 'bg-leafGreen', 'bg-skyBlue'][index]}
            onClick={() => handleCategorySelect(category)}
          />
        ))}
      </div>

      <LevelModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedLevel={selectedLevel ?? ''}
        setSelectedLevel={setSelectedLevel}
        category={selectedCategory ?? ''}
        onStartGame={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    </div>
  )
}

export default Categories