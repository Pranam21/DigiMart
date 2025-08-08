import React, { useState } from 'react';
import { getUserByEmail } from '../api/user';

const UserLookup = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setUser(null);
    setLoading(true);
    try {
      const userDto = await getUserByEmail(email);
      setUser(userDto);
    } catch (err) {
      setError(err.response?.data?.message || 'User not found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '2em auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1em' }}>Lookup User</h2>
      <form onSubmit={submit}>
        <div className="form-group input-group" style={{ display: 'flex', gap: '0.5em' }}>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ flex: 1 }}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <div className="error" style={{ color: '#e11d48', marginTop: 8 }}>{error}</div>}
      {user && (
        <div className="card" style={{ marginTop: 16, background: '#f1f5f9', padding: 12 }}>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Registered:</strong> {user.registrationDate}</p>
        </div>
      )}
    </div>
  );
};

export default UserLookup;
