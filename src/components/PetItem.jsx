import React, { useState } from 'react'

export default function PetItem({ pet, isCompact }) {
  const [isExpanded, setIsExpanded] = useState(!isCompact);

  const isDog = pet.type === 'dog' || pet.type === 'Cachorro';
  
  const defaultDogImg = "https://cdn-icons-png.flaticon.com/512/91/91544.png";
  const defaultCatImg = "https://cdn-icons-png.flaticon.com/512/616/616430.png";
  
  const imageSrc = pet.photoUrl || (isDog ? defaultDogImg : defaultCatImg);

  const handleClick = () => {
    if (!isCompact) setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`
        bg-white p-4 rounded-xl border transition-all duration-200 mb-3
        ${isCompact ? 'cursor-default' : 'cursor-pointer hover:shadow-md hover:border-cyan-200'}
        ${isExpanded ? 'shadow-md border-cyan-100' : 'shadow-sm border-gray-100'}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-4">
        
        <div className={`
          p-2 rounded-full flex-shrink-0 transition-colors
          ${isDog ? 'bg-orange-50' : 'bg-indigo-50'}
        `}>
          <img 
            src={imageSrc} 
            alt={pet.type} 
            className="w-10 h-10 object-contain" 
          />
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800 leading-tight">{pet.name}</h3>
            
            {!isCompact && (
               <span className="text-gray-300 text-xs">
                 {isExpanded ? '▼' : '▶'}
               </span>
            )}
          </div>

          {!isExpanded ? (
            <p className="text-sm text-gray-500 font-medium mt-1">
              {pet.breed || 'Raça não informada'}
            </p>
          ) : (
            <div className="mt-3 space-y-1 border-t border-gray-100 pt-2 animate-fade-in">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Raça:</span>
                <span className="font-medium text-gray-700">{pet.breed || '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Idade:</span>
                <span className="font-medium text-gray-700">{pet.age ? `${pet.age} anos` : '-'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Peso:</span>
                <span className="font-medium text-gray-700">{pet.weight ? `${pet.weight} kg` : '-'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}