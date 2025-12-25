import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';

export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: 'JobNest',
    siteDescription: 'Professional Job Portal Platform',
    supportEmail: 'support@jobnest.com',
    commissionRate: '5',
    jobPostExpiry: '30',
    maxCVSize: '5',
    maxLogoSize: '2',
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    requireEmailVerification: true,
    requireCompanyVerification: true,
    allowAutoJobApproval: false,
    maintenanceMode: false,
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Mock save
  };

  const handleReset = () => {
    // Mock reset to defaults
    console.log('Resetting to defaults');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#101828] mb-1">System Settings</h1>
          <p className="text-[#6a7282]">Configure system-wide settings and preferences</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleReset}
            className="px-6 py-3 border border-[#e5e7eb] rounded-lg hover:bg-gray-50 text-[#364153] flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset to Defaults
          </button>
          <button
            onClick={handleSave}
            className="bg-[#009689] text-white px-6 py-3 rounded-lg hover:bg-[#00786f] flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <h3 className="text-[#101828] mb-6">General Settings</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#364153] mb-2">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
            </div>
            <div>
              <label className="block text-[#364153] mb-2">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#364153] mb-2">Site Description</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <h3 className="text-[#101828] mb-6">Business Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[#364153] mb-2">Commission Rate (%)</label>
            <input
              type="number"
              value={settings.commissionRate}
              onChange={(e) => setSettings({ ...settings, commissionRate: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
            <p className="text-[#6a7282] text-sm mt-1">Hiring commission percentage</p>
          </div>
          <div>
            <label className="block text-[#364153] mb-2">Job Post Expiry (days)</label>
            <input
              type="number"
              value={settings.jobPostExpiry}
              onChange={(e) => setSettings({ ...settings, jobPostExpiry: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
            <p className="text-[#6a7282] text-sm mt-1">Default job posting duration</p>
          </div>
          <div>
            <label className="block text-[#364153] mb-2">Max CV Size (MB)</label>
            <input
              type="number"
              value={settings.maxCVSize}
              onChange={(e) => setSettings({ ...settings, maxCVSize: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
            <p className="text-[#6a7282] text-sm mt-1">Maximum CV file size</p>
          </div>
        </div>
      </div>

      {/* Upload Settings */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <h3 className="text-[#101828] mb-6">Upload Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#364153] mb-2">Max Logo Size (MB)</label>
            <input
              type="number"
              value={settings.maxLogoSize}
              onChange={(e) => setSettings({ ...settings, maxLogoSize: e.target.value })}
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
            <p className="text-[#6a7282] text-sm mt-1">Maximum company logo size</p>
          </div>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <h3 className="text-[#101828] mb-6">Feature Toggles</h3>
        <div className="space-y-4">
          {[
            {
              id: 'enableEmailNotifications',
              label: 'Enable Email Notifications',
              description: 'Send email notifications to users',
            },
            {
              id: 'enableSMSNotifications',
              label: 'Enable SMS Notifications',
              description: 'Send SMS notifications to users',
            },
            {
              id: 'requireEmailVerification',
              label: 'Require Email Verification',
              description: 'Users must verify their email to activate account',
            },
            {
              id: 'requireCompanyVerification',
              label: 'Require Company Verification',
              description: 'Companies must be verified before posting jobs',
            },
            {
              id: 'allowAutoJobApproval',
              label: 'Auto-approve Jobs',
              description: 'Automatically approve job postings from verified companies',
            },
            {
              id: 'maintenanceMode',
              label: 'Maintenance Mode',
              description: 'Put the site in maintenance mode (users cannot access)',
            },
          ].map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg hover:bg-gray-50"
            >
              <div>
                <p className="text-[#101828]">{feature.label}</p>
                <p className="text-[#6a7282] text-sm">{feature.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[feature.id as keyof typeof settings] as boolean}
                  onChange={(e) =>
                    setSettings({ ...settings, [feature.id]: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#009689]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#009689]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <h3 className="text-[#101828] mb-6">Email Templates</h3>
        <div className="space-y-4">
          {[
            'Welcome Email',
            'Email Verification',
            'Password Reset',
            'Job Application Confirmation',
            'Application Status Update',
            'New Message Notification',
          ].map((template, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-[#e5e7eb] rounded-lg hover:bg-gray-50"
            >
              <p className="text-[#101828]">{template}</p>
              <button className="px-4 py-2 text-[#009689] hover:bg-[#f0fdfa] rounded-lg">
                Edit Template
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Settings */}
      <div className="bg-white rounded-lg border border-[#e5e7eb] p-6">
        <h3 className="text-[#101828] mb-6">Integration Settings</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-[#364153] mb-2">SMTP Server</label>
            <input
              type="text"
              placeholder="smtp.example.com"
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#364153] mb-2">SMTP Username</label>
              <input
                type="text"
                placeholder="username@example.com"
                className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
            </div>
            <div>
              <label className="block text-[#364153] mb-2">SMTP Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[#364153] mb-2">Payment Gateway API Key</label>
            <input
              type="password"
              placeholder="sk_test_••••••••••••••••"
              className="w-full px-4 py-2.5 border border-[#d1d5dc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009689]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
