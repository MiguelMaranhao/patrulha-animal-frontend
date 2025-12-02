import React, { useEffect, useState } from 'react'
import LoaderPage from './components/LoaderPage'
import AuthPage from './components/Auth/AuthPage'
import MainApp from './components/MainApp'

const API_URL = 'https://patrulha-animal-backend.onrender.com';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [preSelectedPetId, setPreSelectedPetId] = useState(null);

  useEffect(() => {
    const loadApp = () => {
      try {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
          setCurrentUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        localStorage.clear();
      }
      setTimeout(() => setIsLoading(false), 4500); 
    };
    loadApp();
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      if (isAuthenticated) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${API_URL}/api/pets`, {
            headers: { 'x-auth-token': token }
          });
          
          if(response.ok) {
            const petsFromDB = await response.json();
            setPets(petsFromDB);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Erro ao buscar pets:', error);
        }
      } else {
        setPets([]); 
      }
    };

    fetchPets();
  }, [isAuthenticated]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const handleAddPet = async (petData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/pets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(petData)
      });

      if(response.ok) {
        const newPetFromDB = await response.json();
        setPets(prev => [...prev, newPetFromDB]); 
        setCurrentPage('home');
        setPreSelectedPetId(newPetFromDB._id);
      }
    } catch (error) {
      console.error("Erro ao salvar pet:", error);
    }
  };

  const handleLocationUpdate = async (petId, newLocation) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API_URL}/api/pets/${petId}/location`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify(newLocation)
      });

      setPets(prevPets => prevPets.map(pet => 
        pet._id === petId 
          ? { ...pet, lastPosition: newLocation } 
          : pet
      ));
    } catch (error) {
      console.error("Erro ao atualizar localização", error);
    }
  };

  const handleDeletePet = async (petId) => {
    if (!window.confirm("Tem certeza que deseja remover este pet?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/pets/${petId}`, {
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      });

      if (response.ok) {
        setPets(prev => prev.filter(p => p._id !== petId));
      }
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const handleUpdatePet = async (petId, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/pets/${petId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const updatedPet = await response.json();
        setPets(prev => prev.map(p => p._id === petId ? updatedPet : p));
      }
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  const handleNavigate = (page, petId = null) => {
    setCurrentPage(page);
    setPreSelectedPetId(petId);
  };

  return (
    <div id="app-container" className="fixed inset-0 w-full max-w-md mx-auto h-[100dvh] md:h-[85vh] md:relative md:mt-8 bg-slate-50 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 overscroll-none">
      {isLoading ? (
        <LoaderPage />
      ) : !isAuthenticated ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <MainApp
          user={currentUser}
          pets={pets}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          onAddPet={handleAddPet}
          preSelectedPetId={preSelectedPetId}
          onClearPreSelection={() => setPreSelectedPetId(null)}
          onLocationUpdate={handleLocationUpdate}
          onDeletePet={handleDeletePet}
          onUpdatePet={handleUpdatePet}
        />
      )}
    </div>
  )
}