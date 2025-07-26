import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsMenuButtonWideFill, BsFillGearFill, BsFolderFill, BsChatQuoteFill } from 'react-icons/bs';

export default function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-2 md:mr-3">
            <BsGrid1X2Fill className="text-white text-xs md:text-sm" />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-sm md:text-lg truncate">Techonquer</div>
            <div className="text-gray-400 text-xs truncate">Admin Panel</div>
          </div>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>×</span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsGrid1X2Fill className="icon" /> Dashboard
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsFillArchiveFill className="icon" /> Courses
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/testimonials" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsChatQuoteFill className="icon" /> Testimonials
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/users" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsPeopleFill className="icon" /> Users
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/files" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsFolderFill className="icon" /> File Manager
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsMenuButtonWideFill className="icon" /> Reports
          </NavLink>
        </li>
        <li className="sidebar-list-item">
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <BsFillGearFill className="icon" /> Settings
          </NavLink>
        </li>
      </ul>

      {/* User profile section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-xs md:text-sm">A</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs md:text-sm font-medium truncate">Admin User</div>
            <div className="text-gray-400 text-xs truncate">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}