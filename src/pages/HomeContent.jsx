import React, { useEffect, useState } from 'react'
import PetList from '../components/PetList'
import PetMap from '../components/Map/PetMap'

function PetSelectorItem({ pet, isSelected, onClick }) {
  const isDog = pet.type === 'dog' || pet.type === 'Cachorro';
  const defaultDogImg = "https://cdn-icons-png.flaticon.com/512/194/194630.png"; 
  const defaultCatImg = "https://cdn-icons-png.flaticon.com/512/616/616430.png"; 
  
  const imageSrc = pet.photoUrl || (isDog ? defaultDogImg : defaultCatImg);

  return (
    <button 
      onClick={onClick} 
      className={`
        group relative flex flex-col items-center justify-center p-2 w-20 h-24 mr-3 rounded-2xl transition-all duration-300 ease-out
        ${isSelected 
          ? 'bg-white ring-2 ring-emerald-500 shadow-lg scale-105 z-10' 
          : 'bg-white border border-slate-100 hover:border-emerald-200 hover:shadow-md opacity-90'
        }
      `}
    >
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
        ${isSelected ? 'bg-emerald-50' : 'bg-slate-50 group-hover:bg-emerald-50'}
      `}>
        <img src={imageSrc} alt={pet.name} className="w-8 h-8 object-contain drop-shadow-sm" />
      </div>
      
      <span className={`
        text-xs font-bold truncate w-full text-center transition-colors
        ${isSelected ? 'text-emerald-700' : 'text-slate-500 group-hover:text-emerald-600'}
      `}>
        {pet.name}
      </span>
      
      {isSelected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
          <i data-lucide="check" className="w-2.5 h-2.5 text-white stroke-[3]"></i>
        </div>
      )}
    </button>
  )
}

export default function HomeContent({ user, pets, onNavigate, preSelectedPetId, onClearPreSelection, onLocationUpdate }) {
  const welcomeName = user.name ? user.name.split(' ')[0] : 'Usuário';
  const [selectedPetId, setSelectedPetId] = useState(null);

  useEffect(() => {
    if (preSelectedPetId && pets.find(p => p._id === preSelectedPetId)) {
      setSelectedPetId(preSelectedPetId);
      onClearPreSelection();
    } else if (pets.length > 0 && (!selectedPetId || !pets.find(p => p._id === selectedPetId))) {
      setSelectedPetId(pets[0]._id);
    } else if (pets.length === 0) {
      setSelectedPetId(null);
    }
  }, [pets, preSelectedPetId, onClearPreSelection, selectedPetId]);

  const selectedPet = pets.find(p => p._id === selectedPetId);

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans">
      
      <header className="flex justify-between items-end mb-8">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">Bem-vindo de volta,</p>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">{welcomeName}</h1>
        </div>
        
        <button 
          onClick={() => onNavigate('account')} 
          className="w-16 h-16 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:rotate-3 focus:outline-none"
          title="Ir para minha conta"
        >
          <img 
            src="https://i.ibb.co/DDr5XWQB/Chat-GPT-Image-3-de-nov-de-2025-21-35-56.png" 
            alt="Patrulha Animal Logo" 
            className="w-full h-full object-contain drop-shadow-md" 
          />
        </button>
      </header>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-lg font-bold text-slate-800">Meus Pets</h2>
          <button 
            onClick={() => onNavigate('addPet')} 
            className="text-emerald-600 text-sm font-bold hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors hover:bg-emerald-100"
          >
            + Novo Pet
          </button>
        </div>
        
        {pets.length > 0 ? (
           <div className="bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
             <PetList pets={pets.slice(0,3)} isCompact={true} />
           </div>
        ) : (
           <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
             <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <i data-lucide="plus" className="text-slate-400"></i>
             </div>
             <p className="text-slate-500 text-sm font-medium">Nenhum pet cadastrado ainda.</p>
           </div>
        )}
      </section>

      <section>
        <div className="flex items-center mb-4 px-1">
           <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">
             <i data-lucide="map-pin" className="w-5 h-5"></i>
           </div>
           <div>
             <h2 className="text-lg font-bold text-slate-800 leading-none">Rastreamento</h2>
             <p className="text-xs text-slate-500 font-medium mt-1">Tempo Real</p>
           </div>
        </div>

        {pets.length > 0 && (
          <div className="flex overflow-x-auto pb-6 pt-2 px-1 scrollbar-hide clip-none">
            {pets.map(pet => (
              <PetSelectorItem 
                key={pet._id} 
                pet={pet} 
                isSelected={pet._id === selectedPetId} 
                onClick={() => setSelectedPetId(pet._id)} 
              />
            ))}
          </div>
        )}

        {pets.length > 0 ? (
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-100 bg-slate-200">
               <PetMap 
                  pets={pets} 
                  selectedPetId={selectedPetId} 
                  onLocationUpdate={onLocationUpdate} 
               />
            </div>
            
            {selectedPet && (
              <div className="mt-4 bg-white rounded-2xl p-5 shadow-lg border border-slate-100">
                 <div className="flex justify-between items-start">
                    <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Localização Atual</p>
                       <h3 className="text-lg font-bold text-slate-800">
                         Perto de <span className="text-emerald-600">Campina Grande, PB</span>
                       </h3>
                       <p className="text-xs text-slate-400 mt-1">Atualizado agora mesmo</p>
                    </div>
                    <div className="bg-green-100 px-3 py-1 rounded-full flex items-center">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                       <span className="text-green-700 text-xs font-bold">Online</span>
                    </div>
                 </div>
                 
                 <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-500 bg-slate-50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                    <i data-lucide="info" className="w-4 h-4 mr-2 text-emerald-500"></i>
                    Toque no mapa para simular movimento.
                 </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 bg-white rounded-3xl flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-200 shadow-sm">
            <i data-lucide="navigation" className="w-10 h-10 mb-2 opacity-30"></i>
            <p className="text-sm font-medium text-slate-400">Cadastre um pet para rastrear</p>
          </div>
        )}
      </section>
    </div>
  )
}