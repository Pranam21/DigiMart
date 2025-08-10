import { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = ({ productId }) => {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/files/product/${productId}`);
        setFiles(res.data);
      } catch (err) {
        console.error("Error loading files", err);
      }
    };

    fetchFiles();
  }, [productId]);

  const handleDownload = async (fileId, fileName) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/files/download/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'downloaded_file';
      a.click();
    } catch (err) {
      console.error('Download failed', err);
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
        <span style={{ fontSize: '1.8rem' }}>📂</span>
        Available Files
      </h3>
      {files.length === 0 ? (
        <div style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '1.1rem',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          No files available
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '1rem'
        }}>
          {files.map(file => (
            <div
              key={file.id}
              style={{
                background: 'rgba(248, 250, 252, 0.8)',
                borderRadius: '12px',
                padding: '1.2rem',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  padding: '0.5rem',
                  background: 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  📄
                </div>
                <div>
                  <div style={{
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '1rem'
                  }}>
                    {file.fileName}
                  </div>
                  <div style={{
                    color: '#64748b',
                    fontSize: '0.9rem'
                  }}>
                    {(file.size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDownload(file.id, file.fileName)}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.7rem 1.2rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.05)';
                  e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.25)';
                }}
              >
                <span style={{ fontSize: '1rem' }}>⬇️</span> Download
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;
