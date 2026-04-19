'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createArticle } from '../actions';
import 'easymde/dist/easymde.min.css';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });

export default function CreateArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      
      if (res.ok) {
        setCoverImage(data.url);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Markdown content are required!");
      return;
    }
    
    setSaving(true);
    const result = await createArticle({ title, content, coverImage, evidenceUrl });
    setSaving(false);
    
    if (result.success) {
      router.push('/admin');
    } else {
      alert(result.error || 'Failed to create article');
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <h1 style={{ color: 'var(--primary)', marginBottom: '2rem' }}>Create New Article</h1>
      
      <div className="glass-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label" htmlFor="title">Article Title</label>
            <input 
              id="title"
              className="input-field" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Enter title..."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="input-label" htmlFor="cover">Cover Image (Upload)</label>
              <input 
                type="file" 
                id="cover"
                accept="image/jpeg, image/png"
                onChange={handleFileUpload}
                className="input-field"
                style={{ background: 'transparent' }}
              />
              {uploading && <small style={{ color: 'var(--accent)' }}>Uploading...</small>}
              {coverImage && (
                <div style={{ marginTop: '0.5rem' }}>
                  <img src={coverImage} alt="Cover Preview" style={{ maxWidth: '100px', borderRadius: '8px' }} />
                </div>
              )}
            </div>

            <div className="input-group" style={{ marginBottom: 0 }}>
              <label className="input-label" htmlFor="evidence">Evidence Source URL</label>
              <input 
                id="evidence"
                className="input-field" 
                value={evidenceUrl} 
                onChange={e => setEvidenceUrl(e.target.value)} 
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Markdown Content</label>
            <div style={{ background: '#fff', color: '#000', borderRadius: '8px', overflow: 'hidden' }}>
              <SimpleMdeReact 
                value={content} 
                onChange={setContent} 
                options={{ spellChecker: false }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving} style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}>
            {saving ? 'Publishing...' : 'Publish Article'}
          </button>
        </form>
      </div>
    </div>
  );
}
