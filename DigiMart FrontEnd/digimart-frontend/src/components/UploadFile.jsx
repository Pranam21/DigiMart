import { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ productId }) => {
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    if (!price || price <= 0) {
      setMessage("Please enter a valid price");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('price', String(price).trim());

    const token = localStorage.getItem('token');

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/files/upload/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      setMessage(`Upload successful: ${res.data.fileName}`);
      setFile(null);
      setPrice('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
      border: '1px solid rgba(255,255,255,0.5)',
      padding: '2rem',
      margin: '2rem 0'
    }}>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: '#2c3e50',
        margin: '0 0 1.5rem 0',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{ fontSize: '1.8rem' }}>📤</span>
        Upload File
      </h3>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontSize: '1rem',
          color: '#374151',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          Select File
        </label>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(203, 213, 225, 0.8)',
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            fontWeight: 500
          }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{
          display: 'block',
          fontSize: '1rem',
          color: '#374151',
          fontWeight: 600,
          marginBottom: '0.5rem'
        }}>
          Price (₹)
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(203, 213, 225, 0.8)',
            fontSize: '1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            boxSizing: 'border-box',
            transition: 'all 0.3s ease',
            fontWeight: 500
          }}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        style={{
          background: loading 
            ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
            : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '12px',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          fontWeight: 700,
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          width: '100%'
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(-2px) scale(1.02)';
            e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.35)';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading) {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.25)';
          }
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>
          {loading ? '⏳' : '📤'}
        </span>
        {loading ? 'Uploading...' : 'Upload File'}
      </button>

      {message && (
        <div
          style={{
            marginTop: '1.5rem',
            borderRadius: '12px',
            border: message.includes('successful') 
              ? '1px solid rgba(34, 197, 94, 0.3)' 
              : '1px solid rgba(239, 68, 68, 0.3)',
            background: message.includes('successful')
              ? 'rgba(240, 253, 244, 0.9)'
              : 'rgba(254, 242, 242, 0.9)',
            color: message.includes('successful') ? '#065f46' : '#991b1b',
            padding: '1rem',
            fontWeight: 600,
            textAlign: 'center',
            backdropFilter: 'blur(15px)',
            boxShadow: message.includes('successful')
              ? '0 10px 30px rgba(34, 197, 94, 0.1)'
              : '0 10px 30px rgba(239, 68, 68, 0.1)',
            fontSize: '1rem'
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {message.includes('successful') ? '✅' : '❌'}
          </div>
          {message}
        </div>
      )}
    </div>
  );
};

export default UploadFile;
