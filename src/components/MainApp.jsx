import React, { useEffect } from 'react'
import HomeContent from '../pages/HomeContent'
import PetsContent from '../pages/PetsContent'
import AddPetContent from '../pages/AddPetContent'
import MercadoContent from '../pages/MercadoContent'
import CuidadoContent from '../pages/CuidadoContent'
import AccountContent from '../pages/AccountContent'
import NavBar from './NavBar'

export default function MainApp(props) {
  const { 
    user, 
    pets, 
    currentPage, 
    onNavigate, 
    onLogout, 
    onAddPet, 
    preSelectedPetId, 
    onClearPreSelection, 
    onLocationUpdate,
    onDeletePet, 
    onUpdatePet  
  } = props

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [currentPage, pets]);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomeContent 
          user={user} 
          pets={pets} 
          onNavigate={onNavigate} 
          preSelectedPetId={preSelectedPetId} 
          onClearPreSelection={onClearPreSelection} 
          onLocationUpdate={onLocationUpdate} 
        />
      case 'pets':
        return <PetsContent 
          pets={pets} 
          onNavigate={onNavigate} 
          onDeletePet={onDeletePet} 
          onUpdatePet={onUpdatePet} 
        />
      case 'addPet':
        return <AddPetContent onAddPet={onAddPet} />
      case 'mercado':
        return <MercadoContent onNavigate={onNavigate} />
      case 'cuidado':
        return <CuidadoContent onNavigate={onNavigate} />
      case 'account':
        return <AccountContent user={user} onLogout={onLogout} />
      default:
        return <HomeContent user={user} pets={pets} onNavigate={onNavigate} preSelectedPetId={preSelectedPetId} onClearPreSelection={onClearPreSelection} />
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative overflow-hidden">
      
      <main className="flex-1 overflow-y-auto scrollbar-hide w-full bg-slate-50 overscroll-contain">
        {renderContent()}
      </main>

      <div className="flex-none z-50 w-full bg-white border-t border-slate-100">
        <NavBar currentPage={currentPage} onNavigate={onNavigate} />
      </div>
    </div>
  )
}