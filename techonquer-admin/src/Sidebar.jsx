import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BsGrid1X2Fill, 
  BsFillArchiveFill, 
  BsPeopleFill, 
  BsMenuButtonWideFill, 
  BsFillGearFill, 
  BsFolderFill,
  BsChevronRight,
  BsBoxArrowRight,
  BsPersonCircle,
  BsLightning,
  BsShieldCheck,
  BsGraphUp
} from 'react-icons/bs';

export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const location = useLocation();
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: BsGrid1X2Fill,
      description: 'Overview & Analytics',
      badge: null
    },
    {
      path: '/courses',
      name: 'Courses',
      icon: BsFillArchiveFill,
      description: 'Manage Course Content',
      badge: 'New'
    },
    {
      path: '/users',
      name: 'Users',
      icon: BsPeopleFill,
      description: 'User Management',
      badge: null
    },
    {
      path: '/reports',
      name: 'Reports',
      icon: BsMenuButtonWideFill,
      description: 'Analytics & Reports',
      badge: null
    },
    {
      path: '/files',
      name: 'File Manager',
      icon: BsFolderFill,
      description: 'File Management',
      badge: null
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: BsFillGearFill,
      description: 'System Configuration',
      badge: null
    }
  ];

  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      {/* Brand Header */}
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <BsGrid1X2Fill className="text-white text-lg" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Techonquer
              </h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>×</span>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-b border-white/10">
          <div className="relative group">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-white/5 to-white/10 rounded-xl backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BsPersonCircle className="text-white text-xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm truncate">{user.username || 'Admin User'}</p>
                <p className="text-gray-400 text-xs truncate">{user.email}</p>
                <div className="flex items-center gap-1 mt-1">
                  <BsShieldCheck className="text-green-400 text-xs" />
                  <span className="text-green-400 text-xs font-medium">Admin</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-400 transition-all duration-200 hover:scale-110 rounded-lg hover:bg-red-500/10"
                title="Logout"
              >
                <BsBoxArrowRight className="text-sm" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation</h3>
        </div>
        <ul className="sidebar-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="sidebar-list-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-white shadow-lg' 
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"></div>
                  )}
                  
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg' 
                      : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-white'
                  }`}>
                    <Icon className="text-lg" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{item.name}</p>
                      {item.badge && (
                        <span className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300">{item.description}</p>
                  </div>
                  
                  {isActive && (
                    <BsChevronRight className="text-purple-400 text-sm animate-pulse" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl hover:from-purple-500/30 hover:to-blue-500/30 transition-all duration-200 group">
              <div className="p-2 bg-purple-500/30 rounded-lg group-hover:bg-purple-500/50 transition-colors">
                <BsLightning className="text-purple-300 text-sm" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Quick Report</p>
                <p className="text-gray-400 text-xs">Generate instant report</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-200 group">
              <div className="p-2 bg-green-500/30 rounded-lg group-hover:bg-green-500/50 transition-colors">
                <BsGraphUp className="text-green-300 text-sm" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Analytics</p>
                <p className="text-gray-400 text-xs">View detailed analytics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-medium">System Online</span>
          </div>
          <p className="text-xs text-gray-500 mb-2">Techonquer Admin v2.0</p>
          <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
            <span>Secure</span>
            <span>•</span>
            <span>Fast</span>
            <span>•</span>
            <span>Reliable</span>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
    </aside>
  );
}