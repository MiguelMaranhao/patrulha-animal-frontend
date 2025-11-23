import React, { useEffect, useState, useRef } from 'react'

const MOCK_ADDRESSES = [
  { id: 1, label: 'Casa', street: 'Rua das Flores, 123', city: 'Campina Grande - PB', active: true },
  { id: 2, label: 'Trabalho', street: 'Av. Canal, 880', city: 'Campina Grande - PB', active: false },
];

const MOCK_CARDS = [
  { id: 1, brand: 'mastercard', number: '•••• •••• •••• 8829', holder: 'JUNIOR SILVA', expiry: '12/28' },
  { id: 2, brand: 'visa', number: '•••• •••• •••• 1024', holder: 'JUNIOR SILVA', expiry: '09/26' },
];

function ProfileView({ user, onBack }) {
  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans animate-slide-in-right">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 mr-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-600 shadow-sm transition-all">
          <i data-lucide="arrow-left" className="w-5 h-5"></i>
        </button>
        <h2 className="text-xl font-bold text-slate-800">Dados Pessoais</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
        <div className="relative group">
           <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Nome Completo</label>
           <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 px-4 py-3 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <i data-lucide="user" className="w-5 h-5 text-slate-400 mr-3"></i>
              <input type="text" defaultValue={user?.name} className="bg-transparent w-full outline-none text-slate-700 font-bold" />
           </div>
        </div>

        <div className="relative group">
           <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">E-mail</label>
           <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 px-4 py-3 opacity-70">
              <i data-lucide="mail" className="w-5 h-5 text-slate-400 mr-3"></i>
              <input type="email" defaultValue={user?.email} disabled className="bg-transparent w-full outline-none text-slate-500 font-medium cursor-not-allowed" />
           </div>
           <p className="text-[10px] text-slate-400 mt-1 ml-1">O e-mail não pode ser alterado.</p>
        </div>

        <div className="relative group">
           <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Telefone / WhatsApp</label>
           <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 px-4 py-3 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <i data-lucide="phone" className="w-5 h-5 text-slate-400 mr-3"></i>
              <input type="tel" defaultValue="(83) 99999-9999" className="bg-transparent w-full outline-none text-slate-700 font-bold" />
           </div>
        </div>

        <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-200 transition-all transform active:scale-95">
          Salvar Alterações
        </button>
      </div>
    </div>
  )
}

