import React from 'react';

export default function AdminPage() {
  return (
    <div
      className="card"
      style={{
        maxWidth: 600,
        margin: '3em auto',
        textAlign: 'center',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
        border: 'none',
        borderRadius: '18px',
        padding: '2.5em 2em'
      }}
    >
      <h1
        style={{
          marginBottom: '0.5em',
          color: '#6366f1',
          fontWeight: 800,
          fontSize: '2.2em',
          letterSpacing: '-1px'
        }}
      >
        Admin Dashboard
      </h1>
      <p
        style={{
          fontSize: '1.15em',
          color: '#475569',
          marginBottom: '2em',
          marginTop: '0.5em'
        }}
      >
        Welcome to the admin-only management panel.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2em',
          marginBottom: '2em'
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
            padding: '1.5em 1.2em',
            minWidth: 180,
            fontSize: '1.08em'
          }}
        >
          <span role="img" aria-label="users" style={{ fontSize: '1.5em' }}>👥</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>User Management</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>View & manage users</div>
        </div>
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
            padding: '1.5em 1.2em',
            minWidth: 180,
            fontSize: '1.08em'
          }}
        >
          <span role="img" aria-label="files" style={{ fontSize: '1.5em' }}>📦</span>
          <div style={{ marginTop: '0.7em', fontWeight: 600 }}>Product Oversight</div>
          <div style={{ color: '#64748b', marginTop: '0.3em' }}>Manage digital files</div>
        </div>
      </div>
      <div style={{ color: '#e11d48', fontWeight: 600, marginTop: '2em' }}>
        <span role="img" aria-label="warning">⚠️</span> Admin access only
      </div>
    </div>
  );
}
