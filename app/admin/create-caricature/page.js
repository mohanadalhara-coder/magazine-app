'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCaricature } from '../actions';
import Link from 'next/link';

export default function CreateCaricaturePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      setError('Title and an uploaded image are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = {
        title,
        imageUrl,
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
          <input 
            type="text" 
            id="title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            className="input-field" 
            required 
            placeholder="Enter caricature title" 
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="imageUrl">Image URL</label>
          <input 
            type="url" 
            id="imageUrl" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
            className="input-field" 
            required 
            placeholder="https://example.com/caricature.png" 
          />
          {imageUrl && (
            <div style={{ marginTop: '0.5rem', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px', textAlign: 'center' }}>
              <img src={imageUrl} alt="Uploaded preview" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '4px' }} />
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading || !imageUrl || !title}>
            {loading ? 'Creating...' : 'Publish Caricature'}
          </button>
        </div>
      </form>
    </div>
  );
}
