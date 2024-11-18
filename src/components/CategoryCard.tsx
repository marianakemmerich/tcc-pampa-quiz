import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LevelModal from './LevelModal'

interface CategoryCardProps {
    label: string
    category: string
    image: string
    className?: string
}

const CategoryCard = ({ label, category, image, className }: CategoryCardProps) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedLevel, setSelectedLevel] = useState('easy')
    const navigate = useNavigate()

    const handleStartGame = () => {
        navigate(`/game?category=${category}&level=${selectedLevel}`);
    };

    return (
        <div
            className={`w-[300px] h-[150px] relative cursor-pointer rounded-lg p-4 flex items-center shadow-lg text-center ${className}`}
            onClick={() => setModalOpen(true)}
        >
            <div className='flex items-center w-full'>
                <img src={image} alt={label} className='w-[150px] object-cover rounded-md mr-4' />
                <h3 className='text-lg font-semibold'>{label}</h3>
            </div>

            <LevelModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                onStartGame={handleStartGame}
            />
        </div>
    );
};

export default CategoryCard