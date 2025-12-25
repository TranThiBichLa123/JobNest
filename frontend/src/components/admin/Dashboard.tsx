import { Users, Briefcase, Building2, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function Dashboard() {
  const stats = [
    { 
      title: 'Total Users', 
      value: '12,543', 
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    { 
      title: 'Active Jobs', 
      value: '3,821', 
      change: '+8.2%',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-green-50 text-green-600'
    },
    { 
      title: 'Companies', 
      value: '892', 
      change: '+5.1%',
      trend: 'up',
      icon: Building2,
      color: 'bg-purple-50 text-purple-600'
    },
    { 
      title: 'Pending Reports', 
      value: '47', 
      change: '-15.3%',
      trend: 'down',
      icon: AlertCircle,
      color: 'bg-red-50 text-red-600'
    },
  ];

  const userGrowthData = [
    { month: 'Jan', users: 2400, jobs: 800 },
    { month: 'Feb', users: 3200, jobs: 1100 },
    { month: 'Mar', users: 4100, jobs: 1400 },
    { month: 'Apr', users: 5300, jobs: 1800 },
    { month: 'May', users: 6800, jobs: 2200 },
    { month: 'Jun', users: 8500, jobs: 2800 },
  ];

  const recentActivities = [
    { user: 'John Doe', action: 'Applied to Senior Developer', time: '5 minutes ago', type: 'application' },
    { user: 'TechCorp Inc.', action: 'Posted new job: Product Manager', time: '12 minutes ago', type: 'job' },
    { user: 'Jane Smith', action: 'Reported job posting #1234', time: '25 minutes ago', type: 'report' },
    { user: 'StartupXYZ', action: 'Company verification pending', time: '1 hour ago', type: 'verification' },
    { user: 'Mike Johnson', action: 'Updated profile information', time: '2 hours ago', type: 'profile' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#101828] mb-1">Dashboard</h1>
        <p className="text-[#6a7282]">Overview of platform statistics and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg border border-[#e5e7eb] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-[#101828] mb-1">{stat.value}</h3>
              <p className="text-[#6a7282]">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User & Job Growth */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">User & Job Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6a7282" />
              <YAxis stroke="#6a7282" />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#009689" strokeWidth={2} />
              <Line type="monotone" dataKey="jobs" stroke="#00a63e" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Job Applications */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Monthly Applications</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6a7282" />
              <YAxis stroke="#6a7282" />
              <Tooltip />
              <Bar dataKey="jobs" fill="#009689" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border border-[#e5e7eb]">
        <div className="p-6 border-b border-[#e5e7eb]">
          <h3 className="text-[#101828]">Recent Activities</h3>
        </div>
        <div className="divide-y divide-[#e5e7eb]">
          {recentActivities.map((activity, index) => (
            <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'application' ? 'bg-blue-50 text-blue-600' :
                  activity.type === 'job' ? 'bg-green-50 text-green-600' :
                  activity.type === 'report' ? 'bg-red-50 text-red-600' :
                  activity.type === 'verification' ? 'bg-purple-50 text-purple-600' :
                  'bg-gray-50 text-gray-600'
                }`}>
                  {activity.user.charAt(0)}
                </div>
                <div>
                  <p className="text-[#101828]">{activity.user}</p>
                  <p className="text-[#6a7282]">{activity.action}</p>
                </div>
              </div>
              <p className="text-[#6a7282]">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
