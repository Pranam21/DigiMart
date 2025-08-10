// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const roles = ["ADMIN", "USER"];
const API = import.meta.env.VITE_API_BASE_URL; // e.g. http://localhost:8080/api

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ email: "", username: "", password: "", roles: "USER" });
  const navigate = useNavigate();
  const { logout } = useAuth();

  const auth = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  const load = async () => {
    try {
      setLoading(true); setErr("");
      const { data } = await axios.get(`${API}/admin/users`, auth());
      setUsers(data ?? []);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to load users");
      if ([401, 403].includes(e.response?.status)) { logout(); navigate("/login"); }
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const startCreate = () => {
    setEditing(null);
    setForm({ email: "", username: "", password: "", roles: "USER" });
    setOpen(true);
  };

  const startEdit = (u) => {
    setEditing(u);
    setForm({ email: u.email, username: u.username, password: "", roles: u.roles });
    setOpen(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await axios.put(`${API}/admin/users/${editing.id}`, {
          username: form.username,
          roles: form.roles,
        }, auth());
      } else {
        await axios.post(`${API}/admin/users`, {
          email: form.email,
          username: form.username,
          password: form.password,
          roles: form.roles,
        }, auth());
      }
      setOpen(false);
      await load();
    } catch (e) {
      alert(e.response?.data?.message || "Save failed");
    }
  };

  const del = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axios.delete(`${API}/admin/users/${id}`, auth());
      await load();
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: '1200px',
        margin: '3em auto',
        padding: '2.5em 2em',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
        boxShadow: '0 4px 32px rgba(99,102,241,0.10)',
        border: 'none',
        borderRadius: '18px'
      }}
    >
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: '2em' 
      }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '2em',
          fontWeight: 800,
          color: '#6366f1'
        }}>
          Admin • Users
        </h2>
        <div style={{ display: "flex", gap: '1em' }}>
          <button onClick={startCreate} style={btnPrimary}>
            <span role="img" aria-label="add">➕</span> New User
          </button>
          <button onClick={() => navigate(-1)} style={btn}>
            <span role="img" aria-label="back">⬅️</span> Back
          </button>
        </div>
      </div>

      {err && <div style={alertErr}>{err}</div>}
      {loading ? (
        <div style={{ color: '#64748b', textAlign: 'center', fontSize: '1.1em' }}>Loading…</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                <th style={th}>ID</th>
                <th style={th}>Email</th>
                <th style={th}>Username</th>
                <th style={th}>Role</th>
                <th style={th}>Registered</th>
                <th style={{ ...th, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={td}>{u.id}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.username}</td>
                  <td style={td}>
                    <span style={{
                      background: u.roles === 'ADMIN' ? '#fef3c7' : '#dbeafe',
                      color: u.roles === 'ADMIN' ? '#92400e' : '#1e40af',
                      padding: '0.2em 0.6em',
                      borderRadius: '12px',
                      fontSize: '0.85em',
                      fontWeight: 600
                    }}>
                      {u.roles}
                    </span>
                  </td>
                  <td style={td}>{u.registrationDate || "—"}</td>
                  <td style={{ ...td, textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => startEdit(u)} style={btnSecondary}>Edit</button>
                    <button onClick={() => del(u.id)} style={btnDanger}>Delete</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ 
                    textAlign: "center", 
                    color: "#64748b", 
                    padding: '2em',
                    fontStyle: 'italic' 
                  }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div style={modalOverlay} onClick={() => setOpen(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ 
              marginTop: 0, 
              color: '#6366f1',
              fontWeight: 700,
              fontSize: '1.3em' 
            }}>
              {editing ? "Edit User" : "Create User"}
            </h3>
            {!editing && (
              <>
                <label style={label}>Email</label>
                <input style={input} value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })} />
                <label style={label}>Password</label>
                <input style={input} type="password" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} />
              </>
            )}

            <label style={label}>Username</label>
            <input style={input} value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })} />

            <label style={label}>Role</label>
            <select style={input} value={form.roles}
              onChange={e => setForm({ ...form, roles: e.target.value })}>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <div style={{ display: "flex", gap: '0.8em', justifyContent: "flex-end", marginTop: '1.5em' }}>
              <button onClick={() => setOpen(false)} style={btnSecondary}>Cancel</button>
              <button onClick={save} style={btnPrimary}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const table = { 
  width: "100%", 
  borderCollapse: "collapse",
  background: '#fff',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
};

const th = {
  padding: '1em',
  textAlign: 'left',
  fontWeight: 600,
  color: '#374151',
  borderBottom: '2px solid #e5e7eb'
};

const td = {
  padding: '1em',
  color: '#374151'
};

const btn = { 
  padding: "0.6em 1.2em", 
  background: "#f1f5f9", 
  border: "none", 
  borderRadius: '8px', 
  cursor: "pointer",
  fontWeight: 600,
  transition: 'background 0.2s',
  marginLeft: '0.5em'
};

const btnPrimary = { 
  ...btn, 
  background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)', 
  color: "#fff",
  boxShadow: '0 2px 8px rgba(99,102,241,0.08)'
};

const btnSecondary = {
  ...btn,
  background: '#e2e8f0',
  color: '#475569'
};

const btnDanger = {
  ...btn,
  background: 'linear-gradient(90deg, #e11d48 0%, #f472b6 100%)',
  color: '#fff',
  boxShadow: '0 2px 8px rgba(225,29,72,0.08)'
};

const alertErr = { 
  border: "1px solid #fecdd3", 
  background: "#fef2f2", 
  color: "#e11d48", 
  padding: "0.8em 1em", 
  borderRadius: '8px', 
  marginBottom: '1.5em',
  fontWeight: 600,
  textAlign: 'center'
};

const modalOverlay = { 
  position: "fixed", 
  inset: 0, 
  background: "rgba(0,0,0,0.4)", 
  display: "flex", 
  alignItems: "center", 
  justifyContent: "center",
  zIndex: 1000
};

const modal = { 
  background: "linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)", 
  borderRadius: '18px', 
  padding: '2em', 
  minWidth: 400, 
  maxWidth: 550, 
  width: "92%",
  boxShadow: '0 4px 32px rgba(99,102,241,0.15)'
};

const label = { 
  display: "block", 
  fontSize: '0.95em', 
  color: "#475569", 
  fontWeight: 500,
  marginTop: '1em', 
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
