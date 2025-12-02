import React, { useEffect, useState } from 'react';
import { DOG_BREEDS, CAT_BREEDS } from '../utils/petBreeds';

export default function AddPetContent({ onAddPet }) {
  const [type, setType] = useState(''); 
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const defaultDogImg = "https://cdn-icons-png.flaticon.com/512/91/91544.png";
  const defaultCatImg = "https://i.ibb.co/G4r8NWvY/cat.png";

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [type]);

  const handleTypeChange = (newType) => {
    setType(newType);
    setBreed(''); 
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setError('');

    if (!name || !weight || !breed || !age || !type) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    const petData = {
      name,
      weight: parseFloat(weight),
      breed,
      age: parseInt(age),
      type: type === 'dog' ? 'Cachorro' : 'Gato', 
      photoUrl: type === 'dog' ? defaultDogImg : defaultCatImg
    };

    onAddPet(petData);
    
    setName(''); setWeight(''); setBreed(''); setAge(''); setType('');
  };

  const getButtonClass = (buttonType) => {
    const base = 'flex-1 p-4 flex flex-col items-center justify-center border rounded-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden';
    
    if (type === buttonType) {
      return `${base} bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md ring-1 ring-emerald-500`;
    }
    return `${base} bg-white border-slate-200 text-slate-500 hover:border-emerald-200 hover:bg-slate-50 hover:shadow-sm`;
  };

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans">
      
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Novo Pet</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Preencha os dados para criar o RG digital.</p>
      </header>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        
        <form id="add-pet-form" className="space-y-6" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Espécie</label>
            <div className="flex space-x-4">
              
              <button type="button" onClick={() => handleTypeChange('dog')} className={getButtonClass('dog')}>
                <div className={`p-3 rounded-full mb-2 transition-colors ${type === 'dog' ? 'bg-emerald-200/50' : 'bg-slate-100 group-hover:bg-emerald-50'}`}>
                  <img src={defaultDogImg} className="w-8 h-8 object-contain opacity-90" alt="Cachorro" />
                </div>
                <span className="font-bold text-sm">Cachorro</span>
                {type === 'dog' && <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>}
              </button>
              
              <button type="button" onClick={() => handleTypeChange('cat')} className={getButtonClass('cat')}>
                <div className={`p-3 rounded-full mb-2 transition-colors ${type === 'cat' ? 'bg-emerald-200/50' : 'bg-slate-100 group-hover:bg-emerald-50'}`}>
                  <img src={defaultCatImg} className="w-8 h-8 object-contain opacity-90" alt="Gato" />
                </div>
                <span className="font-bold text-sm">Gato</span>
                {type === 'cat' && <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>}
              </button>

            </div>
          </div>

          <div className="space-y-5">
            
            <div className="relative group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nome</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <i data-lucide="tag" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                </div>
                <input 
                  type="text" 
                  placeholder="Ex: Thor" 
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                  value={name} 
                  onChange={ev => setName(ev.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Raça</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <i data-lucide="search" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                </div>
                <select 
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium disabled:opacity-50 appearance-none"
                  value={breed}
                  onChange={ev => setBreed(ev.target.value)}
                  disabled={!type} 
                  required
                >
                  <option value="" disabled>
                    {!type ? 'Selecione a espécie acima primeiro' : 'Selecione a raça...'}
                  </option>
                  
                  {type === 'dog' && DOG_BREEDS.map((raca) => (
                    <option key={raca} value={raca}>{raca}</option>
                  ))}
                  
                  {type === 'cat' && CAT_BREEDS.map((raca) => (
                    <option key={raca} value={raca}>{raca}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                   <i data-lucide="chevron-down" className="h-5 w-5 text-slate-400"></i>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Idade (Anos)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <i data-lucide="calendar" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                  </div>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                    value={age} 
                    onChange={ev => setAge(ev.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Peso (kg)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <i data-lucide="scale" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
                  </div>
                  <input 
                    type="number" 
                    step="0.1" 
                    placeholder="0.0" 
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                    value={weight} 
                    onChange={ev => setWeight(ev.target.value)} 
                    required 
                  />
                </div>
              </div>
            </div>

          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center animate-pulse">
              <i data-lucide="alert-circle" className="w-4 h-4 mr-2"></i>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5"
          >
            Salvar e Rastrear
          </button>
        </form>
      </div>
    </div>
  );
}