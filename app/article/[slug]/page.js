import { notFound } from 'next/navigation';

export function generateMetadata() {
  return {
    title: `المقالة غير متاحة - بسراج`,
  };
}

export default function ArticlePage() {
  notFound();
  return null;
}
