import React, { useEffect, useState } from 'react'

const EXCLUSIVE_COLLARS = [
  { id: 'c1', name: 'Patrulha Tag', tagline: 'Segurança Essencial', price: 89.90, description: 'Capa resistente compatível com AirTag.', features: ['Compatível AirTag', 'À prova d\'água', 'Silicone Premium'], image: 'https://lojamundoluna.com.br/cdn/shop/files/S56fb7046f4a24f28a3874b4627971752t_4a357b5a-c37e-4091-99c0-4e93aa8242e6.png?v=1748979424', badge: 'Mais Vendido', color: 'from-blue-400 to-blue-600', category: 'tech' },
  { id: 'c2', name: 'Patrulha GPS', tagline: 'Rastreamento Ativo', price: 249.90, description: 'Localização em tempo real com bateria de longa duração.', features: ['GPS Integrado', 'Histórico de Rotas', 'Bateria 7 dias'], image: 'https://http2.mlstatic.com/D_880703-CBT82232112433_022025-C.jpg', badge: 'Recomendado', color: 'from-emerald-400 to-teal-600', category: 'tech' },
  { id: 'c3', name: 'Patrulha Solar', tagline: 'Autonomia Infinita', price: 499.90, description: 'Tecnologia de ponta com mini painel solar.', features: ['Painel Solar', 'GPS Global 4G', 'Monitor de Saúde'], image: 'https://i.ibb.co/V0vNpDMw/Gemini-Generated-Image-4vjwd24vjwd24vjw.png', badge: 'Lançamento', color: 'from-orange-400 to-red-500', category: 'tech' }
];

const GENERAL_PRODUCTS = [
  { id: 1, name: 'Ração Premium 10kg', price: 149.90, image: 'https://i.zst.com.br/thumbs/12/a/11/2006056262.jpg', category: 'food', label: 'Alimento' },
  { id: 2, name: 'Brinquedo Mordedor', price: 39.90, image: 'https://www.petmimos.com.br/cdn/shop/products/brinquedo-mordedor-com-bola-para-cachorro-434117.jpg?v=1717017595', category: 'toys', label: 'Brinquedo' },
  { id: 3, name: 'Cama Confort G', price: 189.90, image: 'https://orthocrin.com.br/cdn/shop/files/colchao-cama-pet-comfort-orthocrin-lavavel-cachorros-e-gatos-930239.webp?v=1740073243&width=1000', category: 'toys', label: 'Conforto' },
  { id: 4, name: 'Shampoo Hipoalergênico', price: 45.00, image: 'https://vetnil.com.br/img/products/800/pelo-derme-r-hipoalergenico_653ffc597ef14.webp', category: 'health', label: 'Higiene' },
  { id: 5, name: 'Antipulgas 1un', price: 89.90, image: 'https://www.casadoprodutor.com.br/media/catalog/product/a/n/antipulgas-simparic-80mg-c-es-20-ate-40kg-1-comprimido-casa-do-produtor.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=512&width=512&canvas=512:512', category: 'health', label: 'Farmácia' },
  { id: 6, name: 'Petiscos Naturais', price: 22.50, image: 'https://images.tcdn.com.br/img/img_prod/1355550/petisco_esofago_aberto_100_natural_5_unid_25_1_f30f26661ee783bbd8d885b7d5ecca52.png', category: 'food', label: 'Petisco' },
];

const CATEGORIES = [
  { id: 'all', label: 'Tudo', icon: 'grid' },
  { id: 'food', label: 'Ração', icon: 'bone' },
  { id: 'toys', label: 'Brincar', icon: 'gamepad-2' },
  { id: 'health', label: 'Farmácia', icon: 'pill' },
];

