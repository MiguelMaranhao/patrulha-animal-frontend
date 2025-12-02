import React, { useEffect } from 'react'

export default function NavBar({ currentPage, onNavigate }) {
  
  const navItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'pets', icon: 'paw-print', label: 'Pets' },
    { id: 'mercado', icon: 'shopping-bag', label: 'Shop' },
    { id: 'cuidado', icon: 'heart', label: 'Saúde' },
    { id: 'account', icon: 'user', label: 'Conta' },
  ];

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [currentPage]);

  return (
    <nav className="w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)] px-2 py-2 pb-safe">
      <div className="flex justify-between items-end max-w-md mx-auto w-full">
        
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                group flex flex-col items-center justify-center w-full py-2 transition-all duration-300 relative
                ${isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-500'}
              `}
            >
              <span 
                className={`
                  absolute -top-2 w-8 h-1 rounded-b-full bg-emerald-500 transition-all duration-300
                  ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                `} 
              />

              <div className={`
                mb-1 transition-transform duration-300 
                ${isActive ? '-translate-y-1 scale-110' : 'group-hover:-translate-y-0.5'}
              `}>
                <i 
                  data-lucide={item.icon} 
                  className={`w-6 h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} 
                ></i>
              </div>

              <span className={`
                text-[10px] font-medium tracking-wide transition-all duration-300
                ${isActive ? 'opacity-100 translate-y-0 font-bold' : 'opacity-80 translate-y-1'}
              `}>
                {item.label}
              </span>
            </button>
          );
        })}

      </div>
    </nav>
  )
}