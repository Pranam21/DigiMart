// src/pages/UploadPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file first');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('price', price);

      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage('File uploaded successfully!');
      setFile(null);
      setPrice('');
    } catch (err) {
      console.error(err);
      setMessage('File upload failed.');
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: '450px',
        margin: '3rem auto',
        padding: '2.5em 2em',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
        border: 'none',
        borderRadius: '18px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2em' }}>
        <h2
          style={{
            textAlign: 'center',
            color: '#6366f1',
            marginBottom: 0,
            fontWeight: 800,
            fontSize: '1.5em'
          }}
        >
          Upload a New Product
        </h2>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5em 1.2em',
            fontSize: '1em',
            fontWeight: 600,
            cursor: 'pointer',
            marginLeft: '1em',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s'
          }}
        >
          <span role="img" aria-label="home">🏠</span> Home
        </button>
      </div>
      <form
        onSubmit={handleUpload}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        <div
          className="form-group"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
          }}
        >
          <label
            htmlFor="file"
            style={{
              fontWeight: 500,
              color: '#475569',
            }}
          >
            Select File
          </label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              padding: '0.6em',
              borderRadius: 4,
              border: '1px solid #cbd5e1',
              fontSize: '1em',
              background: '#fff',
            }}
          />
        </div>
        <div
          className="form-group"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
          }}
        >
          <label
            htmlFor="price"
            style={{
              fontWeight: 500,
              color: '#475569',
            }}
          >
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              padding: '0.6em',
              borderRadius: 4,
              border: '1px solid #cbd5e1',
              fontSize: '1em',
              background: '#fff',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '0.7em 1.8em',
            fontSize: '1.1em',
            cursor: 'pointer',
            fontWeight: 600,
            marginTop: '0.5em',
            boxShadow: '0 2px 8px rgba(34,197,94,0.08)',
            transition: 'background 0.2s',
          }}
        >
          <span role="img" aria-label="upload">
            📤
          </span>{' '}
          Upload
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: '1.5em',
            textAlign: 'center',
            color: message.includes('success') ? '#22c55e' : '#e11d48',
            fontWeight: 600,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default UploadPage;
