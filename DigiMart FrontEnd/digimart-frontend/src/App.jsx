import React from 'react';
import Register from './components/register';
import UserLookup from './components/UserLookup';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
        <h1>DigiMart User</h1>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <Register />
          <UserLookup />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
