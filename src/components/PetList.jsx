import React from 'react'
import PetItem from './PetItem'

export default function PetList({ pets, isCompact }) {
  if (!pets || pets.length === 0) {
    if (isCompact) {
      return <p className="text-gray-500 text-center py-4">Você ainda não cadastrou...</p>
    }
    return <p className="text-gray-500 text-center py-8">Nenhum pet cadastrado.</p>
  }

  const petsToShow = isCompact ? pets : [...pets].reverse()

  return (
    <>
      {petsToShow.map(pet => <PetItem key={pet.id} pet={pet} isCompact={isCompact} />)}
    </>
  )
}
