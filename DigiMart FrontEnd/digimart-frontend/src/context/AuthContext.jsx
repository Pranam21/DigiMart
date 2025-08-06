import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct named import
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', {
        username,
        email,
        password
      });
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
