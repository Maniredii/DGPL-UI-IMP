import React from 'react'
import { useNavigate } from 'react-router-dom'
import
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsBoxArrowRight}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    console.log('Signout button clicked');
    try {
      // Call backend logout endpoint
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
      // Clear local storage and trigger auth change event
      console.log('Clearing localStorage and triggering auth change...');
      localStorage.removeItem('user');

      // Dispatch custom event to notify App component of auth change
      window.dispatchEvent(new Event('authChange'));

      // Navigate to login
      console.log('Navigating to login...');
      navigate('/login');
    }
  };

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <div className='user-info'>
              <BsPersonCircle className='icon'/>
              <span className='username'>{user.username || 'Admin'}</span>
            </div>
            <button
              onClick={handleSignOut}
              className='signout-btn'
              title='Sign Out'
            >
              <BsBoxArrowRight className='icon'/>
            </button>
        </div>
    </header>
  )
}

export default Header