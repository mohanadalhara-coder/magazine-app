import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ flexGrow: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="container animate-fade-in" style={{ textAlign: 'center', zIndex: 10 }}>
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '4rem 2rem', borderTop: '5px solid var(--accent)' }}>
          <h1 className="text-shimmer" style={{ fontSize: 'Clamp(5rem, 15vw, 8rem)', lineHeight: 1, marginBottom: '1rem', fontWeight: 900 }}>404</h1>
          <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1.5rem', fontWeight: 800 }}>الصفحة غير موجودة</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: 1.6 }}>
            يبدو أنك ضللت الطريق! الورقة التي تبحث عنها سقطت أو لم تُزرع بعد.
            <br />
            لنعد معاً إلى المسار الأخضر الصحيح.
          </p>
          <Link href="/" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none' }}>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
