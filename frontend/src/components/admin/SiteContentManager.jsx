import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { FaSave, FaSpinner, FaEdit } from 'react-icons/fa';

const SiteContentManager = () => {
  const [settings, setSettings] = useState([
    { key: 'hero_title', value: '' },
    { key: 'hero_subtitle', value: '' },
    { key: 'contact_email', value: '' },
    { key: 'contact_phone', value: '' },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) {
        // Table might not exist yet, we'll gracefully fallback
        console.warn("Failed to load settings. Make sure site_settings table exists.", error);
      } else if (data && data.length > 0) {
        // Merge fetched data into state preserving keys
        const newSettings = [...settings];
        data.forEach(dbItem => {
          const idx = newSettings.findIndex(s => s.key === dbItem.key);
          if (idx >= 0) newSettings[idx].value = dbItem.value;
          else newSettings.push({ key: dbItem.key, value: dbItem.value });
        });
        setSettings([...newSettings]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ text: '', type: '' });
    let errorOccurred = false;

    try {
      // Upsert each setting
      for (const item of settings) {
        if (!item.value) continue;
        const { error } = await supabase.from('site_settings')
          .upsert({ key: item.key, value: item.value }, { onConflict: 'key' });
        if (error) errorOccurred = true;
      }

      if (errorOccurred) {
        setMessage({ text: 'Some settings failed to save. Check console.', type: 'error' });
      } else {
        setMessage({ text: 'Settings successfully updated across the site.', type: 'success' });
      }
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }
  };

  const handleInputChange = (index, value) => {
    const newSettings = [...settings];
    newSettings[index].value = value;
    setSettings(newSettings);
  };

  if (loading) {
    return <div style={{ padding: '50px', textAlign: 'center', color: '#94a3b8' }}>Loading site configuration...</div>;
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '15px', padding: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <h2 style={{ marginBottom: '20px', color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaEdit /> Manage Global Site Content
      </h2>
      <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Change texts and configuration variables appearing across your website below.</p>

      {message.text && (
        <div style={{ 
          padding: '15px', 
          borderRadius: '10px', 
          marginBottom: '20px', 
          background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: message.type === 'success' ? '#10b981' : '#ef4444',
          border: `1px solid ${message.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {settings.map((setting, index) => (
          <div key={setting.key} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '8px', color: '#a78bfa', fontWeight: 'bold' }}>
              {setting.key.toUpperCase().replace('_', ' ')}
            </label>
            {setting.key.includes('subtitle') || setting.key.includes('description') ? (
              <textarea 
                value={setting.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                style={{ padding: '15px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                rows="3"
                placeholder={`Set value for ${setting.key}`}
              />
            ) : (
              <input 
                type="text" 
                value={setting.value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                style={{ padding: '12px 15px', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                placeholder={`Set value for ${setting.key}`}
              />
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ 
            padding: '12px 25px', 
            background: 'linear-gradient(90deg, #10b981, #059669)', 
            border: 'none', 
            borderRadius: '10px', 
            color: 'white', 
            fontWeight: 'bold', 
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: saving ? 0.7 : 1
          }}
        >
          {saving ? <><FaSpinner className="fa-spin" /> Saving...</> : <><FaSave /> Save Site Settings</>}
        </button>
      </div>
    </div>
  );
};

export default SiteContentManager;
