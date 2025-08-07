import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const token = res.data.token;
      if (!token) throw new Error("Token not received");

      // Decode token to extract role
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const role = Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles;

      // Store token and role
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || 'Login failed. Please check your credentials.';
      setError(message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login to DigiMart</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
