import { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  company: string;
  employer: string;
  category: string;
  location: string;
  type: string;
  status: 'active' | 'hidden' | 'expired';
  postedAt: string;
  needsReview?: boolean;
}

export function JobModeration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const jobs: Job[] = [
    {
      id: 1001,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      employer: 'hr@techcorp.com',
      category: 'Technology',
      location: 'Ho Chi Minh City',
      type: 'fulltime',
      status: 'active',
      postedAt: '2025-12-20',
      needsReview: false,
    },
    {
      id: 1002,
      title: 'Product Manager',
      company: 'StartupXYZ',
      employer: 'contact@startupxyz.com',
      category: 'Management',
      location: 'Hanoi',
      type: 'fulltime',
      status: 'active',
      postedAt: '2025-12-22',
      needsReview: true,
    },
    {
      id: 1003,
      title: 'Marketing Specialist',
      company: 'Digital Agency',
      employer: 'jobs@digitalagency.com',
      category: 'Marketing',
      location: 'Da Nang',
      type: 'parttime',
      status: 'active',
      postedAt: '2025-12-23',
      needsReview: false,
    },
    {
      id: 1004,
      title: 'Junior Backend Developer',
      company: 'CodeLab',
      employer: 'recruit@codelab.com',
      category: 'Technology',
      location: 'Remote',
      type: 'remote',
      status: 'hidden',
      postedAt: '2025-12-15',
      needsReview: false,
    },
    {
      id: 1005,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      employer: 'hr@creativestudio.com',
      category: 'Design',
      location: 'Ho Chi Minh City',
      type: 'fulltime',
      status: 'active',
      postedAt: '2025-12-24',
      needsReview: true,
    },
  ];

  const stats = [
    { label: 'Total Jobs', value: '3,821' },
    { label: 'Active', value: '3,245' },
    { label: 'Needs Review', value: '12' },
    { label: 'Hidden', value: '564' },
  ];

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'fulltime': return 'bg-blue-50 text-blue-600';
      case 'parttime': return 'bg-purple-50 text-purple-600';
      case 'intern': return 'bg-orange-50 text-orange-600';
      case 'remote': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-600';
      case 'hidden': return 'bg-gray-50 text-gray-600';
      case 'expired': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#101828] mb-1">Job Moderation</h1>
        <p className="text-[#6a7282]">Moderate and manage job postings</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6a7282]" />
            <input
              type="text"
              placeholder="Search jobs by title, company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="needsReview">Needs Review</option>
            <option value="hidden">Hidden</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4 text-left text-[#364153]">Job</th>
                <th className="px-6 py-4 text-left text-[#364153]">Company</th>
                <th className="px-6 py-4 text-left text-[#364153]">Category</th>
                <th className="px-6 py-4 text-left text-[#364153]">Type</th>
                <th className="px-6 py-4 text-left text-[#364153]">Status</th>
                <th className="px-6 py-4 text-left text-[#364153]">Posted</th>
                <th className="px-6 py-4 text-left text-[#364153]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {jobs.map((job) => (
                <tr key={job.id} className={`hover:bg-gray-50 ${job.needsReview ? 'bg-yellow-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[#101828]">{job.title}</p>
                        {job.needsReview && (
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">
                            Review
                          </span>
                        )}
                      </div>
                      <p className="text-[#6a7282] text-sm">{job.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#101828]">{job.company}</p>
                      <p className="text-[#6a7282] text-sm">{job.employer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282]">{job.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getTypeBadgeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadgeColor(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282]">{job.postedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {job.needsReview && (
                        <>
                          <button 
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {job.status === 'hidden' ? (
                        <button 
                          className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"
                          title="Restore"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-lg text-[#6a7282]"
                          title="Hide"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
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
          <p className="text-[#6a7282]">Showing 1 to 5 of 3,821 jobs</p>
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
