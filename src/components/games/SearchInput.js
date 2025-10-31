import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Input from '../ui/Input';
import '../../styles/components/SearchInput.css';

/**
 * SearchInput component for game search functionality
 * Implements debouncing, validation, and modern React patterns
 * 
 * @param {Object} props - Component props
 * @param {function} props.onSearch - Search handler function
 * @param {boolean} [props.isLoading] - Loading state
 * @param {number} [props.debounceTime=300] - Debounce time in milliseconds
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.className] - Additional CSS classes
 */
const SearchInput = ({
  onSearch,
  isLoading = false,
  debounceTime = 300,
  placeholder = 'Search for games...',
  className = '',
}) => {
  // State management using useState hook
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  // Debounced search implementation using useCallback
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId;
      return (value) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          // Validation before search
          if (value.trim().length >= 3 || value.trim().length === 0) {
            setError('');
            onSearch(value);
          } else if (value.trim().length > 0) {
            setError('Please enter at least 3 characters');
          }
        }, debounceTime);
      };
    })(),
    [debounceTime, onSearch]
  );

  // Handle input change with validation
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Clear search functionality
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    setError('');
  };

  // Focus management
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    // Delay blur to allow clicking search results
    setTimeout(() => setIsFocused(false), 200);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => debouncedSearch.cancel?.();
  }, [debouncedSearch]);

  // Search icon component
  const SearchIcon = () => (
    <svg
      className="search-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  // Clear button component
  const ClearButton = () => (
    <button
      type="button"
      className="search-clear-button"
      onClick={handleClear}
      aria-label="Clear search"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );

  return (
    <div className={`search-input ${className} ${isLoading ? 'is-loading' : ''}`}>
      <div className="search-input-container">
        <Input
          type="search"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          error={error}
          icon={searchTerm ? <ClearButton /> : <SearchIcon />}
          validation={{
            minLength: 3,
            pattern: '^[a-zA-Z0-9 ]*$'
          }}
          aria-label="Search games"
          data-testid="game-search-input"
        />
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  debounceTime: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default SearchInput;
