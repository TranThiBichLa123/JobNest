import { useState } from 'react';
import { Search, Filter, Download, Lock, Unlock, MoreVertical } from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'CANDIDATE' | 'EMPLOYER' | 'ADMIN';
  status: 'PENDING' | 'ACTIVE' | 'BLOCKED';
  lastLogin: string;
  createdAt: string;
}

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const users: User[] = [
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      role: 'CANDIDATE',
      status: 'ACTIVE',
      lastLogin: '2025-12-24 10:30',
      createdAt: '2025-01-15',
    },
    {
      id: 2,
      username: 'techcorp_hr',
      email: 'hr@techcorp.com',
      role: 'EMPLOYER',
      status: 'ACTIVE',
      lastLogin: '2025-12-24 09:15',
      createdAt: '2025-02-20',
    },
    {
      id: 3,
      username: 'jane_smith',
      email: 'jane@example.com',
      role: 'CANDIDATE',
      status: 'PENDING',
      lastLogin: 'Never',
      createdAt: '2025-12-23',
    },
    {
      id: 4,
      username: 'startupxyz',
      email: 'contact@startupxyz.com',
      role: 'EMPLOYER',
      status: 'BLOCKED',
      lastLogin: '2025-12-20 14:20',
      createdAt: '2025-03-10',
    },
    {
      id: 5,
      username: 'mike_johnson',
      email: 'mike@example.com',
      role: 'CANDIDATE',
      status: 'ACTIVE',
      lastLogin: '2025-12-24 08:45',
      createdAt: '2025-04-05',
    },
  ];

  const stats = [
    { label: 'Total Users', value: '12,543' },
    { label: 'Candidates', value: '8,921' },
    { label: 'Employers', value: '3,621' },
    { label: 'Blocked', value: '98' },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'CANDIDATE': return 'bg-blue-50 text-blue-600';
      case 'EMPLOYER': return 'bg-purple-50 text-purple-600';
      case 'ADMIN': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-50 text-green-600';
      case 'PENDING': return 'bg-yellow-50 text-yellow-600';
      case 'BLOCKED': return 'bg-red-50 text-red-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#101828] mb-1">User Management</h1>
          <p className="text-[#6a7282]">Manage user accounts across the system</p>
        </div>
        <button className="bg-[#009689] text-white px-6 py-3 rounded-lg hover:bg-[#00786f] flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Users
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
              placeholder="Search by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>

          {/* Role Filter */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Roles</option>
            <option value="CANDIDATE">Candidates</option>
            <option value="EMPLOYER">Employers</option>
            <option value="ADMIN">Admins</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
          >
            <option value="all">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-[#e5e7eb]">
              <tr>
                <th className="px-6 py-4 text-left text-[#364153]">User</th>
                <th className="px-6 py-4 text-left text-[#364153]">Role</th>
                <th className="px-6 py-4 text-left text-[#364153]">Status</th>
                <th className="px-6 py-4 text-left text-[#364153]">Last Login</th>
                <th className="px-6 py-4 text-left text-[#364153]">Created</th>
                <th className="px-6 py-4 text-left text-[#364153]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e7eb]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-[#101828]">{user.username}</p>
                      <p className="text-[#6a7282] text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getRoleBadgeColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6a7282]">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-[#6a7282]">{user.createdAt}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {user.status === 'BLOCKED' ? (
                        <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">
                          <Unlock className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                          <Lock className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-[#6a7282]">
                        <MoreVertical className="w-4 h-4" />
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
          <p className="text-[#6a7282]">Showing 1 to 5 of 12,543 users</p>
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
