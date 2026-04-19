'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createVideo } from '../actions';
import Link from 'next/link';

export default function CreateVideoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      videoUrl: formData.get('videoUrl'),
    };

    const result = await createVideo(data);
    
    if (result.success) {
      router.push('/admin');
    } else {
      setError(result.error || 'Failed to create video.');
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin" className="btn btn-secondary">← Back</Link>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Add New Video</h1>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid var(--error)' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="title">Title</label>
          <input type="text" id="title" name="title" className="input-field" required placeholder="Enter video title" />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="videoUrl">Video URL</label>
          <input type="url" id="videoUrl" name="videoUrl" className="input-field" required placeholder="https://example.com/video.mp4" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Publish Video' : 'Publish Video'}
          </button>
        </div>
      </form>
    </div>
  );
}
