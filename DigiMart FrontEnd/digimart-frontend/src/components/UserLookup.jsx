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
    <div style={{ border: '1px solid #ccc', padding: 16, borderRadius: 6, maxWidth: 400 }}>
      <h2>Lookup User</h2>
      <form onSubmit={submit}>
        <div>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {user && (
        <div style={{ marginTop: 12, background: '#ADD8E6', padding: 8, borderRadius: 4 }}>
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
