import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import '../../styles/components/GameCard.css';

/**
 * GameCard component for displaying game information
 * Implements modern React patterns and responsive design
 * 
 * @param {Object} props - Component props
 * @param {Object} props.game - Game data
 * @param {string} props.game.id - Game ID
 * @param {string} props.game.title - Game title
 * @param {string} props.game.image - Game cover image URL
 * @param {number} props.game.rating - Game rating
 * @param {string} props.game.releaseDate - Game release date
 * @param {Array} props.game.platforms - Game platforms
 * @param {string} [props.className] - Additional CSS classes
 */
const GameCard = ({ game, className = '' }) => {
  // State for image loading
  const [isImageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Destructure game data
  const {
    id,
    title,
    image,
    rating,
    releaseDate,
    platforms = [],
  } = game;

  // Handle image loading
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Handle image error
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  // Rating star icon component
  const RatingIcon = () => (
    <svg
      className="game-card__rating-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );

  return (
    <article className={`game-card ${className}`}>
      <div className="game-card__image-container">
        {!imageError ? (
          <>
            <img
              src={image}
              alt={title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            {isImageLoading && (
              <div className="game-card__image-loading">
                <Loading size="small" />
              </div>
            )}
          </>
        ) : (
          <div className="game-card__error">
            Failed to load image
          </div>
        )}
      </div>

      <div className="game-card__content">
        <h2 className="game-card__title" title={title}>
          {title}
        </h2>

        <div className="game-card__info">
          {rating && (
            <div className="game-card__rating">
              <RatingIcon />
              {rating.toFixed(1)}
            </div>
          )}
          {releaseDate && (
            <div className="game-card__release-date">
              {releaseDate}
            </div>
          )}
        </div>

        {platforms.length > 0 && (
          <div className="game-card__platforms">
            {platforms.slice(0, 3).map((platform, index) => (
              <span key={index} className="game-card__platform">
                {platform}
              </span>
            ))}
            {platforms.length > 3 && (
              <span className="game-card__platform">
                +{platforms.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="game-card__actions">
          <Button
            as={Link}
            to={`/game/${id}`}
            variant="primary"
            size="small"
          >
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    releaseDate: PropTypes.string,
    platforms: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  className: PropTypes.string,
};

export default GameCard;
