import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
  BsBoxArrowRight,
  BsChevronRight,
  BsHouseFill,
  BsGearFill,
  BsBell
} from 'react-icons/bs';

// Breadcrumb mapping
const breadcrumbMap = {
  '/dashboard': [{ label: 'Dashboard', path: '/dashboard' }],
  '/courses': [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Courses', path: '/courses' }
  ],
  '/users': [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Users', path: '/users' }
  ],
  '/reports': [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Reports', path: '/reports' }
  ],
  '/files': [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'File Manager', path: '/files' }
  ],
  '/settings': [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Settings', path: '/settings' }
  ],
  '/testimonials': [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Testimonials', path: '/testimonials' }
  ]
};



const NotificationDropdown = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="notification-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-trigger"
        aria-label="Notifications"
      >
        <BsBell size={18} />
        {notifications.length > 0 && (
          <span className="notification-badge">{notifications.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3 className="notification-title">Notifications</h3>
            {notifications.length > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="mark-all-read"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <BsBell className="no-notifications-icon" />
                <p>No new notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <p className="notification-message">{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                  {!notification.read && <div className="notification-dot"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

function Header({ OpenSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New user registration: John Doe',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      message: 'Course "React Fundamentals" has been updated',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      message: 'System backup completed successfully',
      time: '3 hours ago',
      read: true
    }
  ]);

  const handleSignOut = async () => {
    console.log('Signout button clicked');
    try {
      console.log('Calling backend logout...');
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      console.log('Backend logout completed');
    } catch (error) {
      console.log('Backend logout failed (server may be down), proceeding with local logout');
      console.error('Logout error:', error);
    } finally {
      console.log('Clearing localStorage and triggering auth change...');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('authChange'));
      console.log('Navigating to login...');
      navigate('/login');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const breadcrumbItems = breadcrumbMap[location.pathname] || [];
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
            onClick={OpenSidebar}
            aria-label="Toggle sidebar"
          >
            <BsJustify size={20} />
          </button>

          {breadcrumbItems.length > 0 && (
            <nav className="hidden md:flex items-center space-x-2 text-sm">
              {breadcrumbItems.map((item, index) => (
                <div key={item.path} className="flex items-center space-x-2">
                  {index === 0 ? (
                    <button
                      onClick={() => navigate(item.path)}
                      className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <BsHouseFill size={14} />
                      <span>{item.label}</span>
                    </button>
                  ) : (
                    <>
                      <BsChevronRight size={12} className="text-slate-400 dark:text-slate-500" />
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
                    </>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          <NotificationDropdown
            notifications={unreadNotifications}
            onMarkAsRead={markNotificationAsRead}
            onMarkAllAsRead={markAllAsRead}
          />

          <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200" aria-label="Messages">
            <BsFillEnvelopeFill size={18} />
          </button>

          <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all duration-200" aria-label="Settings">
            <BsGearFill size={18} />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-slate-600 dark:text-slate-400">
                <BsPersonCircle size={28} />
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{user.username || 'Admin'}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{user.role || 'Administrator'}</div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-xl border border-red-200 dark:border-red-800 transition-all duration-200 font-medium"
              title="Sign Out"
              aria-label="Sign out"
            >
              <BsBoxArrowRight size={16} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;