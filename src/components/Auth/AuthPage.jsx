import React, { useState } from 'react'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

export default function AuthPage({ onLogin }) {
  const [isLoginView, setIsLoginView] = useState(true)

  return isLoginView ? (
    <LoginPage onLogin={onLogin} onShowSignup={() => setIsLoginView(false)} />
  ) : (
    <SignupPage onSignup={onLogin} onShowLogin={() => setIsLoginView(true)} />
  )
}
