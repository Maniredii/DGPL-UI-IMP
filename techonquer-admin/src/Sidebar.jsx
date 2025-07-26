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
  BsPersonCircle
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
      description: 'Overview & Analytics'
    },
    {
      path: '/courses',
      name: 'Courses',
      icon: BsFillArchiveFill,
      description: 'Manage Course Content'
    },
    {
      path: '/users',
      name: 'Users',
      icon: BsPeopleFill,
      description: 'User Management'
    },
    {
      path: '/reports',
      name: 'Reports',
      icon: BsMenuButtonWideFill,
      description: 'Analytics & Reports'
    },
    {
      path: '/files',
      name: 'File Manager',
      icon: BsFolderFill,
      description: 'File Management'
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: BsFillGearFill,
      description: 'System Configuration'
    }
  ];

  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      {/* Brand Header */}
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <BsGrid1X2Fill className="text-white text-sm" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Techonquer</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>×</span>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <BsPersonCircle className="text-white text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user.username || 'Admin User'}</p>
              <p className="text-gray-400 text-xs truncate">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1 text-gray-400 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <BsBoxArrowRight className="text-sm" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="sidebar-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="sidebar-list-item">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 ${
                      isActive 
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                >
                  <div className={`p-2 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'bg-gray-700/50 text-gray-400 group-hover:bg-gray-600/50 group-hover:text-white'
                  }`}>
                    <Icon className="text-lg" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300">{item.description}</p>
                  </div>
                  {isActive && (
                    <BsChevronRight className="text-purple-400 text-sm" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-2">Techonquer Admin</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">System Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}