'use client';

import { usePathname } from 'next/navigation';
import ResponsiveNav from '../Home/Navbar/ResponsiveNav';
import Footer from '../Home/Footer/Footer';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      <ResponsiveNav />
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
}
