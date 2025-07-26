import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsBoxArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function Header({ OpenSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const notifications = [
    { id: 1, message: 'New course uploaded', time: '2 minutes ago', type: 'info' },
    { id: 2, message: 'User registration completed', time: '5 minutes ago', type: 'success' },
    { id: 3, message: 'System maintenance scheduled', time: '1 hour ago', type: 'warning' },
  ];

  return (
    <header className='bg-white/10 backdrop-blur-lg border-b border-white/20 p-4 sticky top-0 z-10'>
      <div className='flex items-center justify-between'>
        {/* Left side - Menu and Search */}
                  <div className='flex items-center space-x-2 md:space-x-4'>
            <button
              onClick={OpenSidebar}
              className='p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200'
            >
              <BsJustify className='text-white text-lg md:text-xl' />
            </button>
            
            <div className='relative hidden sm:block'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <BsSearch className='text-gray-400 text-sm md:text-base' />
              </div>
              <input
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-48 md:w-64 text-sm md:text-base'
              />
            </div>
          </div>

        {/* Right side - Notifications and Profile */}
        <div className='flex items-center space-x-2 md:space-x-4'>
          {/* Notifications */}
          <div className='relative'>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className='p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 relative'
            >
              <BsFillBellFill className='text-white text-lg md:text-xl' />
              <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center'>
                {notifications.length}
              </span>
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className='absolute right-0 mt-2 w-64 md:w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50'>
                <div className='p-3 md:p-4 border-b border-gray-700'>
                  <h3 className='text-white font-semibold text-sm md:text-base'>Notifications</h3>
                </div>
                <div className='max-h-48 md:max-h-64 overflow-y-auto'>
                  {notifications.map((notification) => (
                    <div key={notification.id} className='p-3 md:p-4 border-b border-gray-700 hover:bg-gray-700/50 transition-colors duration-200'>
                      <p className='text-white text-xs md:text-sm'>{notification.message}</p>
                      <p className='text-gray-400 text-xs mt-1'>{notification.time}</p>
                    </div>
                  ))}
                </div>
                <div className='p-3 md:p-4'>
                  <button className='text-purple-400 text-xs md:text-sm hover:text-purple-300 transition-colors duration-200'>
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Messages */}
          <button className='p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200'>
            <BsFillEnvelopeFill className='text-white text-lg md:text-xl' />
          </button>

          {/* Profile */}
          <div className='flex items-center space-x-2 md:space-x-3'>
            <div className='w-7 h-7 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white font-semibold text-xs md:text-sm'>A</span>
            </div>
            <div className='hidden sm:block'>
              <p className='text-white text-xs md:text-sm font-medium'>Admin User</p>
              <p className='text-gray-400 text-xs'>Administrator</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className='p-1.5 md:p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200 text-red-400 hover:text-red-300'
            title='Logout'
          >
            <BsBoxArrowRight className='text-lg md:text-xl' />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;