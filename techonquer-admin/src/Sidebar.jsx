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
      <li className="sidebar-list-item">
        <button
          onClick={() => onToggle(item.id)}
          className={`sidebar-nav-button ${hasActiveChild ? 'active' : ''}`}
        >
          <div className="flex items-center gap-3 flex-1">
            <item.icon className="icon" />
            <span className="nav-label">{item.label}</span>
          </div>
          <div className="nav-chevron">
            {isExpanded ? <BsChevronDown size={14} /> : <BsChevronRight size={14} />}
          </div>
        </button>

        <div className={`nav-submenu ${isExpanded ? 'expanded' : ''}`}>
          <ul className="submenu-list">
            {item.children.map((child) => (
              <li key={child.id} className="submenu-item">
                <NavLink
                  to={child.path}
                  className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                >
                  <child.icon className="submenu-icon" />
                  <span className="submenu-label">{child.label}</span>
                  {child.badge && (
                    <span className={`nav-badge badge-${child.badge.type}`}>
                      {child.badge.text}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }

  return (
    <li className="sidebar-list-item">
      <NavLink
        to={item.path}
        className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}
      >
        <item.icon className="icon" />
        <span className="nav-label">{item.label}</span>
        {item.badge && (
          <span className={`nav-badge badge-${item.badge.type}`}>
            {item.badge.text}
          </span>
        )}
      </NavLink>
    </li>
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
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <BsShieldLock className="text-2xl" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TechOnquer</span>
            <span className="brand-subtitle">Admin Portal</span>
          </div>
        </div>
        <button className="close-button" onClick={OpenSidebar} aria-label="Close sidebar">
          <BsX size={24} />
        </button>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul className="sidebar-list">
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
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-stats">
            <div className="stat-item">
              <BsGraphUpArrow className="stat-icon" />
              <div className="stat-content">
                <span className="stat-value">98.5%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>

          <div className="sidebar-version">
            <span className="version-text">Version 2.1.0</span>
          </div>
        </div>
      </div>
    </aside>
  );
}