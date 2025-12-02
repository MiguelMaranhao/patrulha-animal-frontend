import React, { useState, useEffect } from 'react'

// URL DE PRODUÇÃO (RENDER)
const API_URL = 'https://patrulha-animal-backend.onrender.com';

export default function SignupPage({ onSignup, onShowLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setError('')
    
    if (!name || !email || !password) {
      setError('Por favor, preencha nome, email e senha.')
      return
    }

    setLoading(true)

    try {
      // USANDO A URL DO RENDER
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, cpf, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onSignup(data.user); 
      } else {
        setError(data.msg || 'Ocorreu um erro no cadastro.');
      }

    } catch (err) {
      console.error("Erro de conexão:", err);
      setError('Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="flex-grow flex justify-center bg-slate-50 px-4 pt-10 pb-8">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 p-8 relative z-10 h-fit">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 -mt-4">
               <img src="https://i.ibb.co/DDr5XWQB/Chat-GPT-Image-3-de-nov-de-2025-21-35-56.png" alt="Patrulha Animal Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Crie sua Conta</h1>
            <p className="text-slate-500 mt-2 text-sm">Junte-se à Patrulha e proteja seu pet.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="user" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
              </div>
              <input 
                type="text" 
                placeholder="Nome completo" 
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                value={name} 
                onChange={(ev) => setName(ev.target.value)} 
                required 
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="mail" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
              </div>
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                value={email} 
                onChange={(ev) => setEmail(ev.target.value)} 
                required 
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="file-text" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
              </div>
              <input 
                type="text" 
                placeholder="CPF (opcional)" 
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                value={cpf} 
                onChange={(ev) => setCpf(ev.target.value)} 
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="lock" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
              </div>
              <input 
                type="password" 
                placeholder="Crie uma senha forte" 
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                value={password} 
                onChange={(ev) => setPassword(ev.target.value)} 
                required 
              />
            </div>
            
            {error && (
               <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm flex items-center animate-pulse">
                 <i data-lucide="alert-circle" className="w-4 h-4 mr-2"></i>
                 {error}
               </div>
            )}
            
            <button 
                type="submit" 
                disabled={loading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? 'Criando conta...' : 'Cadastrar e Entrar'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Já tem uma conta?{' '}
              <a href="#" onClick={(ev) => { ev.preventDefault(); onShowLogin(); }} className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                Faça login aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}