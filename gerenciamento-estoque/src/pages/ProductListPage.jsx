import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductListPage.css';

const ProductListPage = () => {
  const [role, setRole] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roleFromStorage = localStorage.getItem('role');
    setRole(roleFromStorage);

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

  const handleEditProduct = async (name) => {
    try {
      const response = await axios.get(`http://localhost:8080/produto/id?name=${name}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const productId = response.data;
      navigate(`/edit-product/${productId}`);
    } catch (error) {
      console.error('Failed to find product by name', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8080/produto/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error('Failed to delete product', error);
      }
    }
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const generatePDF = async () => {
    try {
      const response = await axios.get('http://localhost:8080/produto/generate-pdf', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio_produtos.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Failed to generate PDF', error);
    }
  };

  return (
    <div className="product-list-container">
      <h1>Relatório de Produtos</h1>
      <table className="product-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor Unitário</th>
            <th>Quantidade</th>
            <th>Retiradas</th>
            <th>Valor Total de Vendas</th>
            <th>Porcentagem Vendida</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{formatCurrency(product.price)}</td>
              <td>{product.quantity}</td>
              <td>{product.withdrawals}</td>
              <td>{formatCurrency(product.price * product.withdrawals)}</td>
              <td>{((product.withdrawals / (product.quantity + product.withdrawals)) * 100).toFixed(2)}%</td>
              <td>
                <button onClick={() => handleEditProduct(product.name)}
                        disabled={role == 'USER'}
                        >Editar</button>
                <button onClick={() => handleDeleteProduct(product.id)}
                        disabled={role == 'USER'}
                        >Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF}>Gerar PDF</button>
      <button onClick={() => navigate('/dashboard')}>Voltar</button>
    </div>
  );
};

export default ProductListPage;
