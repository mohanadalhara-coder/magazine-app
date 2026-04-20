export const metadata = {
  title: 'كاريكاتير - بسراج مدرستنا خضراء',
  description: 'معرض الكاريكاتير',
};

export default function CaricaturePage() {
  const items = [];

  return (
    <main style={{ flexGrow: 1, position: 'relative', padding: '3rem 1.5rem' }}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      <div className="container">
        <h2 className="text-shimmer" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>كاريكاتير</h2>
        
        {items.length === 0 ? (
          <div className="glass-card animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎨</span>
            <p style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>لا يوجد كاريكاتير متاح حالياً.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {items.map((item, i) => (
              <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both' }}>
                <div className="glass-card glass-card-hover" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', position: 'relative' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <h3 style={{ color: 'var(--primary)', marginTop: '1.5rem', fontSize: '1.4rem', textAlign: 'center' }}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
