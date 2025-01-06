import React from 'react'
import ExitBtn from '../assets/icons/exit.svg'

interface RewardModalProps {
  image: string
  commonName: string
  scientificName: string
  description: string
  onClose: () => void
}

const RewardModal = ({
  image,
  commonName,
  scientificName,
  description,
  onClose,
}: RewardModalProps) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
      <div className='relative w-[400px] h-[600px] rounded-lg overflow-hidden shadow-lg cursor-pointer'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-xl text-gray-100 hover:text-white z-10'
        >
          <img src={ExitBtn} alt='sair' className='w-[30px] h-[30px]'/>
        </button>

        <div className='relative w-full h-full'>
          <img
            src={image}
            alt={commonName}
            className='w-full h-full object-cover rounded-lg'
          />
          <div className='absolute inset-0 bg-leafGreen bg-opacity-75 text-white text-center p-4 flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
            <h2 className='text-3xl font-bold mb-2'>{commonName}</h2>
            <p className='italic text-lg mb-4'>{scientificName}</p>
            <p className='text-lg'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RewardModal