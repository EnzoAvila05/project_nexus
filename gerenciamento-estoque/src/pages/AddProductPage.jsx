import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:8080/produto',
        { name, price, quantity }, 
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      alert('Product added successfully');
      navigate('/products');
    } catch (error) {
      console.error('Failed to add product', error);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Adicionar Produto</h1>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do Produto"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Preço do Produto"
          required
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantidade"
          required
        />
        <button type="submit">Adicionar Produto</button>
      </form>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        Voltar
      </button>
    </div>
  );
};

export default AddProductPage;
