import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProductModal from '../components/EditProductModal';

export default function AdminProductManagement() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

  const fetchProducts = async () => {
    const res = await axios.get('/api/admin/products', { headers: authHeader() });
    setProducts(res.data || []);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/products/${id}`, { headers: authHeader() });
    fetchProducts();
  };

  const handleSave = async (id, formValues) => {
    const fd = new FormData();
    fd.append('name', formValues.name ?? '');
    fd.append('description', formValues.description ?? '');
    fd.append('price', formValues.price ?? '');
    fd.append('categoryId', formValues.categoryId ?? '');
    if (formValues.file) fd.append('file', formValues.file);

    await axios.put(`/api/admin/products/${id}`, fd, {
      headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' }
    });
    setEditing(null);
    fetchProducts();
  };

  useEffect(() => { fetchProducts(); }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Products (Admin)</h2>
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Id</th><th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.categoryName || p.categoryId}</td>
              <td>
                <button onClick={() => setEditing(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr><td colSpan="5" align="center">No products</td></tr>
          )}
        </tbody>
      </table>

      {editing && (
        <EditProductModal
          product={editing}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
