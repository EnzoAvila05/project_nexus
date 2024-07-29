import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <h1>Sistema de Gerenciamento de Estoque</h1>
      <div className="home-buttons">
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Registrar</button>
      </div>
    </div>
  );
};

export default HomePage;
