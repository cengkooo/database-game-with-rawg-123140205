import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import SearchInput from '../components/games/SearchInput';
import Button from '../components/ui/Button';
import '../styles/layouts/Header.css';

/**
 * Header Component
 * Implements responsive navigation and search functionality
 * @returns {JSX.Element} Header component
 */
const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme, setSearch } = useGameContext();

  // Handle search input changes
  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
  };

  // Check if current route is home
  const isHome = location.pathname === '/';

  return (
    <header className={`header ${theme}`}>
      <div className="header__container">
        {/* Logo and Navigation */}
        <div className="header__left">
          <Link to="/" className="header__logo">
            <h1>GameDB</h1>
          </Link>
          <nav className="header__nav">
            <Link 
              to="/" 
              className={`header__nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Games
            </Link>
            <Link 
              to="/favorites" 
              className={`header__nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}
            >
              Favorites
            </Link>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="header__right">
          {/* Only show search on home page */}
          {isHome && (
            <div className="header__search">
              <SearchInput
                onSearch={handleSearch}
                placeholder="Search games..."
                className="header__search-input"
              />
            </div>
          )}

          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="secondary"
            className="header__theme-toggle"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="header__theme-icon"
              >
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="header__theme-icon"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
