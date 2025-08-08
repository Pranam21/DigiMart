import { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ productId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');

    try {
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
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadFile;