function AddressView({ onBack }) {
  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans animate-slide-in-right">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 mr-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-600 shadow-sm transition-all">
            <i data-lucide="arrow-left" className="w-5 h-5"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-800">Meus Endereços</h2>
        </div>
        <button className="flex items-center bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors">
          <i data-lucide="plus" className="w-4 h-4 mr-1"></i>
          Novo
        </button>
      </div>

      <div className="space-y-3">
        {MOCK_ADDRESSES.map(addr => (
          <div key={addr.id} className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${addr.active ? 'bg-white border-emerald-500 ring-1 ring-emerald-500 shadow-sm' : 'bg-white border-slate-100'}`}>
             <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${addr.active ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                   <i data-lucide="map-pin" className="w-5 h-5"></i>
                </div>
                <div>
                   <p className="font-bold text-slate-800 text-sm">{addr.label}</p>
                   <p className="text-xs text-slate-500">{addr.street}</p>
                   <p className="text-xs text-slate-400">{addr.city}</p>
                </div>
             </div>
             {addr.active && <i data-lucide="check-circle" className="w-5 h-5 text-emerald-500"></i>}
          </div>
        ))}
      </div>
    </div>
  )
}

function PaymentView({ onBack }) {
  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans animate-slide-in-right">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 mr-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-600 shadow-sm transition-all">
            <i data-lucide="arrow-left" className="w-5 h-5"></i>
          </button>
          <h2 className="text-xl font-bold text-slate-800">Pagamentos</h2>
        </div>
        
        <button className="flex items-center bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors">
          <i data-lucide="plus" className="w-4 h-4 mr-1"></i>
          Cartão
        </button>
      </div>

      <div className="w-full h-48 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white shadow-xl shadow-slate-300 mb-8 relative overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
         <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
         <div className="flex justify-between items-start mb-8">
            <i data-lucide="credit-card" className="w-8 h-8 text-slate-300"></i>
            <span className="font-mono text-lg italic font-bold opacity-80">mastercard</span>
         </div>
         <p className="font-mono text-xl tracking-widest mb-1 shadow-black drop-shadow-md">•••• •••• •••• 8829</p>
         <div className="flex justify-between items-end mt-4">
            <div>
               <p className="text-[10px] uppercase text-slate-400 tracking-wider">Titular</p>
               <p className="font-bold text-sm tracking-wide">JUNIOR SILVA</p>
            </div>
            <div>
               <p className="text-[10px] uppercase text-slate-400 tracking-wider">Validade</p>
               <p className="font-bold text-sm">12/28</p>
            </div>
         </div>
      </div>

      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Cartões Salvos</h3>
      <div className="space-y-3">
        {MOCK_CARDS.map(card => (
          <div key={card.id} className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
             <div className="flex items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mr-3 border border-slate-200">
                   <i data-lucide="credit-card" className="w-5 h-5 text-slate-600"></i>
                </div>
                <div>
                   <p className="font-bold text-slate-800 text-sm capitalize">{card.brand} •••• {card.number.slice(-4)}</p>
                   <p className="text-xs text-slate-400">Expira em {card.expiry}</p>
                </div>
             </div>
             <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
               <i data-lucide="trash-2" className="w-4 h-4"></i>
             </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function PrivacyView({ onBack }) {
  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans animate-slide-in-right flex flex-col">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="p-2 mr-3 bg-white border border-slate-200 rounded-full hover:bg-slate-100 text-slate-600 shadow-sm transition-all">
          <i data-lucide="arrow-left" className="w-5 h-5"></i>
        </button>
        <h2 className="text-xl font-bold text-slate-800">Privacidade</h2>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex-1 text-sm text-slate-600 space-y-4 leading-relaxed overflow-y-auto">
        <p><strong className="text-slate-800">1. Introdução</strong><br/>A Patrulha Animal respeita a sua privacidade. Esta política descreve como coletamos e usamos seus dados.</p>
        <p><strong className="text-slate-800">2. Coleta de Dados</strong><br/>Coletamos informações como nome, e-mail e localização do pet apenas para o funcionamento do rastreador e serviços de entrega.</p>
        <p><strong className="text-slate-800">3. Uso do GPS</strong><br/>A localização do seu pet é criptografada e acessível apenas por você e pessoas autorizadas na sua conta.</p>
        <p><strong className="text-slate-800">4. Compartilhamento</strong><br/>Não vendemos seus dados para terceiros. Compartilhamos endereço apenas com petshops parceiros quando você realiza um agendamento.</p>
        <p><strong className="text-slate-800">5. Seus Direitos</strong><br/>Você pode solicitar a exclusão dos seus dados a qualquer momento através do menu de suporte.</p>
        <div className="pt-6 mt-6 border-t border-slate-100 text-xs text-slate-400 text-center">
           Última atualização: Novembro 2025
        </div>
      </div>
    </div>
  )
}

function SupportChatModal({ onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá! Sou o assistente virtual da Patrulha Animal. 🐶', sender: 'bot' },
    { id: 2, text: 'Escolha um assunto ou digite sua dúvida:', sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = (text) => {
    const msgText = text || inputText;
    if (!msgText.trim()) return;

    const userMsg = { id: Date.now(), text: msgText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "Vou chamar um humano para te ajudar melhor!";
      const lower = msgText.toLowerCase();

      if (lower.includes('rastre') || lower.includes('gps')) botResponse = "O rastreador atualiza a cada 30s. Se não estiver aparecendo, verifique a bateria da coleira.";
      else if (lower.includes('pedido') || lower.includes('entrega')) botResponse = "Você pode ver o status dos pedidos na aba 'Shop'. Entregas levam de 1 a 3 dias úteis.";
      else if (lower.includes('pagamento') || lower.includes('cartão')) botResponse = "Aceitamos Cartão e PIX. Você pode gerenciar seus cartões no menu 'Pagamentos'.";
      else if (lower.includes('ajuda')) botResponse = "Estou aqui! Pode perguntar sobre a coleira, o app ou nossos serviços.";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm h-[600px] max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        <div className="bg-emerald-600 p-4 flex items-center justify-between text-white shadow-md z-10">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-md">
              <i data-lucide="bot" className="w-6 h-6 text-white"></i>
            </div>
            <div>
              <h3 className="font-bold text-sm">Suporte Patrulha</h3>
              <p className="text-[10px] text-emerald-100 flex items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>Online</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition"><i data-lucide="x" className="w-5 h-5"></i></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1 border border-slate-100"><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce animation-delay-200"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce animation-delay-400"></div></div></div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {!isTyping && messages.length < 4 && (
           <div className="px-4 pb-2 bg-slate-50 flex gap-2 overflow-x-auto scrollbar-hide">
              <button onClick={() => handleSend("Problema no GPS")} className="whitespace-nowrap px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 transition shadow-sm">📍 Problema no GPS</button>
              <button onClick={() => handleSend("Onde está meu pedido?")} className="whitespace-nowrap px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 transition shadow-sm">📦 Meu Pedido</button>
              <button onClick={() => handleSend("Formas de pagamento")} className="whitespace-nowrap px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 transition shadow-sm">💳 Pagamentos</button>
           </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Digite sua dúvida..." className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all border border-transparent" />
          <button type="submit" disabled={!inputText.trim()} className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"><i data-lucide="send" className="w-5 h-5"></i></button>
        </form>
      </div>
    </div>
  );
}

function MenuItem({ icon, label, onClick, isRed = false }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group ${isRed ? 'text-red-500' : 'text-slate-700'}`}>
      <div className="flex items-center">
        <div className={`p-2 rounded-xl mr-3 transition-colors ${isRed ? 'bg-red-50 text-red-500 group-hover:bg-red-100' : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600'}`}>
           <i data-lucide={icon} className="w-5 h-5"></i>
        </div>
        <span className="font-bold text-sm">{label}</span>
      </div>
      {!isRed && <i data-lucide="chevron-right" className="w-4 h-4 text-slate-300 group-hover:text-emerald-500"></i>}
    </button>
  )
}

function ToggleItem({ icon, label, checked, onChange }) {
  return (
    <div className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onChange(!checked)}>
      <div className="flex items-center">
        <div className="p-2 rounded-xl mr-3 bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
           <i data-lucide={icon} className="w-5 h-5"></i>
        </div>
        <span className="font-bold text-sm text-slate-700">{label}</span>
      </div>
      <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${checked ? 'bg-emerald-500' : 'bg-slate-200'}`}>
        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-6' : 'translate-x-0'}`}></div>
      </div>
    </div>
  )
}

