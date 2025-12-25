import { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';

interface AuditLog {
  id: number;
  admin: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: number;
  details: string;
  ipAddress: string;
  createdAt: string;
  severity: 'info' | 'warning' | 'critical';
}

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<string>('all');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const logs: AuditLog[] = [
    {
      id: 1001,
      admin: 'Admin User',
      adminEmail: 'admin@jobnest.com',
      action: 'USER_BLOCKED',
      targetType: 'account',
      targetId: 1234,
      details: 'Blocked user account due to policy violation',
      ipAddress: '192.168.1.1',
      createdAt: '2025-12-24 10:30:15',
      severity: 'warning',
    },
    {
      id: 1002,
      admin: 'Admin User',
      adminEmail: 'admin@jobnest.com',
      action: 'JOB_APPROVED',
      targetType: 'jobs',
      targetId: 5678,
      details: 'Approved job posting after review',
      ipAddress: '192.168.1.1',
      createdAt: '2025-12-24 10:15:42',
      severity: 'info',
    },
    {
      id: 1003,
      admin: 'Super Admin',
      adminEmail: 'superadmin@jobnest.com',
      action: 'COMPANY_VERIFIED',
      targetType: 'companies',
      targetId: 123,
      details: 'Verified company profile: TechCorp Inc.',
      ipAddress: '192.168.1.5',
      createdAt: '2025-12-24 09:45:20',
      severity: 'info',
    },
    {
      id: 1004,
      admin: 'Admin User',
      adminEmail: 'admin@jobnest.com',
      action: 'REPORT_RESOLVED',
      targetType: 'reports',
      targetId: 789,
      details: 'Resolved report and took action on violating content',
      ipAddress: '192.168.1.1',
      createdAt: '2025-12-24 09:30:55',
      severity: 'warning',
    },
    {
      id: 1005,
      admin: 'Super Admin',
      adminEmail: 'superadmin@jobnest.com',
      action: 'SETTINGS_UPDATED',
      targetType: 'system_settings',
      targetId: 0,
      details: 'Updated system configuration: commission_rate changed to 5%',
      ipAddress: '192.168.1.5',
      createdAt: '2025-12-24 08:20:30',
      severity: 'critical',
    },
    {
      id: 1006,
      admin: 'Admin User',
      adminEmail: 'admin@jobnest.com',
      action: 'USER_UNBLOCKED',
      targetType: 'account',
      targetId: 4567,
      details: 'Unblocked user account after appeal review',
      ipAddress: '192.168.1.1',
      createdAt: '2025-12-24 08:10:12',
      severity: 'info',
    },
  ];

  const stats = [
    { label: 'Total Logs', value: '15,234' },
    { label: 'Today', value: '143' },
    { label: 'This Week', value: '892' },
    { label: 'Critical Actions', value: '28' },
  ];

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'info': return 'bg-blue-50 text-blue-600';
      case 'warning': return 'bg-yellow-50 text-yellow-600';
      case 'critical': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getActionBadgeColor = (action: string) => {
    if (action.includes('APPROVED') || action.includes('VERIFIED') || action.includes('UNBLOCKED')) {
      return 'bg-green-50 text-green-600';
    }
    if (action.includes('BLOCKED') || action.includes('REJECTED') || action.includes('DELETED')) {
      return 'bg-red-50 text-red-600';
    }
    if (action.includes('UPDATED') || action.includes('MODIFIED')) {
      return 'bg-orange-50 text-orange-600';
    }
    return 'bg-blue-50 text-blue-600';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#101828] mb-1">Audit Logs</h1>
          <p className="text-[#6a7282]">Monitor system activities and admin actions</p>
        </div>
        <button className="bg-[#009689] text-white px-6 py-3 rounded-lg hover:bg-[#00786f] flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Logs
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-[#e5e7eb] p-6">
            <p className="text-[#6a7282] mb-2">{stat.label}</p>
            <h3 className="text-[#101828]">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a7282]" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Actions</option>
            <option value="user">User Actions</option>
            <option value="job">Job Actions</option>
            <option value="company">Company Actions</option>
            <option value="system">System Actions</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4 text-left text-[#364153]">Timestamp</th>
                <th className="px-6 py-4 text-left text-[#364153]">Admin</th>
                <th className="px-6 py-4 text-left text-[#364153]">Action</th>
                <th className="px-6 py-4 text-left text-[#364153]">Target</th>
                <th className="px-6 py-4 text-left text-[#364153]">Details</th>
                <th className="px-6 py-4 text-left text-[#364153]">Severity</th>
                <th className="px-6 py-4 text-left text-[#364153]">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-[#6a7282] text-sm whitespace-nowrap">{log.createdAt}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#101828]">{log.admin}</p>
                      <p className="text-[#6a7282] text-sm">{log.adminEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getActionBadgeColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[#6a7282]">
                      <p className="text-sm">{log.targetType}</p>
                      <p className="text-xs">ID: {log.targetId}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#6a7282] text-sm max-w-xs truncate">{log.details}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getSeverityBadgeColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282] text-sm">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
          <p className="text-[#6a7282]">Showing 1 to 6 of 15,234 logs</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-[#e5e7eb] rounded-lg hover:bg-gray-50 text-[#364153]">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#009689] text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-[#e5e7eb] rounded-lg hover:bg-gray-50 text-[#364153]">2</button>
            <button className="px-4 py-2 border border-[#e5e7eb] rounded-lg hover:bg-gray-50 text-[#364153]">3</button>
            <button className="px-4 py-2 border border-[#e5e7eb] rounded-lg hover:bg-gray-50 text-[#364153]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
