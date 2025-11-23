import React, { useEffect, useState } from 'react'

const MOCK_SHOPS = [
  { 
    id: 1, 
    name: 'PetLife Center', 
    rating: 4.9, 
    reviews: 128,
    distance: '0.8 km', 
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['vet', 'banho', 'tosa', 'vacina'],
    phone: '(11) 99999-9999',
    isOpen: true
  },
  { 
    id: 2, 
    name: 'Dr. Patas Clínica', 
    rating: 5.0, 
    reviews: 84,
    distance: '2.4 km', 
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['vet', 'exames'],
    phone: '(11) 88888-8888',
    isOpen: true
  },
  { 
    id: 3, 
    name: 'Spa dos Bichos', 
    rating: 4.7, 
    reviews: 340,
    distance: '1.5 km', 
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    services: ['banho', 'tosa', 'hidratação'],
    phone: '(11) 77777-7777',
    isOpen: false
  },
];

const MOCK_VACCINES = [
  { id: 1, title: 'V10 (Polivalente)', date: '2025-11-20', status: 'pending', dose: '2ª Dose' },
  { id: 2, title: 'Antirrábica', date: '2025-12-15', status: 'pending', dose: 'Anual' },
];

const MOCK_MEDS = [
  { id: 1, title: 'Bravecto', date: '2025-11-25', status: 'pending', type: 'Antipulgas' },
];

function ContactModal({ shop, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl relative border border-slate-100">
        
        <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition">
          <i data-lucide="x" className="w-5 h-5 text-slate-400"></i>
        </button>

        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
          <i data-lucide="phone-call" className="w-8 h-8 text-emerald-600"></i>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800">Contatar Estabelecimento</h3>
        <p className="text-sm text-slate-500 mt-1">{shop.name}</p>

        <div className="my-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
           <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Telefone / WhatsApp</p>
           <p className="text-2xl font-black text-slate-700 tracking-wide">{shop.phone}</p>
        </div>

        <div className="space-y-3">
           <button 
             onClick={() => alert('Redirecionando para WhatsApp (Simulação)...')}
             className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebc57] text-white rounded-xl font-bold text-sm flex items-center justify-center transition-colors shadow-lg shadow-green-100"
           >
             <i data-lucide="message-circle" className="w-5 h-5 mr-2"></i>
             Chamar no WhatsApp
           </button>
           
           <button 
             onClick={() => alert('Iniciando ligação (Simulação)...')}
             className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center transition-colors shadow-lg shadow-slate-200"
           >
             <i data-lucide="phone" className="w-5 h-5 mr-2"></i>
             Ligar Agora
           </button>
        </div>

      </div>
    </div>
  );
}

