import React from 'react'
import { CategoryCardProps } from '../types/CategoryCard'

const CategoryCard = ({ label, category, image, className, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`card ${className} w-[300px] h-[200px] flex items-center p-4 gap-4 rounded-md cursor-pointer`}
    >
      <img src={image} alt={category} className="w-[150px] object-contain" />
      <p className="text-4xl font-bold text-white">{label}</p>
    </div>
  )
}

export default CategoryCard