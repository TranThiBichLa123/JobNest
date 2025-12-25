'use client';

import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { Dashboard } from '@/components/admin/Dashboard';
import { UserManagement } from '@/components/admin/UserManagement';
import { JobModeration } from '@/components/admin/JobModeration';
import { CompanyVerification } from '@/components/admin/CompanyVerification';
import { ReportManagement } from '@/components/admin/ReportManagement';
import { AuditLogs } from '@/components/admin/AuditLogs';
import { Analytics } from '@/components/admin/Analytics';
import { SystemSettings } from '@/components/admin/SystemSettings';

export default function AdminPage() {
  const [activePage, setActivePage] = useState('dashboard');
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Check if user is admin
    if (!auth?.user) {
      router.push('/');
      return;
    }

    if (auth.user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
  }, [auth, router]);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'jobs':
        return <JobModeration />;
      case 'companies':
        return <CompanyVerification />;
      case 'reports':
        return <ReportManagement />;
      case 'logs':
        return <AuditLogs />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  if (!auth?.user || auth.user.role !== 'ADMIN') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">You do not have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] mt-20">
      <div className="flex">
        <AdminSidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="flex-1 p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
