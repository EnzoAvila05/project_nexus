import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import DashboardPage from './pages/MenuPage';
import EditProductPage from './pages/EditProductPage';
import WithdrawProductPage from './pages/WithdrawProductPage'; 
import ProductChartsPage from './pages/ProductChartsPage'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/withdraw-product" element={<WithdrawProductPage />} />
        <Route path="/product-charts" element={<ProductChartsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
