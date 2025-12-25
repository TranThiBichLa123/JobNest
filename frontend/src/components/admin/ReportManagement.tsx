import { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, AlertTriangle } from 'lucide-react';

interface Report {
  id: number;
  reporter: string;
  reporterEmail: string;
  targetType: 'user' | 'job' | 'post' | 'comment';
  targetId: number;
  targetTitle: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export function ReportManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const reports: Report[] = [
    {
      id: 1,
      reporter: 'John Doe',
      reporterEmail: 'john@example.com',
      targetType: 'job',
      targetId: 1234,
      targetTitle: 'Suspicious Job Posting - Too Good to be True',
      reason: 'Spam/Scam',
      description: 'This job posting promises unrealistic salary and benefits. Looks like a scam.',
      status: 'pending',
      createdAt: '2025-12-24 09:30',
      priority: 'high',
    },
    {
      id: 2,
      reporter: 'Jane Smith',
      reporterEmail: 'jane@example.com',
      targetType: 'post',
      targetId: 567,
      targetTitle: 'Inappropriate Community Post',
      reason: 'Inappropriate Content',
      description: 'Post contains offensive language and violates community guidelines.',
      status: 'reviewing',
      createdAt: '2025-12-24 08:15',
      priority: 'medium',
    },
    {
      id: 3,
      reporter: 'Mike Johnson',
      reporterEmail: 'mike@example.com',
      targetType: 'user',
      targetId: 789,
      targetTitle: 'Fake Employer Account',
      reason: 'Fake Account',
      description: 'User is impersonating a well-known company.',
      status: 'resolved',
      createdAt: '2025-12-23 16:45',
      priority: 'high',
    },
    {
      id: 4,
      reporter: 'Sarah Lee',
      reporterEmail: 'sarah@example.com',
      targetType: 'comment',
      targetId: 321,
      targetTitle: 'Spam Comment',
      reason: 'Spam',
      description: 'Comment is promoting unrelated products.',
      status: 'dismissed',
      createdAt: '2025-12-23 14:20',
      priority: 'low',
    },
    {
      id: 5,
      reporter: 'David Chen',
      reporterEmail: 'david@example.com',
      targetType: 'job',
      targetId: 456,
      targetTitle: 'Discriminatory Job Requirements',
      reason: 'Discrimination',
      description: 'Job posting contains discriminatory requirements based on age and gender.',
      status: 'pending',
      createdAt: '2025-12-24 10:00',
      priority: 'high',
    },
  ];

  const stats = [
    { label: 'Total Reports', value: '247' },
    { label: 'Pending', value: '47' },
    { label: 'Reviewing', value: '12' },
    { label: 'Resolved', value: '188' },
  ];

  const getTargetTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-purple-50 text-purple-600';
      case 'job': return 'bg-blue-50 text-blue-600';
      case 'post': return 'bg-green-50 text-green-600';
      case 'comment': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'reviewing': return 'bg-blue-50 text-blue-600';
      case 'resolved': return 'bg-green-50 text-green-600';
      case 'dismissed': return 'bg-gray-50 text-gray-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-600';
      case 'medium': return 'bg-orange-50 text-orange-600';
      case 'low': return 'bg-gray-50 text-gray-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#101828] mb-1">Reports & Violations</h1>
        <p className="text-[#6a7282]">Review and handle user complaints and violations</p>
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
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Types</option>
            <option value="user">User Reports</option>
            <option value="job">Job Reports</option>
            <option value="post">Post Reports</option>
            <option value="comment">Comment Reports</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewing">Reviewing</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4 text-left text-[#364153]">Report</th>
                <th className="px-6 py-4 text-left text-[#364153]">Reporter</th>
                <th className="px-6 py-4 text-left text-[#364153]">Target</th>
                <th className="px-6 py-4 text-left text-[#364153]">Reason</th>
                <th className="px-6 py-4 text-left text-[#364153]">Priority</th>
                <th className="px-6 py-4 text-left text-[#364153]">Status</th>
                <th className="px-6 py-4 text-left text-[#364153]">Date</th>
                <th className="px-6 py-4 text-left text-[#364153]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {reports.map((report) => (
                <tr key={report.id} className={`hover:bg-gray-50 ${report.status === 'pending' ? 'bg-yellow-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2">
                      {report.priority === 'high' && (
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className="text-[#101828]">Report #{report.id}</p>
                        <p className="text-[#6a7282] text-sm max-w-xs truncate">{report.targetTitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#101828]">{report.reporter}</p>
                      <p className="text-[#6a7282] text-sm">{report.reporterEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm capitalize ${getTargetTypeBadgeColor(report.targetType)}`}>
                        {report.targetType}
                      </span>
                      <span className="text-[#6a7282] text-sm">#{report.targetId}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282]">{report.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getPriorityBadgeColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadgeColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282] text-sm">{report.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {(report.status === 'pending' || report.status === 'reviewing') && (
                        <>
                          <button 
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                            title="Resolve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                            title="Dismiss"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button 
                        className="p-2 hover:bg-gray-100 rounded-lg text-[#6a7282]"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
          <p className="text-[#6a7282]">Showing 1 to 5 of 247 reports</p>
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
