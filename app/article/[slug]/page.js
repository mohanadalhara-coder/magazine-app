import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import TTSButton from '../../components/TTSButton';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const article = await prisma.article.findUnique({
    where: { slug: decodedSlug }
  });

  if (!article) return { title: 'Not Found' };
  
  return {
    title: `${article.title} - Secure Magazine`,
  };
}

export default async function ArticlePage({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const article = await prisma.article.findUnique({
    where: { slug: decodedSlug }
  });

  if (!article) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header className="glass-card" style={{ padding: '1rem 0', borderRadius: '0', borderLeft: 'none', borderRight: 'none', borderTop: 'none', position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/">
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>
              <img src="/logo.jpg" alt="سراج مدرستنا خضراء" style={{ height: '40px', objectFit: 'contain', borderRadius: '6px' }} />
              <span>بسراج <span style={{ color: 'var(--accent)' }}>مدرستنا خضراء</span></span>
            </h1>
          </Link>
          <Link href="/" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>&larr; Back to Home</Link>
        </div>
      </header>
      
      <main className="container animate-fade-in" style={{ padding: '3rem 1.5rem', flexGrow: 1, maxWidth: '800px' }}>
        <article className="glass-card" style={{ padding: '3rem' }}>
          <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{article.title}</h1>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            Published on {new Date(article.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          {article.coverImage && (
            <img 
              src={article.coverImage} 
              alt={article.title} 
              style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '12px', marginBottom: '2rem' }} 
            />
          )}

          <TTSButton text={article.content} />

          <div className="markdown-content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>

          {article.evidenceUrl && (
            <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--primary-light)', color: '#fff', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--accent)' }}>Documentation / Evidence</h4>
              <a href={article.evidenceUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
                {article.evidenceUrl}
              </a>
            </div>
          )}
        </article>
      </main>

      <footer style={{ background: 'var(--primary)', color: '#fff', padding: '2rem 0', textAlign: 'center', marginTop: 'auto' }}>
        <p style={{ margin: 0, opacity: 0.8 }}>&copy; {new Date().getFullYear()} Secure Magazine. All rights reserved.</p>
      </footer>
    </div>
  );
}
