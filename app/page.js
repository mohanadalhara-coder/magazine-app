import Link from 'next/link';

export const metadata = {
  title: 'بسراج مدرستنا خضراء',
  description: 'المجلة الرسمية - بسراج مدرستنا خضراء',
};

export default function Home() {
  // DB fetching removed to make homepage fully static and load instantly.
  // The articles list is currently empty by default.
  const articles = [];

  return (
    <main style={{ flexGrow: 1, position: 'relative' }}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <section className="hero-gradient" style={{ padding: '6rem 2rem', textAlign: 'center', marginBottom: '3rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container animate-fade-in" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'Clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            مرحباً بكم في <span style={{ color: 'var(--accent)' }}>بسراج مدرستنا خضراء</span>
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2.5rem', opacity: 0.9, lineHeight: 1.8 }}>
            المنصة الرائدة لنشر الوعي البيئي وتشجيع المبادرات الخضراء نحو مستقبل أكثر استدامة ووعياً.
          </p>
          <a href="#articles" className="btn" style={{ background: '#fff', color: 'var(--primary)', padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textDecoration: 'none' }}>
            تصفح أحدث المقالات
          </a>
        </div>
      </section>

      <section id="articles" className="container" style={{ padding: '0 1.5rem 4rem' }}>
        <h2 className="text-shimmer" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>أحدث المقالات</h2>
        
        {articles.length === 0 ? (
          <div className="glass-card animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>لا توجد مقالات منشورة بعد. عد قريباً!</p>
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
      </section>
    </main>
  );
}
