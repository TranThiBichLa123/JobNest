import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function Analytics() {
  const userGrowthData = [
    { month: 'Jan', candidates: 1200, employers: 150 },
    { month: 'Feb', candidates: 1800, employers: 210 },
    { month: 'Mar', candidates: 2400, employers: 280 },
    { month: 'Apr', candidates: 3100, employers: 350 },
    { month: 'May', candidates: 4200, employers: 440 },
    { month: 'Jun', candidates: 5500, employers: 550 },
  ];

  const jobApplicationsData = [
    { month: 'Jan', applications: 450, hired: 45 },
    { month: 'Feb', applications: 680, hired: 72 },
    { month: 'Mar', applications: 920, hired: 98 },
    { month: 'Apr', applications: 1200, hired: 135 },
    { month: 'May', applications: 1560, hired: 172 },
    { month: 'Jun', applications: 1890, hired: 208 },
  ];

  const jobCategoryData = [
    { name: 'Technology', value: 1245, color: '#009689' },
    { name: 'Marketing', value: 856, color: '#00a63e' },
    { name: 'Design', value: 621, color: '#3b82f6' },
    { name: 'Finance', value: 489, color: '#a855f7' },
    { name: 'Education', value: 367, color: '#f59e0b' },
    { name: 'Others', value: 243, color: '#6b7280' },
  ];

  const revenueData = [
    { month: 'Jan', packages: 12500, commissions: 8900 },
    { month: 'Feb', packages: 18200, commissions: 11200 },
    { month: 'Mar', packages: 24100, commissions: 15600 },
    { month: 'Apr', packages: 31500, commissions: 19800 },
    { month: 'May', packages: 38900, commissions: 24500 },
    { month: 'Jun', packages: 47200, commissions: 30100 },
  ];

  const stats = [
    { label: 'Total Revenue', value: '$342,580', change: '+23.5%', trend: 'up' },
    { label: 'Active Subscriptions', value: '1,243', change: '+12.3%', trend: 'up' },
    { label: 'Conversion Rate', value: '8.2%', change: '+2.1%', trend: 'up' },
    { label: 'Avg. Response Time', value: '2.3h', change: '-15.2%', trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-[#101828] mb-1">Analytics & Reports</h1>
        <p className="text-[#6a7282]">Comprehensive platform analytics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-[#e5e7eb] p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#6a7282]">{stat.label}</p>
              <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h2 className="text-[#101828]">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">User Growth Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6a7282" />
              <YAxis stroke="#6a7282" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="candidates" stroke="#009689" strokeWidth={2} name="Candidates" />
              <Line type="monotone" dataKey="employers" stroke="#3b82f6" strokeWidth={2} name="Employers" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Job Categories Distribution */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Jobs by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={jobCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {jobCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Applications & Hiring */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Applications & Hiring Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={jobApplicationsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6a7282" />
              <YAxis stroke="#6a7282" />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#009689" radius={[8, 8, 0, 0]} name="Applications" />
              <Bar dataKey="hired" fill="#00a63e" radius={[8, 8, 0, 0]} name="Hired" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6a7282" />
              <YAxis stroke="#6a7282" />
              <Tooltip />
              <Legend />
              <Bar dataKey="packages" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Package Sales" />
              <Bar dataKey="commissions" fill="#a855f7" radius={[8, 8, 0, 0]} name="Commissions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Employers */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Top Employers</h3>
          <div className="space-y-4">
            {[
              { name: 'TechCorp Inc.', jobs: 45, applications: 892 },
              { name: 'Digital Agency Pro', jobs: 32, applications: 654 },
              { name: 'StartupXYZ', jobs: 28, applications: 521 },
              { name: 'FinanceHub', jobs: 24, applications: 487 },
              { name: 'EduTech Solutions', jobs: 19, applications: 398 },
            ].map((employer, index) => (
              <div key={index} className="flex items-center justify-between pb-4 border-b border-[#e5e7eb] last:border-0">
                <div>
                  <p className="text-[#101828]">{employer.name}</p>
                  <p className="text-[#6a7282] text-sm">{employer.jobs} active jobs</p>
                </div>
                <div className="text-right">
                  <p className="text-[#009689]">{employer.applications}</p>
                  <p className="text-[#6a7282] text-sm">applications</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Popular Categories</h3>
          <div className="space-y-4">
            {jobCategoryData.map((category, index) => (
              <div key={index} className="pb-4 border-b border-[#e5e7eb] last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[#101828]">{category.name}</p>
                  <p className="text-[#6a7282]">{category.value} jobs</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(category.value / 1245) * 100}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Milestones */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
          <h3 className="text-[#101828] mb-4">Recent Milestones</h3>
          <div className="space-y-4">
            {[
              { title: '10,000 Users Reached', date: '2025-12-20', icon: '🎉' },
              { title: '1,000 Jobs Posted', date: '2025-12-15', icon: '💼' },
              { title: '500 Companies Verified', date: '2025-12-10', icon: '✅' },
              { title: '50,000 Applications', date: '2025-12-05', icon: '📝' },
              { title: '$500K Revenue', date: '2025-12-01', icon: '💰' },
            ].map((milestone, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-[#e5e7eb] last:border-0">
                <div className="text-2xl">{milestone.icon}</div>
                <div>
                  <p className="text-[#101828]">{milestone.title}</p>
                  <p className="text-[#6a7282] text-sm">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
