export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', color: '#fff', padding: '2rem 0', textAlign: 'center', marginTop: 'auto' }}>
      <p style={{ margin: 0, opacity: 0.8 }}>&copy; {new Date().getFullYear()} بسراج مدرستنا خضراء. جميع الحقوق محفوظة.</p>
    </footer>
  );
}
