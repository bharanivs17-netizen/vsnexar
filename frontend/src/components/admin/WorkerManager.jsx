import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../supabaseClient';
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes, FaCamera } from 'react-icons/fa';

const WorkerManager = () => {
  const [workers, setWorkers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', role: '', rating: 0, service_id: '' });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: wData } = await supabase.from('workers').select('*').order('name');
    const { data: sData } = await supabase.from('services').select('id, title');
    setWorkers(wData || []);
    setServices(sData || []);
    setLoading(false);
  };

  const handleEdit = (worker) => {
    setEditingId(worker.id);
    setEditForm(worker);
  };

  const handleSave = async (id) => {
    const { error } = await supabase.from('workers').update(editForm).eq('id', id);
    if (error) alert(error.message);
    else {
      setEditingId(null);
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      const { error } = await supabase.from('workers').delete().eq('id', id);
      if (error) alert(error.message);
      else fetchData();
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('workers').insert([editForm]);
    if (error) alert(error.message);
    else {
      setShowAdd(false);
      setEditForm({ name: '', role: '', rating: 0, service_id: '' });
      fetchData();
    }
  };

  if (loading) return <div>Loading Workers...</div>;

  return (
    <div className="glass" style={{ padding: '20px', borderRadius: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Team Management</h2>
        <button onClick={() => { setShowAdd(!showAdd); setEditForm({ name: '', role: '', rating: 0, service_id: services[0]?.id || '' }); }} className="search-button" style={{ padding: '5px 15px', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
          {showAdd ? <FaTimes /> : <FaPlus />} {showAdd ? 'Cancel' : 'Add New'}
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="glass-card" style={{ padding: '20px', marginBottom: '30px', display: 'grid', gap: '10px' }}>
          <input placeholder="Name" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="search-input" required />
          <input placeholder="Role (e.g. Lead Designer)" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} className="search-input" />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="number" step="0.1" max="5" placeholder="Rating" value={editForm.rating} onChange={e => setEditForm({...editForm, rating: parseFloat(e.target.value)})} className="search-input" />
            <select value={editForm.service_id} onChange={e => setEditForm({...editForm, service_id: e.target.value})} className="search-input" style={{ background: '#1e293b' }}>
                <option value="">Select Service Specialty</option>
                {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
            </select>
          </div>
          <button type="submit" className="search-button">Add Team Member</button>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ color: '#10b981', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Role</th>
            <th style={{ padding: '10px' }}>Rating</th>
            <th style={{ padding: '10px' }}>Specialty</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((w, index) => (
            <motion.tr 
              key={w.id} 
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ background: 'rgba(255,255,255,0.05)', scale: 1.02 }}
            >
              <td style={{ padding: '10px' }}>
                {editingId === w.id ? <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="search-input" /> : w.name}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === w.id ? <input value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})} className="search-input" /> : w.role}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === w.id ? <input type="number" step="0.1" value={editForm.rating} onChange={e => setEditForm({...editForm, rating: parseFloat(e.target.value)})} className="search-input" style={{ width: '60px' }} /> : w.rating}
              </td>
              <td style={{ padding: '10px' }}>
                {editingId === w.id ? (
                  <select value={editForm.service_id} onChange={e => setEditForm({...editForm, service_id: e.target.value})} className="search-input" style={{ background: '#1e293b' }}>
                    {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                ) : (
                  services.find(s => s.id === w.service_id)?.title || 'Unassigned'
                )}
              </td>
              <td style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                {editingId === w.id ? (
                  <>
                    <button onClick={() => handleSave(w.id)} style={{ color: '#10b981', background: 'none', border: 'none', cursor: 'pointer' }}><FaSave /></button>
                    <button onClick={() => setEditingId(null)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(w)} style={{ color: '#10b981', background: 'none', border: 'none', cursor: 'pointer' }}><FaEdit /></button>
                    <button onClick={() => handleDelete(w.id)} style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><FaTrash /></button>
                  </>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerManager;
