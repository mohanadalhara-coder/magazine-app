import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard',
};

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--background)' }}>
      <header className="glass-card" style={{ padding: '1rem 2rem', borderBottomRightRadius: '0', borderBottomLeftRadius: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary)', margin: 0 }}>
          <img src="/logo.jpg" alt="سراج مدرستنا خضراء" style={{ height: '32px', objectFit: 'contain', borderRadius: '4px' }} />
          <span>Magazine Admin</span>
        </h2>
        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            View Public Site
          </Link>
          <Link href="/admin" style={{ fontWeight: 500, margin: '0 0.5rem' }}>Dashboard</Link>
          <Link href="/admin/create-article" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            + New Article
          </Link>
          <Link href="/admin/create-caricature" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            + New Caricature
          </Link>
          <Link href="/admin/create-video" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            + New Video
          </Link>
          <Link href="/admin/about" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Manage About Us
          </Link>
        </nav>
      </header>
      <main className="container" style={{ flexGrow: 1 }}>
        {children}
      </main>
    </div>
  );
}
