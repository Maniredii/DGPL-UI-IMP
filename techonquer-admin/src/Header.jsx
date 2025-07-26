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

const Breadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <button
            onClick={() => navigate('/dashboard')}
            className="breadcrumb-home"
            aria-label="Go to Dashboard"
          >
            <BsHouseFill size={14} />
          </button>
        </li>
        {items.map((item, index) => (
          <li key={item.path} className="breadcrumb-item">
            <BsChevronRight className="breadcrumb-separator" size={12} />
            {index === items.length - 1 ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => navigate(item.path)}
                className="breadcrumb-link"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
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
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <button className="menu-icon" onClick={OpenSidebar} aria-label="Toggle sidebar">
            <BsJustify size={20} />
          </button>

          {breadcrumbItems.length > 0 && (
            <Breadcrumbs items={breadcrumbItems} />
          )}
        </div>

        <div className="header-center">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <BsSearch className="search-icon" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
          </form>
        </div>

        <div className="header-right">
          <NotificationDropdown
            notifications={unreadNotifications}
            onMarkAsRead={markNotificationAsRead}
            onMarkAllAsRead={markAllAsRead}
          />

          <button className="header-action-btn" aria-label="Messages">
            <BsFillEnvelopeFill size={18} />
          </button>

          <button className="header-action-btn" aria-label="Settings">
            <BsGearFill size={18} />
          </button>

          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                <BsPersonCircle size={32} />
              </div>
              <div className="user-details">
                <span className="username">{user.username || 'Admin'}</span>
                <span className="user-role">{user.role || 'Administrator'}</span>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="signout-btn"
              title="Sign Out"
              aria-label="Sign out"
            >
              <BsBoxArrowRight size={18} />
              <span className="signout-text">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;