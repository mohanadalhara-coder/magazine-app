'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { createArticle } from '../actions';
import { UploadButton } from '@/utils/uploadthing';
import 'easymde/dist/easymde.min.css';
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
 // Removed local upload logic in favor of Uploadthing
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
              {!coverImage && (
                <div style={{ maxWidth: '320px', width: '100%', border: '1px dashed var(--glass-border)', padding: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' }}>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setCoverImage(res[0].url);
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                </div>
              )}
              {coverImage && (
                <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={coverImage} alt="Cover Preview" style={{ maxWidth: '100px', borderRadius: '8px' }} />
                  <button type="button" onClick={() => setCoverImage('')} className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>Remove</button>
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
