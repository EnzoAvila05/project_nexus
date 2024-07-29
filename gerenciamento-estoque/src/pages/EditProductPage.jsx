import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProductPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();



  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/produto/edit/${id}`, { name, price, quantity }, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      alert('Produto atualizado com sucesso!');
      navigate('/products');
    } catch (error) {
      console.error('Falha ao atualizar o produto!', error);
    }
  };

  return (
    <div className="edit-product-container">
      <h1>Editar Produto</h1>
      <form onSubmit={handleUpdateProduct}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do Produto" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Novo Preço" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Nova Quantidade" />
        <button type="submit">Atualizar Produto</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
};

export default EditProductPage;
