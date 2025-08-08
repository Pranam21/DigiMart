// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      email,
      password
    });

    const token = response.data.token;
    if (!token) throw new Error("No token received");

    localStorage.setItem('token', token);
    return token; // 🔥 RETURN THE TOKEN HERE
  };

  const register = async (username, email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, { username, email, password });
    const newToken = res.data.token;
    setToken(newToken);
    localStorage.setItem('token', newToken);
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
