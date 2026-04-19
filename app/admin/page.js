import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { deleteArticle } from './actions';

export default async function AdminDashboard() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--primary)', m: 0 }}>Articles</h1>
      </div>

      {articles.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--foreground)' }}>
          <p>No articles found. Create your first one!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr' }}>
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
    </div>
  );
}