function SchedulingModal({ shop, onClose }) {
  const [step, setStep] = useState(1); 
  const [selectedService, setSelectedService] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const getLabel = (svc) => {
    const map = { vet: 'Consulta Veterinária', banho: 'Banho Completo', tosa: 'Tosa Higiênica', vacina: 'Aplicação de Vacina', exames: 'Exames Laboratoriais', hidratação: 'Hidratação de Pelos' };
    return map[svc] || svc;
  };

  const handleConfirm = () => {
    setTimeout(() => setStep(3), 500);
  };

  if (step === 3) {
    return (
      <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-sm w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <i data-lucide="check" className="w-10 h-10 text-green-600 stroke-[3]"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Agendado!</h2>
          <p className="text-slate-500 mt-2">Seu horário no <span className="font-bold">{shop.name}</span> foi confirmado.</p>
          <div className="mt-6 p-4 bg-slate-50 rounded-xl text-sm border border-slate-100">
             <p className="font-bold text-slate-700">{getLabel(selectedService)}</p>
             <p className="text-slate-500">Amanhã às {selectedTime}</p>
          </div>
          <button onClick={onClose} className="mt-6 w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition">
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6 shadow-2xl h-[85vh] sm:h-auto flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Agendar Horário</h2>
            <p className="text-sm text-slate-500">{shop.name}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
            <i data-lucide="x" className="w-5 h-5 text-slate-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 pb-4 scrollbar-hide">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">1. Escolha o Serviço</h3>
            <div className="grid grid-cols-2 gap-3">
              {shop.services.map(svc => (
                <button 
                  key={svc}
                  onClick={() => setSelectedService(svc)}
                  className={`p-4 rounded-xl border text-left transition-all ${selectedService === svc ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-emerald-200'}`}
                >
                  <span className="block text-sm font-bold text-slate-700 capitalize">{getLabel(svc)}</span>
                  <span className="text-xs text-slate-400">A partir de R$ 45,00</span>
                </button>
              ))}
            </div>
          </div>

          {selectedService && (
            <div className="animate-fade-in">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">2. Escolha o Horário (Amanhã)</h3>
               <div className="flex flex-wrap gap-2">
                 {['09:00', '10:30', '14:00', '15:30', '17:00'].map(time => (
                   <button
                     key={time}
                     onClick={() => setSelectedTime(time)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${selectedTime === time ? 'bg-slate-800 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                   >
                     {time}
                   </button>
                 ))}
               </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 mt-2">
           <button 
             disabled={!selectedService || !selectedTime}
             onClick={handleConfirm}
             className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${!selectedService || !selectedTime ? 'bg-slate-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 transform hover:-translate-y-1'}`}
           >
             Confirmar Agendamento
           </button>
        </div>
      </div>
    </div>
  );
}

export default function CuidadoContent({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('servicos');
  const [shopToSchedule, setShopToSchedule] = useState(null); 
  const [shopToContact, setShopToContact] = useState(null); 

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [activeTab, shopToSchedule, shopToContact]); 

  const handleScrollToPartners = () => {
    const section = document.getElementById('partners-section');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCall = (shop) => {
    setShopToContact(shop);
  };

  const getServiceIcon = (type) => {
    switch(type) {
      case 'vet': return <i data-lucide="stethoscope" className="w-3 h-3 mr-1"></i>;
      case 'banho': return <i data-lucide="droplets" className="w-3 h-3 mr-1"></i>;
      case 'tosa': return <i data-lucide="scissors" className="w-3 h-3 mr-1"></i>;
      case 'vacina': return <i data-lucide="syringe" className="w-3 h-3 mr-1"></i>;
      default: return <i data-lucide="check" className="w-3 h-3 mr-1"></i>;
    }
  };

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans relative">
      
      <header className="mb-6">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">Central de Cuidado</h1>
        <p className="text-slate-500 text-sm mt-1 font-medium">Saúde, estética e bem-estar.</p>
      </header>

      <div className="flex p-1 bg-white rounded-xl border border-slate-100 mb-6 shadow-sm overflow-x-auto">
        <button onClick={() => setActiveTab('servicos')} className={`flex-1 py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${activeTab === 'servicos' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
          Serviços & Agendar
        </button>
        <button onClick={() => setActiveTab('vacinas')} className={`flex-1 py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${activeTab === 'vacinas' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
          Vacinas
        </button>
        <button onClick={() => setActiveTab('meds')} className={`flex-1 py-2.5 px-2 text-xs sm:text-sm font-bold rounded-lg transition-all whitespace-nowrap ${activeTab === 'meds' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
          Remédios
        </button>
      </div>

      {activeTab === 'servicos' && (
        <div className="space-y-6 animate-fade-in">
           
           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg">Check-up Geral</h3>
                <p className="text-indigo-100 text-xs mt-1 mb-3 max-w-[70%]">Ganhe 10% de desconto na primeira consulta com parceiros.</p>
                <button 
                  onClick={handleScrollToPartners}
                  className="bg-white text-indigo-600 text-xs font-bold px-3 py-2 rounded-lg hover:bg-indigo-50 transition"
                >
                  Ver Parceiros
                </button>
              </div>
              <i data-lucide="heart-pulse" className="absolute -bottom-4 -right-4 w-32 h-32 text-white opacity-10"></i>
           </div>

           <div id="partners-section">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Parceiros Próximos</h3>
              
              <div className="space-y-4">
                {MOCK_SHOPS.map((shop) => (
                  <div key={shop.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                     <div className="flex p-3">
                        <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 relative">
                           <img src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                           {!shop.isOpen && (
                             <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                               <span className="text-white text-[10px] font-bold uppercase">Fechado</span>
                             </div>
                           )}
                        </div>

                        <div className="ml-3 flex-grow flex flex-col justify-between">
                           <div>
                              <div className="flex justify-between items-start">
                                <h4 className="font-bold text-slate-800 text-sm leading-tight">{shop.name}</h4>
                                <span className="flex items-center text-xs font-bold text-amber-500">
                                  <i data-lucide="star" className="w-3 h-3 mr-0.5 fill-amber-500"></i>
                                  {shop.rating}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">{shop.distance} • {shop.reviews} avaliações</p>
                           </div>

                           <div className="flex flex-wrap gap-1 mt-2">
                              {shop.services.map(svc => (
                                <span key={svc} className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-100 capitalize">
                                   {getServiceIcon(svc)}
                                   {svc}
                                </span>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="border-t border-slate-50 p-2 bg-slate-50/50 flex gap-2">
                        <button 
                          onClick={() => setShopToSchedule(shop)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center"
                        >
                          Agendar Horário
                        </button>
                        
                        <button 
                          onClick={() => handleCall(shop)} 
                          className="w-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                          title="Contatar"
                        >
                          <i data-lucide="phone" className="w-4 h-4"></i>
                        </button>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {(activeTab === 'vacinas' || activeTab === 'meds') && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white p-4 rounded-2xl border-l-4 border-orange-400 shadow-sm flex items-start">
             <div className="mr-3 bg-orange-50 p-2 rounded-full">
                <i data-lucide="alert-triangle" className="w-5 h-5 text-orange-500"></i>
             </div>
             <div>
                <h4 className="font-bold text-slate-800 text-sm">Atenção às datas</h4>
                <p className="text-xs text-slate-500 mt-1">Mantenha o cartão de vacina sempre atualizado.</p>
             </div>
          </div>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4">
            {activeTab === 'vacinas' ? 'Cronograma' : 'Histórico'}
          </h3>

          {(activeTab === 'vacinas' ? MOCK_VACCINES : MOCK_MEDS).map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${item.status === 'pending' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                 <i data-lucide={item.status === 'pending' ? 'clock' : 'check-circle-2'} className="w-6 h-6"></i>
              </div>
              <div className="flex-grow">
                 <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                      {item.status === 'pending' ? 'PENDENTE' : 'OK'}
                    </span>
                 </div>
                 <div className="flex items-center mt-1 text-xs text-slate-500">
                    <i data-lucide="calendar" className="w-3 h-3 mr-1"></i>
                    {item.date} • {item.dose || item.type}
                 </div>
              </div>
            </div>
          ))}
          
          <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-emerald-300 hover:text-emerald-600 transition-all flex items-center justify-center mt-4">
            <i data-lucide="plus" className="w-4 h-4 mr-2"></i>
            Adicionar {activeTab === 'vacinas' ? 'Vacina' : 'Medicamento'}
         </button>
        </div>
      )}

      {shopToSchedule && <SchedulingModal shop={shopToSchedule} onClose={() => setShopToSchedule(null)} />}
      {shopToContact && <ContactModal shop={shopToContact} onClose={() => setShopToContact(null)} />}

    </div>
  )
}