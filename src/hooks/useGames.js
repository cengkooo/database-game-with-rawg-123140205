import { useState, useEffect } from 'react';
import GameService from '../services/gameService';

/**
 * Custom hook untuk mengelola daftar games
 * Mengimplementasikan loading, error states, dan filtering
 */
const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    platforms: [],
    genres: []
  });
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await GameService.getGames({
          search: filters.search,
          platforms: filters.platforms,
          ordering: sortBy
        });
        setGames(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch games');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [filters, sortBy]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateSort = (newSortBy) => {
    setSortBy(newSortBy);
  };

  return {
    games,
    loading,
    error,
    filters,
    sortBy,
    updateFilters,
    updateSort
  };
};

export default useGames;