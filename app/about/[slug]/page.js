import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const member = await prisma.teamMember.findUnique({
    where: { slug: decodedSlug }
  });

  if (!member) return { title: 'Member Not Found' };
  
  return {
    title: `${member.name} - فريق العمل`,
  };
}

export default async function MemberPage({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const member = await prisma.teamMember.findUnique({
    where: { slug: decodedSlug }
  });

  if (!member) {
    notFound();
  }

  return (
    <main className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '80vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/about" className="btn btn-secondary">&rarr; العودة لفريق العمل</Link>
      </div>

      <div className="glass-card" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: member.imageUrl ? `url(${member.imageUrl})` : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '2rem',
          boxShadow: '0 15px 35px rgba(0,0,0,0.15)',
          border: '6px solid white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '5rem',
          color: 'var(--accent)'
        }}>
          {!member.imageUrl && '👤'}
        </div>

        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{member.name}</h1>
        <h3 style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 600, marginBottom: '2rem' }}>{member.role}</h3>

        <div style={{ maxWidth: '600px', margin: '0 auto', lineHeight: '2', color: '#475569', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
          {member.bio || 'لا يوجد سيرة ذاتية متوفرة حالياً لهذا العضو.'}
        </div>
      </div>
    </main>
  );
}
