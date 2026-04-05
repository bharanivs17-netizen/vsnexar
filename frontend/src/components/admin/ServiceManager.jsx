import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ id: '', title: '', description: '', projects: 0, clients: 0 });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('services').select('*').order('id');
    if (error) console.error(error);
    else setServices(data || []);
    setLoading(false);
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setEditForm(service);
  };

  const handleSave = async (id) => {
    const { error } = await supabase.from('services').update(editForm).eq('id', id);
    if (error) alert(error.message);
    else {
      setEditingId(null);
      fetchServices();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service? All workers and detail pages for it will be gone.")) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchServices();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('services').insert([editForm]);
    if (error) alert(error.message);
    else {
      setShowAdd(false);
      setEditForm({ id: '', title: '', description: '', projects: 0, clients: 0 });
      fetchServices();
    }
  };

  if (loading) return <div>Loading Services...</div>;

  return (
    <div className="glass" style={{ padding: '20px', borderRadius: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Service Management</h2>
        <button onClick={() => { setShowAdd(!showAdd); setEditForm({ id: '', title: '', description: '', projects: 0, clients: 0 }); }} className="search-button" style={{ padding: '5px 15px' }}>
          {showAdd ? <FaTimes /> : <FaPlus />} {showAdd ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="glass-card" style={{ padding: '20px', marginBottom: '30px', display: 'grid', gap: '10px' }}>
          <input placeholder="ID (e.g. web-design)" value={editForm.id} onChange={e => setEditForm({...editForm, id: e.target.value})} className="search-input" required />
          <input placeholder="Title" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="search-input" required />
          <textarea placeholder="Description" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="search-input" />
          <div style={{ display: 'flex', gap: '10px' }}>
             <input type="number" placeholder="Projects" value={editForm.projects} onChange={e => setEditForm({...editForm, projects: parseInt(e.target.value)})} className="search-input" />
             <input type="number" placeholder="Clients" value={editForm.clients} onChange={e => setEditForm({...editForm, clients: parseInt(e.target.value)})} className="search-input" />
          </div>
          <button type="submit" className="search-button">Save Site-wide Service</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#a78bfa', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Title</th>
            <th style={{ padding: '10px' }}>Projects</th>
            <th style={{ padding: '10px' }}>Clients</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '10px' }}>
                {editingId === s.id ? <input value={editForm.id} readOnly className="search-input" style={{ width: '100px', opacity: 0.5 }} /> : s.id}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === s.id ? <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="search-input" /> : s.title}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === s.id ? <input type="number" value={editForm.projects} onChange={e => setEditForm({...editForm, projects: parseInt(e.target.value)})} className="search-input" style={{ width: '60px' }} /> : s.projects}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === s.id ? <input type="number" value={editForm.clients} onChange={e => setEditForm({...editForm, clients: parseInt(e.target.value)})} className="search-input" style={{ width: '60px' }} /> : s.clients}
              </td>
              <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                {editingId === s.id ? (
                  <>
                    <button onClick={() => handleSave(s.id)} style={{ color: '#10b981', background: 'none', border: 'none', cursor: 'pointer' }}><FaSave /></button>
                    <button onClick={() => setEditingId(null)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(s)} style={{ color: '#a78bfa', background: 'none', border: 'none', cursor: 'pointer' }}><FaEdit /></button>
                    <button onClick={() => handleDelete(s.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceManager;
