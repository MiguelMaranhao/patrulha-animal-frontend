import React from 'react'
import loadingAnimation from '../assets/loading-dog.mp4' 

export default function LoaderPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative overflow-hidden">
      
      <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-[-20%] left-[-20%] w-96 h-96 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 flex flex-col items-center -mt-40">
        
        <div className="w-64 h-64 mb-4 flex items-center justify-center">
           <video 
             src={loadingAnimation} 
             autoPlay 
             loop 
             muted 
             playsInline
             className="w-full h-full object-cover mix-blend-multiply" 
           />
        </div>

        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2 animate-pulse">
          Patrulha Animal
        </h1>
        
        <div className="flex flex-col items-center space-y-2">
           <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Iniciando</p>
           
           <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-600 w-1/2 rounded-full animate-[loading_1s_ease-in-out_infinite]"></div>
           </div>
        </div>

      </div>

      <div className="absolute bottom-8 text-slate-400 text-xs font-medium">
        Protegendo seu melhor amigo
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}