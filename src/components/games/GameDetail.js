import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import ErrorMessage from '../ui/ErrorMessage';
import GameService from '../../services/gameService';
import '../../styles/components/GameDetail.css';

/**
 * GameDetail component for displaying detailed game information
 * Implements modern React patterns and comprehensive game details
 */
const GameDetail = () => {
  // Get game ID from URL params
  const { id } = useParams();

  // State management
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Fetch game details
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await GameService.getGameDetails(id);
        setGame(data);
      } catch (err) {
        setError(err.message || 'Failed to load game details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  // Meta information icons
  const MetaIcon = ({ type }) => {
    const icons = {
      rating: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      release: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
        </svg>
      ),
      metacritic: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z" />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="game-detail__loading">
        <Loading size="large" text="Loading game details..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="game-detail__error">
        <ErrorMessage
          title="Failed to load game details"
          description={error}
        />
        <Button
          as={Link}
          to="/"
          variant="secondary"
          className="mt-4"
        >
          Back to Games
        </Button>
      </div>
    );
  }

  // No game data
  if (!game) {
    return (
      <div className="game-detail__error">
        <ErrorMessage
          title="Game not found"
          description="The requested game could not be found."
          variant="warning"
        />
        <Button
          as={Link}
          to="/"
          variant="secondary"
          className="mt-4"
        >
          Back to Games
        </Button>
      </div>
    );
  }

  return (
    <div className="game-detail">
      {/* Hero Section */}
      <div className="game-detail__hero">
        <img
          src={game.image}
          alt={game.title}
          className="game-detail__hero-image"
        />
        <div className="game-detail__title-section">
          <h1 className="game-detail__title">{game.title}</h1>
          <div className="game-detail__meta">
            {game.rating && (
              <div className="game-detail__meta-item">
                <MetaIcon type="rating" />
                {game.rating.toFixed(1)} / 5
              </div>
            )}
            {game.releaseDate && (
              <div className="game-detail__meta-item">
                <MetaIcon type="release" />
                {game.releaseDate}
              </div>
            )}
            {game.metacritic && (
              <div className="game-detail__meta-item">
                <MetaIcon type="metacritic" />
                Metacritic: {game.metacritic}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="game-detail__content">
        <div className="game-detail__main">
          <div className="game-detail__description">
            <h2>About</h2>
            <p>{game.description}</p>
          </div>

          {game.screenshots?.length > 0 && (
            <div className="game-detail__screenshots">
              {game.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="game-detail__screenshot"
                  onClick={() => setSelectedScreenshot(screenshot)}
                >
                  <img src={screenshot} alt={`${game.title} screenshot ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="game-detail__info">
          {game.platforms?.length > 0 && (
            <div className="game-detail__info-section">
              <h3 className="game-detail__info-title">Platforms</h3>
              <div className="game-detail__tags">
                {game.platforms.map((platform, index) => (
                  <span key={index} className="game-detail__tag">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.genres?.length > 0 && (
            <div className="game-detail__info-section">
              <h3 className="game-detail__info-title">Genres</h3>
              <div className="game-detail__tags">
                {game.genres.map((genre, index) => (
                  <span key={index} className="game-detail__tag">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.developers?.length > 0 && (
            <div className="game-detail__info-section">
              <h3 className="game-detail__info-title">Developers</h3>
              <div className="game-detail__tags">
                {game.developers.map((developer, index) => (
                  <span key={index} className="game-detail__tag">
                    {developer}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.website && (
            <Button
              as="a"
              href={game.website}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="w-full mt-4"
            >
              Visit Website
            </Button>
          )}
        </div>
      </div>

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div className="game-detail__modal" onClick={() => setSelectedScreenshot(null)}>
          <div className="game-detail__modal-content">
            <button
              className="game-detail__modal-close"
              onClick={() => setSelectedScreenshot(null)}
              aria-label="Close screenshot"
            >
              ✕
            </button>
            <img
              src={selectedScreenshot}
              alt="Screenshot"
              className="game-detail__modal-image"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetail;
