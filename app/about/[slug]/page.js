import { notFound } from 'next/navigation';

export function generateMetadata() {
  return {
    title: `عضو غير متاح - بسراج`,
  };
}

export default function MemberPage() {
  notFound();
  return null;
}
