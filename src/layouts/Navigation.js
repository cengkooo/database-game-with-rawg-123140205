import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import Button from '../components/ui/Button';
import '../styles/layouts/Navigation.css';

/**
 * Navigation Component
 * Implements responsive navigation with mobile menu
 * @returns {JSX.Element} Navigation component
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useGameContext();
  const location = useLocation();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when route changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="nav__icon">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    )},
    { path: '/favorites', label: 'Favorites', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="nav__icon">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    )},
    { path: '/platforms', label: 'Platforms', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="nav__icon">
        <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
        <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
        <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
      </svg>
    )},
    { path: '/genres', label: 'Genres', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="nav__icon">
        <path fillRule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
        <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z" />
      </svg>
    )}
  ];

  return (
    <nav className={`navigation ${theme} ${isMenuOpen ? 'navigation--open' : ''}`}>
      {/* Mobile Menu Button */}
      <Button
        onClick={toggleMenu}
        className="navigation__mobile-toggle"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="navigation__menu-icon"
        >
          {isMenuOpen ? (
            <path d="M6.75 4.5h10.5a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-.75a.75.75 0 01.75-.75zm0 6h10.5a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-.75a.75.75 0 01.75-.75zm0 6h10.5a.75.75 0 01.75.75v.75a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75v-.75a.75.75 0 01.75-.75z" />
          ) : (
            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </Button>

      {/* Navigation Links */}
      <div className="navigation__content">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navigation__link ${isActive ? 'navigation__link--active' : ''}`
            }
          >
            {item.icon}
            <span className="navigation__label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="navigation__overlay"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Navigation;
