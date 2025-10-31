import { useState, useEffect } from 'react';
import GameService from '../services/gameService';

/**
 * Custom hook untuk mengelola detail game
 * Mengimplementasikan loading dan error states
 */
const useGameDetail = (gameId) => {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const fetchGameDetail = async () => {
      if (!gameId) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const [gameData, screenshotsData] = await Promise.all([
          GameService.getGameDetails(gameId),
          GameService.getGameScreenshots(gameId)
        ]);

        setGame(gameData);
        setScreenshots(screenshotsData);
      } catch (err) {
        setError(err.message || 'Failed to fetch game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetail();
  }, [gameId]);

  return {
    game,
    screenshots,
    loading,
    error
  };
};

export default useGameDetail;