function CartModal({ items, onRemove, onClose, onCheckout }) {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 w-full max-w-md mx-auto z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-slate-50 w-full rounded-t-3xl sm:rounded-3xl max-h-[85vh] shadow-2xl flex flex-col relative z-10 overflow-hidden">
        
        <div className="bg-white p-5 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-800 flex items-center">
            <i data-lucide="shopping-bag" className="w-6 h-6 mr-2 text-emerald-600"></i>
            Meu Carrinho
          </h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition">
            <i data-lucide="x" className="w-5 h-5 text-slate-500"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center text-slate-400">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <i data-lucide="shopping-cart" className="w-8 h-8 opacity-30"></i>
              </div>
              <p className="font-medium">Seu carrinho está vazio.</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center animate-scale-up">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover bg-slate-100" />
                <div className="ml-3 flex-grow">
                  <h4 className="text-sm font-bold text-slate-700 leading-tight line-clamp-1">{item.name}</h4>
                  <p className="text-emerald-600 font-bold text-sm">R$ {item.price.toFixed(2).replace('.',',')}</p>
                </div>
                <button onClick={() => onRemove(index)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                  <i data-lucide="trash-2" className="w-4 h-4"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-white p-5 border-t border-slate-100">
          <div className="flex justify-between items-end mb-4">
            <span className="text-slate-400 font-bold text-sm">Total</span>
            <span className="text-2xl font-black text-slate-800">R$ {total.toFixed(2).replace('.',',')}</span>
          </div>
          <button 
            disabled={items.length === 0}
            onClick={onCheckout} 
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${items.length === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 transform hover:-translate-y-1'}`}
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  )
}

function CheckoutModal({ items, onClose, onConfirmPayment }) {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const [method, setMethod] = useState('card'); 
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
        onConfirmPayment();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 w-full max-w-md mx-auto z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="bg-slate-50 rounded-t-3xl sm:rounded-3xl w-full max-w-md h-[90vh] sm:h-auto flex flex-col shadow-2xl relative overflow-hidden z-10">
        <div className="bg-white p-5 border-b border-slate-100 flex justify-between items-center">
           <h2 className="text-xl font-black text-slate-800">Revisão e Pagamento</h2>
           {!processing && (
             <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
               <i data-lucide="x" className="w-5 h-5 text-slate-500"></i>
             </button>
           )}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Entrega</h3>
                 <span className="text-emerald-600 text-xs font-bold">Alterar</span>
              </div>
              <div className="flex items-start">
                 <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mr-3">
                    <i data-lucide="map-pin" className="w-5 h-5"></i>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-800">Casa</p>
                    <p className="text-xs text-slate-500">Rua das Flores, 123 - Centro</p>
                    <p className="text-xs text-slate-500">Campina Grande - PB</p>
                 </div>
              </div>
           </div>

           <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Pagamento</h3>
              <div className="space-y-3">
                 <button 
                    onClick={() => setMethod('card')}
                    className={`w-full flex items-center p-4 rounded-2xl border transition-all ${method === 'card' ? 'border-emerald-500 bg-white ring-1 ring-emerald-500 shadow-md' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
                 >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                       <i data-lucide="credit-card" className="w-5 h-5 text-slate-600"></i>
                    </div>
                    <div className="text-left flex-grow">
                       <p className="text-sm font-bold text-slate-800">Cartão de Crédito</p>
                       <p className="text-xs text-slate-400">**** 1234</p>
                    </div>
                    {method === 'card' && <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>}
                 </button>

                 <button 
                    onClick={() => setMethod('pix')}
                    className={`w-full flex items-center p-4 rounded-2xl border transition-all ${method === 'pix' ? 'border-emerald-500 bg-white ring-1 ring-emerald-500 shadow-md' : 'border-slate-200 bg-white hover:border-emerald-200'}`}
                 >
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center mr-3">
                       <i data-lucide="qr-code" className="w-5 h-5 text-slate-600"></i>
                    </div>
                    <div className="text-left flex-grow">
                       <p className="text-sm font-bold text-slate-800">PIX</p>
                       <p className="text-xs text-slate-400">Aprovação imediata</p>
                    </div>
                    {method === 'pix' && <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>}
                 </button>
              </div>
           </div>

           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Resumo</h3>
              <div className="space-y-2 text-sm">
                 <div className="flex justify-between text-slate-600">
                    <span>Subtotal ({items.length} itens)</span>
                    <span>R$ {total.toFixed(2).replace('.',',')}</span>
                 </div>
                 <div className="flex justify-between text-slate-600">
                    <span>Frete</span>
                    <span className="text-emerald-600 font-bold">Grátis</span>
                 </div>
                 <div className="border-t border-slate-100 my-2"></div>
                 <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="text-xl font-black text-slate-800">R$ {total.toFixed(2).replace('.',',')}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white p-5 border-t border-slate-100">
           <button 
             onClick={handlePay}
             disabled={processing}
             className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg flex items-center justify-center transition-all"
           >
             {processing ? (
                <>
                  <i data-lucide="loader-2" className="w-5 h-5 mr-2 animate-spin"></i>
                  Processando...
                </>
             ) : (
                `Pagar R$ ${total.toFixed(2).replace('.',',')}`
             )}
           </button>
        </div>

      </div>
    </div>
  );
}

function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 w-full max-w-md mx-auto z-[90] flex items-center justify-center p-4 animate-fade-in bg-emerald-600">
       <div className="text-center text-white animate-scale-up relative z-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
             <i data-lucide="check" className="w-12 h-12 text-emerald-600 stroke-[3]"></i>
          </div>
          <h2 className="text-3xl font-black mb-2">Sucesso!</h2>
          <p className="text-emerald-100 text-lg mb-8">Seu pagamento foi confirmado.</p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
             <p className="text-sm text-emerald-100 uppercase font-bold tracking-wider mb-1">Código do Pedido</p>
             <p className="text-2xl font-mono font-bold tracking-widest">#TRX-8829</p>
          </div>

          <button 
            onClick={onClose}
            className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-50 transition-colors"
          >
            Voltar para a Loja
          </button>
       </div>
    </div>
  )
}

function SubscriptionModal({ onClose }) {
  return (
    <div className="fixed inset-0 w-full max-w-md mx-auto z-[80] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>
      <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative z-10">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition">
          <i data-lucide="x" className="w-5 h-5"></i>
        </button>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="relative z-10">
             <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
               <i data-lucide="crown" className="w-8 h-8 text-yellow-300"></i>
             </div>
             <h2 className="text-2xl font-black text-white tracking-tight">Clube Patrulha</h2>
             <p className="text-indigo-100 text-sm mt-1">A proteção completa que seu pet merece.</p>
           </div>
        </div>
        <div className="p-6 space-y-4">
           <div className="flex items-center p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm mr-3">
                 <i data-lucide="percent" className="w-5 h-5"></i>
              </div>
              <div>
                 <h4 className="font-bold text-slate-800 text-sm">15% OFF em tudo</h4>
                 <p className="text-xs text-slate-500">Desconto automático em qualquer produto.</p>
              </div>
           </div>
           <div className="flex items-center p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mr-3">
                 <i data-lucide="ambulance" className="w-5 h-5"></i>
              </div>
              <div>
                 <h4 className="font-bold text-slate-800 text-sm">Equipe de Resgate 24h</h4>
                 <p className="text-xs text-slate-500">Acione ajuda especializada se seu pet fugir.</p>
              </div>
           </div>
           <div className="flex items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-sm mr-3">
                 <i data-lucide="package-check" className="w-5 h-5"></i>
              </div>
              <div>
                 <h4 className="font-bold text-slate-800 text-sm">Entrega Grátis</h4>
                 <p className="text-xs text-slate-500">Para compras acima de R$ 50,00.</p>
              </div>
           </div>
        </div>
        <div className="p-6 pt-0 text-center">
           <p className="text-slate-400 text-sm mb-4">Apenas <span className="text-2xl font-black text-slate-800">R$ 19,90</span> /mês</p>
           <button 
             onClick={() => { alert('Bem-vindo ao Clube!'); onClose(); }}
             className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1"
           >
             Assinar Agora
           </button>
        </div>
      </div>
    </div>
  )
}

export default function MercadoContent({ onNavigate }) {
  const [cartItems, setCartItems] = useState([]); 
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [activeCategory, showCart, showSubscription, showCheckout, showSuccess]);

  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleStartCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    setShowSuccess(true);
    setCartItems([]); 
  };

  const filteredProducts = GENERAL_PRODUCTS.filter(product => {
    if (activeCategory === 'all') return true;
    return product.category === activeCategory;
  });

  return (
    <div className="min-h-full bg-slate-50 px-6 pb-32 font-sans relative">
      
      <header className="sticky top-0 z-40 bg-slate-50/95 backdrop-blur-sm -mx-6 px-6 py-6 mb-6 flex justify-between items-center border-b border-slate-100/50 transition-all">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Patrulha Shop</h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">O melhor para o seu melhor amigo.</p>
        </div>
        
        <button 
          onClick={() => setShowCart(true)}
          className="relative p-3 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
        >
           <i data-lucide="shopping-bag" className="w-6 h-6 text-slate-700 group-hover:text-emerald-600 transition-colors"></i>
           {cartItems.length > 0 && (
             <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white animate-bounce">
               {cartItems.length}
             </span>
           )}
        </button>
      </header>

      <section className="mb-10">
         <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-lg font-bold text-slate-800 flex items-center">
              <i data-lucide="cpu" className="w-5 h-5 mr-2 text-emerald-500"></i>
              Tecnologia Patrulha
            </h2>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Exclusivo</span>
         </div>

         <style>{`
           .custom-scrollbar::-webkit-scrollbar { height: 8px; }
           .custom-scrollbar::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 10px; }
           .custom-scrollbar::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
           .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
         `}</style>

         <div className="flex overflow-x-auto space-x-4 pb-6 px-1 snap-x custom-scrollbar">
            {EXCLUSIVE_COLLARS.map((product) => (
               <div key={product.id} className="min-w-[280px] bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden snap-center flex flex-col relative">
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wide bg-gradient-to-r ${product.color} shadow-md z-10`}>
                     {product.badge}
                  </div>
                  <div className="h-40 bg-slate-100 relative group">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                  </div>
                  <div className="p-5 flex-grow flex flex-col">
                     <h3 className="text-xl font-black text-slate-800">{product.name}</h3>
                     <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">{product.tagline}</p>
                     <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                     <div className="mt-auto flex items-center justify-between">
                        <div>
                           <p className="text-xs text-slate-400">A partir de</p>
                           <p className="text-lg font-black text-slate-800">R$ {product.price.toFixed(2).replace('.',',')}</p>
                        </div>
                        <button 
                           onClick={() => handleAddToCart(product)}
                           className="w-10 h-10 bg-slate-800 text-white rounded-xl flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg"
                        >
                           <i data-lucide="plus" className="w-5 h-5"></i>
                        </button>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

      <section className="mb-8">
         <div className="flex justify-between space-x-4 overflow-x-auto pb-2 px-1 scrollbar-hide">
            {CATEGORIES.map(cat => (
               <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex flex-col items-center min-w-[70px] group transition-all ${activeCategory === cat.id ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-100'}`}
               >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all shadow-sm ${activeCategory === cat.id ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-white text-slate-400 border border-slate-100'}`}>
                     <i data-lucide={cat.icon} className="w-7 h-7"></i>
                  </div>
                  <span className={`text-xs font-bold ${activeCategory === cat.id ? 'text-slate-800' : 'text-slate-400'}`}>{cat.label}</span>
               </button>
            ))}
         </div>
      </section>

      <div className="mb-10 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
         <div className="relative z-10">
            <div className="flex items-center mb-2">
               <i data-lucide="repeat" className="w-5 h-5 mr-2 text-indigo-200"></i>
               <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Clube Patrulha</span>
            </div>
            <h3 className="text-2xl font-black leading-tight mb-2">Nunca falte ração.</h3>
            <p className="text-indigo-100 text-sm mb-4 max-w-[80%]">Assine e ganhe <span className="font-bold text-white">Equipe de Resgate</span> + 15% OFF.</p>
            <button 
               onClick={() => setShowSubscription(true)} 
               className="bg-white text-indigo-600 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-50 transition"
            >
               Quero Desconto
            </button>
         </div>
         <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl"></div>
         <i data-lucide="package" className="absolute right-4 bottom-4 w-24 h-24 text-indigo-900 opacity-20 rotate-12"></i>
      </div>

      <section>
         <h2 className="text-lg font-bold text-slate-800 mb-4 px-1">
            {activeCategory === 'all' ? 'Populares da Semana' : CATEGORIES.find(c => c.id === activeCategory)?.label}
         </h2>
         
         {filteredProducts.length > 0 ? (
           <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                 <div key={product.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                    <div className="h-32 bg-slate-50 rounded-xl mb-3 relative overflow-hidden">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
                       <button 
                          onClick={() => handleAddToCart(product)}
                          className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur text-slate-800 rounded-lg flex items-center justify-center shadow-sm hover:bg-emerald-500 hover:text-white transition-colors"
                       >
                          <i data-lucide="plus" className="w-4 h-4"></i>
                       </button>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{product.label}</p>
                    <h3 className="text-sm font-bold text-slate-800 leading-tight mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-emerald-600 font-black">R$ {product.price.toFixed(2).replace('.',',')}</p>
                 </div>
              ))}
           </div>
         ) : (
           <div className="text-center py-10 text-slate-400">
             <p>Nenhum produto nesta categoria.</p>
           </div>
         )}
      </section>

      {showCart && <CartModal items={cartItems} onRemove={handleRemoveFromCart} onClose={() => setShowCart(false)} onCheckout={handleStartCheckout} />}
      {showCheckout && <CheckoutModal items={cartItems} onClose={() => setShowCheckout(false)} onConfirmPayment={handlePaymentSuccess} />}
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
      {showSubscription && <SubscriptionModal onClose={() => setShowSubscription(false)} />}
      
      {showToast && (
         <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center animate-fade-in-up z-[90]">
            <i data-lucide="check-circle" className="w-5 h-5 text-emerald-400 mr-3"></i>
            <span className="text-sm font-bold">Adicionado ao carrinho!</span>
         </div>
      )}

    </div>
  )
}