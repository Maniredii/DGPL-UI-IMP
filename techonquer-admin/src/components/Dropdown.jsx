import React, { useState, useRef, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const Dropdown = ({ 
  trigger, 
  children, 
  position = 'bottom-left',
  className = '',
  disabled = false,
  closeOnClick = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = () => {
    if (closeOnClick) {
      setIsOpen(false);
    }
  };

  const positionClasses = {
    'bottom-left': 'dropdown-bottom-left',
    'bottom-right': 'dropdown-bottom-right',
    'top-left': 'dropdown-top-left',
    'top-right': 'dropdown-top-right',
    'bottom-center': 'dropdown-bottom-center',
    'top-center': 'dropdown-top-center'
  };

  return (
    <div className={`dropdown ${className}`}>
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className={`dropdown-trigger ${disabled ? 'disabled' : ''}`}
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`dropdown-menu ${positionClasses[position]}`}
          onClick={handleItemClick}
        >
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '',
  icon,
  danger = false
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`dropdown-item ${danger ? 'danger' : ''} ${disabled ? 'disabled' : ''} ${className}`}
    >
      {icon && <span className="dropdown-item-icon">{icon}</span>}
      <span className="dropdown-item-text">{children}</span>
    </button>
  );
};

const DropdownDivider = () => {
  return <div className="dropdown-divider" />;
};

const DropdownHeader = ({ children }) => {
  return <div className="dropdown-header">{children}</div>;
};

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;

export default Dropdown;
