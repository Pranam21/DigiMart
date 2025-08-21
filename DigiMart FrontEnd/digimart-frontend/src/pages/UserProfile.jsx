// src/pages/UserProfile.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API = import.meta.env.VITE_API_BASE_URL;

const formatDate = (s) => {
  if (!s) return '—';
  try {
    const d = new Date(s);
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return s;
  }
};

export default function UserProfile() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      nav('/login', { replace: true, state: { from: '/me' } });
      return;
    }

    (async () => {
      try {
        setErr('');
        setLoading(true);
        const { data } = await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMe(data);
      } catch (e) {
        const status = e?.response?.status;
        if (status === 401 || status === 403) {
          setErr('Forbidden. Your session may have expired or you lack permission.');
        } else {
          setErr(e?.response?.data?.message || 'Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [nav]);

  const roleText = (() => {
    if (!me) return '—';
    const r = me.role ?? me.roles ?? me.authorities ?? me.scopes ?? me.scope;
    if (Array.isArray(r)) return r.join(', ');
    if (typeof r === 'string') return r.replace(/^ROLE_/, '');
    return r ?? '—';
  })();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: '#64748b' }}>
        <div style={{ fontSize: '1.25rem' }}>Loading profile… ⏳</div>
      </div>
    );
  }

  if (err) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <div style={{
          padding: '1.25rem 1.5rem',
          borderRadius: 12,
          border: '1px solid rgba(239,68,68,.25)',
          background: 'rgba(254,242,242,.8)',
          color: '#991b1b',
          maxWidth: 520,
          textAlign: 'center',
          fontWeight: 600
        }}>
          ⚠️ {err}
          <div style={{ marginTop: 12 }}>
            <button
              onClick={() => nav(-1)}
              style={{ marginRight: 8, padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0' }}
            >
              Go Back
            </button>
            <button
              onClick={() => { logout?.(); localStorage.removeItem('token'); nav('/login', { replace: true }); }}
              style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#334155', color: '#fff' }}
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2c3e50 0%, #4f6989 100%)',
      padding: '6rem 1rem',
    }}>
      <div style={{
        maxWidth: 780, margin: '0 auto',
        background: 'rgba(255,255,255,.95)', borderRadius: 24,
        padding: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#1e293b', fontWeight: 900 }}>My Profile</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => nav('/home')}
              style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff' }}
            >
              ⬅️ Back to Home
            </button>
            <button
              onClick={() => { logout?.(); localStorage.removeItem('token'); nav('/login', { replace: true }); }}
              style={{ padding: '10px 14px', borderRadius: 10, border: 'none', background: '#ef4444', color: '#fff' }}
            >
              🚪 Logout
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '120px 1fr', gap: 20, alignItems: 'center',
          padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 16, marginBottom: 20
        }}>
          <div style={{
            width: 120, height: 120, borderRadius: '50%',
            background: 'linear-gradient(135deg,#93c5fd,#a5b4fc)',
            display: 'grid', placeItems: 'center', color: '#fff', fontSize: 42, fontWeight: 800
          }}>
            {(me?.name || me?.username || me?.email || 'U').toString().charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
              {me?.name || me?.username || '—'}
            </div>
            <div style={{ color: '#334155', marginTop: 6 }}>{me?.email || '—'}</div>
            <div style={{ color: '#475569', marginTop: 6 }}>Role: <strong>{roleText}</strong></div>
            <div style={{ color: '#64748b', marginTop: 6 }}>Member since: {formatDate(me?.registrationDate)}</div>
          </div>
        </div>

        {/* Extra info block (optional fields safe-accessed) */}
        <div style={{
          padding: '1rem', border: '1px solid #e2e8f0', borderRadius: 16,
          background: '#f8fafc'
        }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Account</div>
          <div style={{ color: '#334155' }}>
            <div>User ID: <strong>{me?.id ?? '—'}</strong></div>
            {me?.status && <div>Status: <strong>{me.status}</strong></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
