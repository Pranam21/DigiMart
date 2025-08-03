import React, { useState } from 'react';
import { registerUser } from '../api/user';
import { useUser } from '../context/UserContext';

const Register = () => {
  const { setUser } = useUser();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: null });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: null });
    try {
      if (!form.username || !form.email || !form.password) throw new Error('All fields required');
      const userDto = await registerUser(form);
      setUser(userDto);
      setStatus({ loading: false, success: 'Registered successfully' });
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || err.message || 'Registration failed',
      });
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 6, maxWidth: 400 }}>
      <h2>Register</h2>
      {status.error && <div style={{ color: 'red' }}>{status.error}</div>}
      {status.success && <div style={{ color: 'green' }}>{status.success}</div>}
      <form onSubmit={submit}>
        <div>
          <label>Username</label><br />
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label><br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label><br />
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={status.loading}>
          {status.loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
