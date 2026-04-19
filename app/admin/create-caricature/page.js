'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCaricature } from '../actions';
import Link from 'next/link';

export default function CreateCaricaturePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const title = formData.get('title');
    const file = formData.get('file');

    if (!file || file.size === 0) {
      setError('Please select an image file to upload.');
      setLoading(false);
      return;
    }

    try {
      // 1. Upload the file
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      
      const uploadData = await uploadRes.json();
      
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.error || 'Failed to upload image.');
      }

      // 2. Create the caricature with the returned URL
      const data = {
        title,
        imageUrl: uploadData.url,
      };

      const result = await createCaricature(data);
      
      if (result.success) {
        router.push('/admin');
      } else {
        throw new Error(result.error || 'Failed to create caricature.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin" className="btn btn-secondary">← Back</Link>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Add New Caricature</h1>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--error)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="input-field" required placeholder="Enter caricature title" />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="file">Upload Image</label>
          <input type="file" id="file" name="file" accept="image/jpeg, image/png" className="input-field" required style={{ padding: '0.8rem' }} />
          <small style={{ color: '#64748b', display: 'block', marginTop: '0.4rem' }}>Max size 5MB. JPG or PNG only.</small>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Publish Caricature'}
          </button>
        </div>
      </form>
    </div>
  );
}
