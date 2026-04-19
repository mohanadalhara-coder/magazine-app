'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { updateAboutDescription, createTeamMember, deleteTeamMember } from '../actions';
import Link from 'next/link';

export default function ManageAboutPage() {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingDesc, setSavingDesc] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [descRes, teamRes] = await Promise.all([
          fetch('/api/settings?key=about_description'),
          fetch('/api/team')
        ]);
        
        if (descRes.ok) {
          const data = await descRes.json();
          setDescription(data.value || '');
        }
        
        if (teamRes.ok) {
          const data = await teamRes.json();
          setTeam(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch about data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDescSubmit = async (e) => {
    e.preventDefault();
    setSavingDesc(true);
    const result = await updateAboutDescription(description);
    if (!result.success) {
      alert(result.error);
    } else {
      alert('Description updated successfully!');
    }
    setSavingDesc(false);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setAddingMember(true);
    setError('');

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const role = formData.get('role');
    const bio = formData.get('bio');
    const file = formData.get('file');

    try {
      let imageUrl = null;
      if (file && file.size > 0) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
        imageUrl = uploadData.url;
      }

      const result = await createTeamMember({ name, role, bio, imageUrl });
      if (result.success) {
        setTeam([...team, result.item]);
        e.target.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setAddingMember(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    const result = await deleteTeamMember(id);
    if (result.success) {
      setTeam(team.filter(m => m.id !== id));
    } else {
      alert(result.error);
    }
  };

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading settings...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Manage "About Us" Page</h1>

      {/* Section A: Description */}
      <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Magazine Description</h2>
        <form onSubmit={handleDescSubmit}>
          <div className="input-group">
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              style={{ minHeight: '150px', padding: '1rem', resize: 'vertical' }}
              placeholder="Enter the main description for the About Us page..."
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={savingDesc}>
            {savingDesc ? 'Saving...' : 'Update Description'}
          </button>
        </form>
      </section>

      {/* Section B: Add Member */}
      <section className="glass-card" style={{ padding: '2rem', marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Add Team Member</h2>
        {error && <p style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleAddMember}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="input-label">Name</label>
              <input type="text" name="name" className="input-field" required placeholder="Full Name" />
            </div>
            <div className="input-group">
              <label className="input-label">Role</label>
              <input type="text" name="role" className="input-field" required placeholder="e.g. Editor-in-Chief" />
            </div>
          </div>
          <div className="input-group" style={{ marginTop: '1.5rem' }}>
            <label className="input-label">Bio (Optional)</label>
            <textarea name="bio" className="input-field" style={{ minHeight: '100px' }} placeholder="Short biography..."></textarea>
          </div>
          <div className="input-group" style={{ marginTop: '1.5rem' }}>
            <label className="input-label">Profile Picture (Optional)</label>
            <input type="file" name="file" accept="image/jpeg, image/png" className="input-field" style={{ padding: '0.8rem' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem' }} disabled={addingMember}>
            {addingMember ? 'Adding...' : 'Add Team Member'}
          </button>
        </form>
      </section>

      {/* Section C: List Team */}
      <section>
        <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Currently in Team</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {team.map(member => (
            <div key={member.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {member.imageUrl ? (
                <img src={member.imageUrl} alt={member.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>👤</div>
              )}
              <div style={{ flexGrow: 1 }}>
                <h4 style={{ margin: 0, color: 'var(--primary)' }}>{member.name}</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{member.role}</p>
              </div>
              <button onClick={() => handleDeleteMember(member.id)} className="btn" style={{ background: 'var(--error)', color: 'white', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Delete</button>
            </div>
          ))}
          {team.length === 0 && <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.6 }}>No team members added yet.</p>}
        </div>
      </section>
    </div>
  );
}
