import React, { useEffect, useState } from 'react';

export default function EditProductModal({ product, onCancel, onSave }) {
  const [form, setForm] = useState({
    name: '', description: '', price: '', categoryId: '', file: null
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!product) return;
    setForm({
      name: product.name ?? '',
      description: product.description ?? '',
      price: product.price ?? '',
      categoryId: product.categoryId || '',
      file: null
    });
  }, [product]);

  const updateField = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name?.trim()) return setError('Name is required');
    if (form.price === '' || isNaN(Number(form.price))) return setError('Valid price required');
    if (!form.categoryId) return setError('Category is required');

    try {
      setSaving(true);
      await onSave(product.id, form);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h3>Edit Product #{product?.id}</h3>

        <form onSubmit={submit}>
          <div style={row}><label>Name</label>
            <input type="text" value={form.name} onChange={e => updateField('name', e.target.value)} />
          </div>
          <div style={row}><label>Description</label>
            <textarea rows={3} value={form.description} onChange={e => updateField('description', e.target.value)} />
          </div>
          <div style={row}><label>Price</label>
            <input type="number" step="0.01" value={form.price} onChange={e => updateField('price', e.target.value)} />
          </div>
          <div style={row}><label>Category Id</label>
            <input type="number" value={form.categoryId} onChange={e => updateField('categoryId', e.target.value)} />
          </div>
          <div style={row}><label>Replace File (optional)</label>
            <input type="file" onChange={e => updateField('file', e.target.files?.[0] || null)} />
          </div>

          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}

          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <button type="button" onClick={onCancel} disabled={saving}>Cancel</button>
            <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const row = { display: 'grid', gridTemplateColumns: '140px 1fr', gap: 8, marginBottom: 8 };
const backdropStyle = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 };
const modalStyle = { background: 'white', padding: 16, borderRadius: 8, width: 520, maxWidth: '95vw' };
