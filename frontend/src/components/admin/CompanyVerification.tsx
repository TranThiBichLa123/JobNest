import { useState } from 'react';
import { Search, CheckCircle, XCircle, Eye, Building2 } from 'lucide-react';

interface Company {
  id: number;
  name: string;
  employer: string;
  email: string;
  industry: string;
  address: string;
  verified: boolean;
  jobsPosted: number;
  requestedAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

export function CompanyVerification() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const companies: Company[] = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      employer: 'John Smith',
      email: 'hr@techcorp.com',
      industry: 'Technology',
      address: '123 Tech Street, Ho Chi Minh City',
      verified: true,
      jobsPosted: 24,
      requestedAt: '2025-01-15',
      status: 'verified',
    },
    {
      id: 2,
      name: 'StartupXYZ',
      employer: 'Jane Doe',
      email: 'contact@startupxyz.com',
      industry: 'E-commerce',
      address: '456 Startup Ave, Hanoi',
      verified: false,
      jobsPosted: 3,
      requestedAt: '2025-12-20',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Digital Agency Pro',
      employer: 'Mike Johnson',
      email: 'jobs@digitalagency.com',
      industry: 'Marketing',
      address: '789 Creative Blvd, Da Nang',
      verified: true,
      jobsPosted: 15,
      requestedAt: '2025-02-28',
      status: 'verified',
    },
    {
      id: 4,
      name: 'FinanceHub',
      employer: 'Sarah Lee',
      email: 'hr@financehub.com',
      industry: 'Finance',
      address: '321 Money Street, Ho Chi Minh City',
      verified: false,
      jobsPosted: 0,
      requestedAt: '2025-12-22',
      status: 'pending',
    },
    {
      id: 5,
      name: 'EduTech Solutions',
      employer: 'David Chen',
      email: 'recruit@edutech.com',
      industry: 'Education',
      address: '555 Learning Lane, Hanoi',
      verified: false,
      jobsPosted: 2,
      requestedAt: '2025-12-10',
      status: 'rejected',
    },
  ];

  const stats = [
    { label: 'Total Companies', value: '892' },
    { label: 'Verified', value: '645' },
    { label: 'Pending Review', value: '18' },
    { label: 'Rejected', value: '229' },
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-50 text-green-600';
      case 'pending': return 'bg-yellow-50 text-yellow-600';
      case 'rejected': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#101828] mb-1">Company Verification</h1>
        <p className="text-[#6a7282]">Verify and manage company profiles</p>
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
              placeholder="Search companies..."
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
            <option value="pending">Pending Review</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4 text-left text-[#364153]">Company</th>
                <th className="px-6 py-4 text-left text-[#364153]">Employer</th>
                <th className="px-6 py-4 text-left text-[#364153]">Industry</th>
                <th className="px-6 py-4 text-left text-[#364153]">Jobs Posted</th>
                <th className="px-6 py-4 text-left text-[#364153]">Status</th>
                <th className="px-6 py-4 text-left text-[#364153]">Requested</th>
                <th className="px-6 py-4 text-left text-[#364153]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {companies.map((company) => (
                <tr key={company.id} className={`hover:bg-gray-50 ${company.status === 'pending' ? 'bg-yellow-50/30' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[#101828]">{company.name}</p>
                        <p className="text-[#6a7282] text-sm">{company.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#101828]">{company.employer}</p>
                      <p className="text-[#6a7282] text-sm">{company.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282]">{company.industry}</td>
                  <td className="px-6 py-4 text-[#6a7282]">{company.jobsPosted}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${getStatusBadgeColor(company.status)}`}>
                      {company.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282]">{company.requestedAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {company.status === 'pending' && (
                        <>
                          <button 
                            className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                            title="Verify Company"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                            title="Reject Verification"
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
          <p className="text-[#6a7282]">Showing 1 to 5 of 892 companies</p>
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