export default function AccountContent({ user, onLogout }) {
  const [currentView, setCurrentView] = useState('menu');
  const [showChat, setShowChat] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [currentView, showChat, notifications, biometrics]);

  if (currentView === 'profile') return <ProfileView user={user} onBack={() => setCurrentView('menu')} />;
  if (currentView === 'address') return <AddressView onBack={() => setCurrentView('menu')} />;
  if (currentView === 'payment') return <PaymentView onBack={() => setCurrentView('menu')} />;
  if (currentView === 'privacy') return <PrivacyView onBack={() => setCurrentView('menu')} />;

  return (
    <div className="min-h-full bg-slate-50 p-6 pb-32 font-sans relative animate-fade-in">
      <header className="mb-8 text-center">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-emerald-200 mb-4 ring-4 ring-white">
            {user?.name ? user.name[0].toUpperCase() : 'U'}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-slate-500 hover:text-emerald-600 transition transform hover:scale-110"><i data-lucide="camera" className="w-4 h-4"></i></button>
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">{user?.name || 'Usuário'}</h1>
        <p className="text-slate-500 text-sm font-medium">{user?.email}</p>
        <div className="mt-4 flex justify-center space-x-2">
           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm border border-emerald-200">Membro Free</span>
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Minha Conta</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
           <MenuItem icon="user" label="Dados Pessoais" onClick={() => setCurrentView('profile')} />
           <MenuItem icon="map-pin" label="Meus Endereços" onClick={() => setCurrentView('address')} />
           <MenuItem icon="credit-card" label="Pagamentos" onClick={() => setCurrentView('payment')} />
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Preferências</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
           <ToggleItem icon="bell" label="Notificações Push" checked={notifications} onChange={setNotifications} />
           <ToggleItem icon="fingerprint" label="Entrar com Biometria" checked={biometrics} onChange={setBiometrics} />
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Outros</h3>
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
           <MenuItem icon="message-square" label="Ajuda e Suporte" onClick={() => setShowChat(true)} />
           <MenuItem icon="shield" label="Política de Privacidade" onClick={() => setCurrentView('privacy')} />
           <MenuItem icon="log-out" label="Sair da Conta" onClick={onLogout} isRed={true} />
        </div>
      </section>

      <div className="text-center pb-6">
        <p className="text-xs text-slate-300 font-bold uppercase tracking-widest">Patrulha Animal v1.0.2</p>
      </div>

      {showChat && <SupportChatModal onClose={() => setShowChat(false)} />}
    </div>
  )
}