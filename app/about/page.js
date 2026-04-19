import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'من نحن - بسراج مدرستنا خضراء',
  description: 'تعرف على فريق عمل مجلة بسراج مدرستنا خضراء',
};

export default async function AboutPage() {
  const [descSetting, members] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { key: 'about_description' } }),
    prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } })
  ]);

  const defaultDescription = 'بِسراج مدرستنا خضراء" هي مجلة مدرسية تهدف إلى نشر الوعي البيئي وتشجيع الطلاب على المشاركة الفعالة في حماية البيئة. نحن فريق ملتزم بتقديم محتوى هادف ومتنوع يبرز إبداعات الطلاب وإنجازاتهم.';
  const displayDescription = descSetting?.value || defaultDescription;

  return (
    <main className="container animate-fade-in" style={{ flexGrow: 1, padding: '3rem 1.5rem' }}>
      <div className="glass-card" style={{ padding: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>عن المجلة</h2>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
          {displayDescription}
        </p>
      </div>

      <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', textAlign: 'center', color: 'var(--primary)' }}>فريق العمل</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {members.map((member) => (
          <Link href={`/about/${member.slug}`} key={member.id}>
            <div className="glass-card glass-card-hover" style={{ padding: '2.5rem 2rem', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                width: '140px', 
                height: '140px', 
                borderRadius: '50%', 
                background: member.imageUrl ? `url(${member.imageUrl})` : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent)',
                fontSize: '3.5rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '4px solid white'
              }}>
                {!member.imageUrl && '👤'}
              </div>
              <h4 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '0.6rem', fontWeight: 800 }}>{member.name}</h4>
              <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '1rem' }}>{member.role}</p>
              
              <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                عرض الملف الشخصي <span style={{ transform: 'rotate(180deg)' }}>&rarr;</span>
              </div>
            </div>
          </Link>
        ))}
        {members.length === 0 && (
          <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.6, padding: '3rem' }}>لم يتم إضافة أعضاء فريق بعد.</p>
        )}
      </div>
    </main>
  );
}
