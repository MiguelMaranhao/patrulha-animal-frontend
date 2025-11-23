import React, { useEffect } from 'react'

export default function SettingsMenuItem({ icon, title, description, onClick, isDestructive = false }) {
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, []);

  const iconColor = isDestructive ? 'text-red-500' : 'text-cyan-600';
  const iconBg = isDestructive ? 'bg-red-100' : 'bg-cyan-100';
  const textColor = isDestructive ? 'text-red-600' : 'text-gray-800';

  return (
    <button
      onClick={onClick ? onClick : () => alert('Funcionalidade a ser implementada!')}
      className={`flex items-center w-full p-4 text-left ${isDestructive ? 'hover:bg-red-50' : 'hover:bg-gray-50'} transition duration-150`}
    >
      <div className={`p-2 ${iconBg} rounded-lg`}>
        <i data-lucide={icon} className={`w-5 h-5 ${iconColor}`}></i>
      </div>
      <div className="ml-4 flex-grow">
        <h3 className={`font-semibold ${textColor}`}>{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      {!isDestructive && <i data-lucide="chevron-right" className="w-5 h-5 text-gray-400"></i>}
    </button>
  )
}
