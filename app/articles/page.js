import Link from 'next/link';

export const metadata = {
  title: 'المقالات - بسراج مدرستنا خضراء',
  description: 'جميع المقالات المنشورة في المجلة',
};

export default function ArticlesPage() {
  const articles = [];

  return (
    <main style={{ flexGrow: 1, position: 'relative', padding: '3rem 1.5rem' }}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="container">
        <h2 className="text-shimmer" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>جميع المقالات</h2>
        
        {articles.length === 0 ? (
          <div className="glass-card animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>لا توجد مقالات منشورة بعد.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {articles.map((article, i) => (
              <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}>
                <Link href={`/article/${article.slug}`}>
                  <article className="glass-card glass-card-hover" style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      {new Date(article.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>

                    {article.coverImage ? (
                      <div style={{ height: '220px', width: '100%', backgroundImage: `url(${article.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid var(--glass-border)' }} />
                    ) : (
                      <div style={{ height: '220px', width: '100%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--accent)', fontSize: '4rem', opacity: 0.5 }}>📰</span>
                      </div>
                    )}
                    
                    <div style={{ padding: '2rem 1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.5rem', lineHeight: 1.5 }}>{article.title}</h3>
                      
                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                        اقرأ المزيد <span style={{ marginRight: '0.5rem', transform: 'rotate(180deg)', display: 'inline-block' }}>&rarr;</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
