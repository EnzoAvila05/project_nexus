import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPage.css'; 

const DashboardPage = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleListProducts = () => {
    navigate('/products');
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleWithdrawProduct = () => {
    navigate('/withdraw-product');
  };

  const handleViewCharts = () => {
    navigate('/product-charts');
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const roleFromStorage = localStorage.getItem('role');
    setRole(roleFromStorage);

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Menu Principal</h1>
      <div className="dashboard-buttons">
        <button onClick={handleListProducts}>Relatório de Produtos</button>
        <button
          onClick={handleAddProduct}
          style={role === 'USER' ? { backgroundColor: 'gray', cursor: 'not-allowed' } : {}}
          disabled={role === 'USER'}
        >
          Adicionar Produto
        </button>
        <button onClick={handleWithdrawProduct}>Retirada de Produto</button>
        <button onClick={handleViewCharts}>Ver Gráficos dos Produtos</button> 
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DashboardPage;
