import React, { useState, useEffect } from 'react'

// URL DE PRODUÇÃO (RENDER)
const API_URL = 'https://patrulha-animal-backend.onrender.com';

export default function LoginPage({ onLogin, onShowSignup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, []);

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Por favor, preencha email e senha.')
      return
    }
    setLoading(true)
    try {
      // USANDO A URL DO RENDER
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setError(data.msg || 'Falha ao realizar login.');
      }
    } catch (err) {
      console.error("Erro:", err);
      setError('Sem conexão com o servidor (Verifique se o Render está ativo).');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="flex-grow flex justify-center bg-slate-50 px-4 pt-16 pb-8">
        <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 p-8 relative z-10 h-fit">
          
          <div className="text-center mb-10">
            <div className="w-24 h-24 mx-auto mb-4 -mt-4">
              <img src="https://i.ibb.co/DDr5XWQB/Chat-GPT-Image-3-de-nov-de-2025-21-35-56.png" alt="Patrulha Animal Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Bem-vindo de volta</h1>
            <p className="text-slate-500 mt-2 text-sm">Gerencie a segurança do seu pet.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="mail" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
              </div>
              <input
                type="email"
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i data-lucide="lock" className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors"></i>
              </div>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 block transition-all outline-none font-medium"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {loading ? 'Acessando...' : 'Entrar na Conta'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Não tem uma conta?{' '}
              <a href="#" onClick={(ev) => { ev.preventDefault(); onShowSignup(); }} className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
                Criar conta grátis
              </a>
            </p>
          </div>

          <div className="relative mt-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400 uppercase text-xs font-bold tracking-wider">Ou continue com</span>
            </div>
          </div>

          <button onClick={() => alert('Em breve')} className="mt-6 w-full flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all">
            <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
            Google
          </button>
        </div>
      </div>
    </div>
  )
}