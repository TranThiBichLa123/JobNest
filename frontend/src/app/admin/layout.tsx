import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - JobNest',
  description: 'JobNest Admin Panel',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
