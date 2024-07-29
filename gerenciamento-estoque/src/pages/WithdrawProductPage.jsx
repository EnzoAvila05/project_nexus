import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WithdrawProductPage.css'; 

const WithdrawProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produto', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleWithdraw = async (id, withdrawAmount) => {
    try {
      const product = products.find(product => product.id === id);
      const amount = parseInt(withdrawAmount, 10);
      

      if (product && product.quantity >= amount && amount > 0) {
        const newQuantity = product.quantity - amount;
        const newWithdraw = product.withdrawals + amount;

        await axios.put(`http://localhost:8080/produto/${id}`, { ...product, quantity: newQuantity, withdrawals: newWithdraw }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(products.map(product => product.id === id ? { ...product, quantity: newQuantity, withdrawals: newWithdraw } : product));
      } else {
        alert('Quantidade insuficiente para retirar ou valor inválido');
      }
    } catch (error) {
      console.error('Failed to withdraw product', error);
    }
  };

  const categorizeProducts = (type) => {
    return products.filter(product => product.name.toLowerCase().includes(type.toLowerCase()));
  };

  const renderProductSection = (type) => {
    const categorizedProducts = categorizeProducts(type);
    if (categorizedProducts.length === 0) return null;

    return (
      <div key={type}>
        <h2>{type}</h2>
        <div className="products-grid">
          {categorizedProducts.map(product => (
            <div key={product.id} className="withdraw-product-item">
              <span className="product-name">{product.name}</span>
              <span className="product-quantity">Quantidade: {product.quantity}</span>
              <div className="withdraw-input-container">
                <input 
                  type="number" 
                  placeholder="Quantidade para retirar" 
                  min="0" 
                  defaultValue="0"
                  id={`withdrawAmount-${product.id}`} 
                  className="withdraw-input" 
                />
              </div>
              <button onClick={() => handleWithdraw(product.id, document.getElementById(`withdrawAmount-${product.id}`).value)}>
                Retirar
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="withdraw-product-container">
      <h1>Retirada de Produtos</h1>
      {['CD', 'DVD', 'Vinil', 'Livro'].map(type => renderProductSection(type))}
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Voltar
      </button>
    </div>
  );
};

export default WithdrawProductPage;
