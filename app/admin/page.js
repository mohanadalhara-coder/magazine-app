import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { deleteArticle, deleteCaricature, deleteVideo } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [articles, caricatures, videos] = await Promise.all([
    prisma.article.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.caricature.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.video.findMany({ orderBy: { createdAt: 'desc' } })
  ]);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      
      {/* ARTICLES SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Articles</h1>
        <Link href="/admin/create-article" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>+ Create New</Link>
      </div>

      {articles.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--foreground)', marginBottom: '3rem' }}>
          <p>No articles found. Create your first one!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr', marginBottom: '3rem' }}>
          {articles.map(article => (
            <div key={article.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{article.title}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
                  Pub: {new Date(article.createdAt).toLocaleDateString()} | Slug: {article.slug}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href={`/article/${article.slug}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>View</Link>
                <form action={async () => {
                  'use server';
                  await deleteArticle(article.id);
                }}>
                  <button type="submit" className="btn" style={{ background: 'var(--error)', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CARICATURES SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Caricatures</h1>
        <Link href="/admin/create-caricature" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>+ Add New</Link>
      </div>

      {caricatures.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--foreground)', marginBottom: '3rem' }}>
          <p>No caricatures found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr', marginBottom: '3rem' }}>
          {caricatures.map(caricature => (
            <div key={caricature.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={caricature.imageUrl} alt={caricature.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{caricature.title}</h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
                    Added: {new Date(caricature.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <form action={async () => {
                  'use server';
                  await deleteCaricature(caricature.id);
                }}>
                  <button type="submit" className="btn" style={{ background: 'var(--error)', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIDEOS SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0 }}>Videos</h1>
        <Link href="/admin/create-video" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>+ Add New</Link>
      </div>

      {videos.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--foreground)', marginBottom: '3rem' }}>
          <p>No videos found.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr', marginBottom: '3rem' }}>
          {videos.map(video => (
            <div key={video.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{video.title}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.8 }}>
                  URL: {video.videoUrl}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <form action={async () => {
                  'use server';
                  await deleteVideo(video.id);
                }}>
                  <button type="submit" className="btn" style={{ background: 'var(--error)', color: '#fff', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
