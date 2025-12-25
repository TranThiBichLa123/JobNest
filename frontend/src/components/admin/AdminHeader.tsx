import { Bell, LogOut } from 'lucide-react';

export function AdminHeader() {
  return (
    <div className="bg-white border-b border-[#e5e7eb] px-12 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-[#009689] rounded-lg w-10 h-10 flex items-center justify-center">
            <span className="text-white">⚡</span>
          </div>
          <span className="text-[#101828]">JobNest Admin</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="bg-white border border-[#e5e7eb] rounded-lg p-2.5 hover:bg-gray-50">
            <Bell className="w-5 h-5 text-[#364153]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#009689] rounded-full flex items-center justify-center">
              <span className="text-white">A</span>
            </div>
            <div>
              <p className="text-[#101828]">Admin User</p>
              <p className="text-[#6a7282] text-sm">admin@jobnest.com</p>
            </div>
          </div>
          <button className="bg-white border border-[#e5e7eb] rounded-lg p-2.5 hover:bg-gray-50">
            <LogOut className="w-5 h-5 text-[#364153]" />
          </button>
        </div>
      </div>
    </div>
  );
}
