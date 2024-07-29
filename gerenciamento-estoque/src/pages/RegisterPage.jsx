import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cellphone, setCellphone] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', {
        username,
        password,
        email,
        name,
        cellphone,
        role: "USER"
      });
      alert('Registration successful');
      navigate('/login');
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={cellphone} onChange={(e) => setCellphone(e.target.value)} placeholder="Cellphone" />
        <button type="submit">Register</button>
      </form>
      <button className="back-button" onClick={() => navigate('/')}>
        Voltar
      </button>
    </div>
  );
};

export default RegisterPage;
