// src/pages/admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div style={{ maxWidth: 1100, margin: "2rem auto", padding: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Admin • Users</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={startCreate} style={btnPrimary}>+ New User</button>
          <button onClick={() => navigate(-1)} style={btn}>Back</button>
        </div>
      </div>

      {err && <div style={alertErr}>{err}</div>}
      {loading ? <div>Loading…</div> : (
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th>ID</th><th>Email</th><th>Username</th><th>Role</th><th>Registered</th><th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.email}</td>
                  <td>{u.username}</td>
                  <td>{u.roles}</td>
                  <td>{u.registrationDate || "—"}</td>
                  <td style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <button onClick={() => startEdit(u)} style={btn}>Edit</button>
                    <button onClick={() => del(u.id)} style={{ ...btn, background: "#ef4444", color: "#fff" }}>Delete</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "#64748b" }}>No users</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {open && (
        <div style={modalOverlay} onClick={() => setOpen(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{editing ? "Edit User" : "Create User"}</h3>
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

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
              <button onClick={() => setOpen(false)} style={btn}>Cancel</button>
              <button onClick={save} style={btnPrimary}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const table = { width: "100%", borderCollapse: "collapse" };
const btn = { padding: "0.45em 0.9em", background: "#e5e7eb", border: "none", borderRadius: 6, cursor: "pointer" };
const btnPrimary = { ...btn, background: "#6366f1", color: "#fff" };
const alertErr = { border: "1px solid #fecdd3", background: "#fef2f2", color: "#e11d48", padding: "0.6em 0.8em", borderRadius: 6, marginBottom: 12 };
const modalOverlay = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" };
const modal = { background: "#fff", borderRadius: 10, padding: 20, minWidth: 360, maxWidth: 520, width: "92%" };
const label = { display: "block", fontSize: 12, color: "#475569", marginTop: 10, marginBottom: 6 };
const input = { width: "100%", padding: "0.5em", borderRadius: 6, border: "1px solid #cbd5e1" };
