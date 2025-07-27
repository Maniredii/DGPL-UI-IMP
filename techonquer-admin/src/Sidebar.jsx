import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsFolderFill,
  BsX,
  BsChevronDown,
  BsChevronRight,
  BsShieldLock,
  BsGraphUpArrow,
  BsFileTextFill,
  BsBookFill,
  BsStarFill
} from 'react-icons/bs';

const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BsGrid1X2Fill,
    path: '/dashboard',
    badge: null
  },
  {
    id: 'content',
    label: 'Content Management',
    icon: BsBookFill,
    children: [
      {
        id: 'courses',
        label: 'Courses',
        icon: BsFillArchiveFill,
        path: '/courses',
        badge: { text: '73', type: 'info' }
      },
      {
        id: 'testimonials',
        label: 'Testimonials',
        icon: BsStarFill,
        path: '/testimonials',
        badge: null
      }
    ]
  },
  {
    id: 'users',
    label: 'Users',
    icon: BsPeopleFill,
    path: '/users',
    badge: { text: '1.2k', type: 'success' }
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: BsMenuButtonWideFill,
    path: '/reports',
    badge: null
  },
  {
    id: 'files',
    label: 'File Manager',
    icon: BsFolderFill,
    path: '/files',
    badge: null
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: BsFillGearFill,
    path: '/settings',
    badge: null
  }
];

const NavItem = ({ item, isActive, hasActiveChild, onToggle, isExpanded }) => {
  const location = useLocation();

  if (item.children) {
    return (
      <div className="space-y-1">
        <button
          onClick={() => onToggle(item.id)}
          className={`
            w-full flex items-center justify-between px-3 py-2.5 rounded-xl
            text-left font-medium transition-all duration-200
            ${hasActiveChild
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="text-lg" />
            <span>{item.label}</span>
          </div>
          <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
            <BsChevronRight size={14} />
          </div>
        </button>

        <div className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="ml-6 space-y-1 pt-1">
            {item.children.map((child) => (
              <NavLink
                key={child.id}
                to={child.path}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2 rounded-lg
                  text-sm font-medium transition-all duration-200
                  ${isActive
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <child.icon className="text-base" />
                  <span>{child.label}</span>
                </div>
                {child.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs font-semibold rounded-full
                    ${child.badge.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}
                    ${child.badge.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : ''}
                    ${child.badge.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : ''}
                    ${child.badge.type === 'danger' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : ''}
                  `}>
                    {child.badge.text}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        flex items-center justify-between px-3 py-2.5 rounded-xl
        font-medium transition-all duration-200
        ${isActive
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <item.icon className="text-lg" />
        <span>{item.label}</span>
      </div>
      {item.badge && (
        <span className={`
          px-2 py-0.5 text-xs font-semibold rounded-full
          ${item.badge.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : ''}
          ${item.badge.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : ''}
          ${item.badge.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : ''}
          ${item.badge.type === 'danger' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : ''}
        `}>
          {item.badge.text}
        </span>
      )}
    </NavLink>
  );
};

export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [expandedItems, setExpandedItems] = useState(['content']);
  const location = useLocation();

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActiveChild = (item) => {
    if (!item.children) return false;
    return item.children.some(child => location.pathname === child.path);
  };

  return (
    <aside className={`
      fixed left-0 top-0 h-screen w-72 z-40
      bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl
      border-r border-slate-200 dark:border-slate-700
      shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50
      transition-transform duration-300 ease-in-out
      ${openSidebarToggle ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <BsShieldLock className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">TechOnquer</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Portal</p>
          </div>
        </div>
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors duration-200"
          onClick={OpenSidebar}
          aria-label="Close sidebar"
        >
          <BsX size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col h-[calc(100vh-88px)]">
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={location.pathname === item.path}
              hasActiveChild={isActiveChild(item)}
              onToggle={toggleExpanded}
              isExpanded={expandedItems.includes(item.id)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 mb-3">
            <div className="flex items-center space-x-2">
              <BsGraphUpArrow className="text-green-600 dark:text-green-400" size={16} />
              <div>
                <div className="text-sm font-semibold text-green-700 dark:text-green-300">98.5%</div>
                <div className="text-xs text-green-600 dark:text-green-400">Uptime</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">Version 2.1.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}