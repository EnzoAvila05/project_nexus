import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './ProductChartsPage.css';

const ProductChartsPage = () => {
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

  const generateChartData = (product) => {
    return {
      labels: ['Quantidade Restante', 'Quantidade Retirada'],
      datasets: [
        {
          data: [product.quantity, product.withdrawals || 0],
          backgroundColor: ['#36a2eb', '#ff6384'],
          hoverBackgroundColor: ['#36a2eb', '#ff6384']
        }
      ]
    };
  };

  const categorizeProducts = (type) => {
    return products.filter(product => product.name.toLowerCase().includes(type.toLowerCase()));
  };

  const renderProductSection = (type) => {
    const categorizedProducts = categorizeProducts(type);
    if (categorizedProducts.length === 0) return null;

    return (
      <div key={type} className="category-section">
        <h2>{type}</h2>
        <div className="charts-container">
          {categorizedProducts.map(product => (
            <div key={product.id} className="chart-card">
              <h3>{product.name}</h3>
              <div className="chart-wrapper">
                <Pie data={generateChartData(product)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="charts-page-container">
      <h1>Gráficos dos Produtos</h1>
      {['CD', 'DVD', 'Vinil', 'Livro'].map(type => renderProductSection(type))}
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        Voltar
      </button>
    </div>
  );
};

export default ProductChartsPage;
