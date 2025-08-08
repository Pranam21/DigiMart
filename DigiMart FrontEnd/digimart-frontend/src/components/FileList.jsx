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
    <div>
      <h3>Available Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.fileName} ({(file.size / 1024).toFixed(2)} KB)
            <button onClick={() => handleDownload(file.id, file.fileName)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
