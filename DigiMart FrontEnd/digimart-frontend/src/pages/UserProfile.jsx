// src/pages/UserProfile.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_BASE_URL;

export default function UserProfile() {
  const [me, setMe] = useState(null);
  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const auth = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const load = async () => {
    try {
      setErr(""); setMsg("");
      const { data } = await axios.get(`${API}/users/me`, auth());
      setMe(data); setUsername(data.username || "");
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load profile");
      if ([401, 403].includes(e.response?.status)) { logout(); navigate("/login"); }
    }
  };

  useEffect(() => { load(); }, []);

  const saveName = async () => {
    try {
      await axios.put(`${API}/users/me`, { username }, auth());
      setMsg("Profile updated"); await load();
    } catch (e) {
      setErr(e.response?.data?.message || "Update failed");
    }
  };

  const changePwd = async () => {
    if (!pwd || pwd.length < 6) { setErr("Password must be at least 6 characters"); return; }
    try {
      await axios.put(`${API}/users/me/password`, { newPassword: pwd }, auth());
      setPwd(""); setMsg("Password changed");
    } catch (e) {
      setErr(e.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: '600px',
        margin: '3em auto',
        padding: '2.5em 2em',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
        border: 'none',
        borderRadius: '18px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2em' }}>
        <h2 style={{
          margin: 0,
          fontSize: '2em',
          fontWeight: 800,
          color: '#6366f1'
        }}>
          My Profile
        </h2>
        <button
          onClick={() => navigate('/home')}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6em 1.5em',
            fontSize: '1em',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
            transition: 'background 0.2s'
          }}
        >
          <span role="img" aria-label="home">🏠</span> Home
        </button>
      </div>

      {msg && <div style={ok}>{msg}</div>}
      {err && <div style={bad}>{err}</div>}
      
      {!me ? (
        <div style={{ color: '#64748b', textAlign: 'center', fontSize: '1.1em' }}>Loading…</div>
      ) : (
        <>
          <div style={card}>
            <div style={{ color: "#64748b", marginBottom: '0.5em', fontWeight: 500 }}>Email</div>
            <div style={{ fontWeight: 600, color: '#22223b', fontSize: '1.1em' }}>{me.email}</div>
          </div>

          <div style={card}>
            <label style={label}>Display Name</label>
            <input style={input} value={username} onChange={e => setUsername(e.target.value)} />
            <button onClick={saveName} style={{ ...btn, marginTop: '0.8em' }}>
              <span role="img" aria-label="save">💾</span> Save
            </button>
          </div>

          <div style={card}>
            <label style={label}>New Password</label>
            <input style={input} type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
            <button onClick={changePwd} style={{ ...btnSuccess, marginTop: '0.8em' }}>
              <span role="img" aria-label="lock">🔐</span> Change Password
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const card = { 
  background: "#fff", 
  border: "none", 
  borderRadius: '14px', 
  padding: '1.5em', 
  marginBottom: '1.5em',
  boxShadow: '0 2px 12px rgba(99,102,241,0.07)'
};

const label = { 
  display: "block", 
  fontSize: '0.95em', 
  color: "#475569", 
  fontWeight: 500,
  marginBottom: '0.5em' 
};

const input = { 
  width: "100%", 
  padding: "0.7em", 
  borderRadius: '8px', 
  border: "1px solid #cbd5e1",
  fontSize: '1em',
  background: '#fff',
  boxSizing: 'border-box'
};

const btn = { 
  padding: "0.7em 1.5em", 
  border: "none", 
  borderRadius: '8px', 
  background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', 
  color: "#fff", 
  cursor: "pointer",
  fontWeight: 600,
  fontSize: '1em',
  boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
  transition: 'background 0.2s'
};

const btnSuccess = {
  ...btn,
  background: 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)',
  boxShadow: '0 2px 8px rgba(34,197,94,0.08)'
};

const ok = { 
  border: "1px solid #bbf7d0", 
  background: "#f0fdf4", 
  color: "#22c55e", 
  padding: "0.8em 1em", 
  borderRadius: '8px', 
  marginBottom: '1.5em',
  fontWeight: 600,
  textAlign: 'center'
};

const bad = { 
  border: "1px solid #fecdd3", 
  background: "#fef2f2", 
  color: "#e11d48", 
  padding: "0.8em 1em", 
  borderRadius: '8px', 
  marginBottom: '1.5em',
  fontWeight: 600,
  textAlign: 'center'
};
