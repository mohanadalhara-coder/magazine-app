'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'الرئيسية' },
    { href: '/articles', label: 'المقالات' },
    { href: '/caricature', label: 'كاريكاتير' },
    { href: '/videos', label: 'مقاطع مصورة' },
    { href: '/about', label: 'من نحن' },
  ];

  return (
    <header style={{ 
      background: 'var(--glass-bg)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--glass-border)',
      padding: '1rem 0', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100 
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>
              <img src="/logo.jpg" alt="سراج مدرستنا خضراء" style={{ height: '50px', objectFit: 'contain', borderRadius: '8px' }} />
              <span>بسراج <span style={{ color: 'var(--accent)' }}>مدرستنا خضراء</span></span>
            </h1>
          </Link>
          <Link href="/admin" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>لوحة الإدارة</Link>
        </div>
        
        <nav style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--card-border)', paddingTop: '1rem', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              style={{
                color: pathname === link.href ? 'var(--accent)' : 'var(--primary)',
                fontWeight: pathname === link.href ? 'bold' : 'normal',
                textDecoration: 'none',
                paddingBottom: '0.2rem',
                borderBottom: pathname === link.href ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'all 0.2s ease',
                fontSize: '1.1rem'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
