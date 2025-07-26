import React from 'react'
import { useNavigate } from 'react-router-dom'
import
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsBoxArrowRight}
 from 'react-icons/bs'

function Header({OpenSidebar}) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Call backend logout endpoint
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and redirect regardless of API call result
      localStorage.removeItem('user');
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