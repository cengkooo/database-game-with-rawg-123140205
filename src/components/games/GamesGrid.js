import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import GameCard from './GameCard';
import Loading from '../ui/Loading';
import Button from '../ui/Button';
import '../../styles/components/GamesGrid.css';

/**
 * GamesGrid component for displaying a grid of game cards
 * Implements responsive grid layout and sorting functionality
 * 
 * @param {Object} props - Component props
 * @param {Array} props.games - Array of game objects
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message
 * @param {function} props.onLoadMore - Load more handler
 * @param {boolean} props.hasMore - Whether more games can be loaded
 * @param {function} props.onSort - Sort handler
 * @param {string} [props.className] - Additional CSS classes
 */
const GamesGrid = ({
  games = [],
  isLoading = false,
  error = null,
  onLoadMore,
  hasMore = false,
  onSort,
  className = '',
}) => {
  // Sort state management
  const [sortBy, setSortBy] = useState('rating');
  
  // Sort options
  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'release', label: 'Release Date' },
    { value: 'name', label: 'Name' },
  ];

  // Handle sort change
  const handleSort = useCallback((value) => {
    setSortBy(value);
    onSort?.(value);
  }, [onSort]);

  // Sort icon component
  const SortIcon = ({ direction = 'desc' }) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      style={{ transform: direction === 'asc' ? 'rotate(180deg)' : 'none' }}
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );

  // Render loading skeletons
  const renderSkeletons = () => (
    Array.from({ length: 8 }).map((_, index) => (
      <div key={`skeleton-${index}`} className="games-grid__skeleton" />
    ))
  );

  // Render grid content based on state
  const renderContent = () => {
    if (error) {
      return (
        <div className="games-grid__error">
          {error}
        </div>
      );
    }

    if (!isLoading && games.length === 0) {
      return (
        <div className="games-grid__empty">
          No games found. Try adjusting your filters.
        </div>
      );
    }

    return (
      <>
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
          />
        ))}
        {isLoading && renderSkeletons()}
      </>
    );
  };

  return (
    <div className={`games-grid-container ${className}`}>
      <div className="games-grid__controls">
        <div className="games-grid__sort">
          <span className="games-grid__sort-label">Sort by:</span>
          {sortOptions.map(option => (
            <button
              key={option.value}
              className={`games-grid__sort-button ${sortBy === option.value ? 'active' : ''}`}
              onClick={() => handleSort(option.value)}
              aria-label={`Sort by ${option.label}`}
            >
              {option.label}
              <SortIcon />
            </button>
          ))}
        </div>
        {games.length > 0 && (
          <div className="games-grid__count">
            {games.length} games found
          </div>
        )}
      </div>

      <div className="games-grid">
        {renderContent()}
      </div>

      {hasMore && !isLoading && !error && (
        <div className="games-grid__load-more">
          <Button
            variant="secondary"
            onClick={onLoadMore}
          >
            Load More Games
          </Button>
        </div>
      )}
    </div>
  );
};

GamesGrid.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number,
      releaseDate: PropTypes.string,
      platforms: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onLoadMore: PropTypes.func,
  hasMore: PropTypes.bool,
  onSort: PropTypes.func,
  className: PropTypes.string,
};

export default GamesGrid;