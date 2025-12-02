import React, { useEffect, useState } from 'react'

function EditPetModal({ pet, onClose, onSave }) {
  const [name, setName] = useState(pet.name);
  const [weight, setWeight] = useState(pet.weight || '');
  const [age, setAge] = useState(pet.age || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(pet._id, { 
      name, 
      weight: parseFloat(weight), 
      age: parseInt(age) 
    });
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-2xl relative animate-scale-up">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500">
          <i data-lucide="x" className="w-4 h-4"></i>
        </button>
        
        <h2 className="text-xl font-bold text-slate-800 mb-6">Editar Pet</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase">Nome</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700 outline-none focus:border-emerald-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Idade (Anos)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700 outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">Peso (kg)</label>
              <input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700 outline-none focus:border-emerald-500" />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all mt-2">
            {loading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PetsContent({ pets, onNavigate, onDeletePet, onUpdatePet }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpenId, setMenuOpenId] = useState(null); 
  const [petToEdit, setPetToEdit] = useState(null);   

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [pets, searchTerm, menuOpenId]);

  const toggleMenu = (id) => {
    if (menuOpenId === id) setMenuOpenId(null);
    else setMenuOpenId(id);
  };

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pet.breed && pet.breed.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPetImage = (pet) => {
    const isDog = pet.type === 'dog' || pet.type === 'Cachorro';
    const defaultDogImg = "https://cdn-icons-png.flaticon.com/512/194/194630.png";
    const defaultCatImg = "https://i.ibb.co/G4r8NWvY/cat.png";
    return pet.photoUrl || (isDog ? defaultDogImg : defaultCatImg);
  };

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans relative" onClick={() => setMenuOpenId(null)}>
      
      <header className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Meus Pets</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">{pets.length} amigos cadastrados</p>
        </div>
        <button 
          onClick={() => onNavigate('addPet')}
          className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-200 flex items-center justify-center transition-all transform hover:scale-105"
        >
          <i data-lucide="plus" className="w-6 h-6"></i>
        </button>
      </header>

      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i data-lucide="search" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
        </div>
        <input
          type="text"
          placeholder="Buscar por nome ou raça..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none shadow-sm transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div 
              key={pet._id} 
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center transition-all hover:shadow-md hover:border-emerald-100 group relative"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center flex-shrink-0 border border-slate-100 mr-4 group-hover:bg-emerald-50 transition-colors">
                <img src={getPetImage(pet)} alt={pet.name} className="w-10 h-10 object-contain drop-shadow-sm" />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight">{pet.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{pet.breed || 'Sem raça definida'}</p>
                  </div>
                  
                  <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => toggleMenu(pet._id)}
                      className="text-slate-300 hover:text-emerald-500 transition-colors p-1 rounded-full hover:bg-slate-50"
                    >
                      <i data-lucide="more-vertical" className="w-5 h-5"></i>
                    </button>

                    {menuOpenId === pet._id && (
                      <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl border border-slate-100 w-32 z-10 overflow-hidden animate-fade-in">
                         <button 
                            onClick={() => { setPetToEdit(pet); setMenuOpenId(null); }}
                            className="w-full text-left px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 flex items-center font-medium"
                         >
                            <i data-lucide="edit-2" className="w-4 h-4 mr-2 text-emerald-500"></i> Editar
                         </button>
                         <button 
                            onClick={() => { onDeletePet(pet._id); setMenuOpenId(null); }}
                            className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 flex items-center font-medium border-t border-slate-50"
                         >
                            <i data-lucide="trash-2" className="w-4 h-4 mr-2"></i> Remover
                         </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center mt-3 space-x-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                    <i data-lucide="calendar" className="w-3 h-3 mr-1"></i>
                    {pet.age} anos
                  </span>
                  {pet.weight && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-orange-50 text-orange-700">
                      <i data-lucide="scale" className="w-3 h-3 mr-1"></i>
                      {pet.weight} kg
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i data-lucide="search-x" className="w-8 h-8 text-slate-400"></i>
            </div>
            <h3 className="text-slate-900 font-medium">Nenhum pet encontrado</h3>
          </div>
        )}
      </div>

      {pets.length > 0 && (
        <div className="mt-8 p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-lg shadow-emerald-200 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-10 -translate-y-10 blur-xl"></div>
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">Lembrete de Saúde</p>
              <h3 className="text-xl font-bold">Carteira de Vacinação</h3>
              <p className="text-emerald-50 text-sm mt-2 opacity-90">Mantenha as vacinas em dia.</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <i data-lucide="syringe" className="w-6 h-6 text-white"></i>
            </div>
          </div>
          <button onClick={() => onNavigate('cuidado')} className="mt-4 w-full py-2 bg-white text-emerald-600 rounded-xl text-sm font-bold hover:bg-emerald-50 transition-colors shadow-sm">
            Ver Calendário
          </button>
        </div>
      )}

      {petToEdit && (
        <EditPetModal 
          pet={petToEdit} 
          onClose={() => setPetToEdit(null)} 
          onSave={onUpdatePet} 
        />
      )}

    </div>
  )
}