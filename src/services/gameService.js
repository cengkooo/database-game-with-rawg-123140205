import api, { endpoints, buildQueryParams } from './api';

/**
 * Game service for handling all game-related API calls
 * Implements error handling and data transformation
 */
class GameService {
  /**
   * Fetch games with filtering and sorting
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search query
   * @param {Array} params.platforms - Platform IDs
   * @param {string} params.ordering - Sorting order
   * @returns {Promise} Formatted game data
   */
  static async getGames(params = {}) {
    try {
      const response = await api.get(endpoints.games, buildQueryParams(params));
      return {
        games: this.formatGames(response.results),
        total: response.count,
        next: response.next,
        previous: response.previous,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Fetch detailed information about a specific game
   * @param {string|number} id - Game ID
   * @returns {Promise} Formatted game details
   */
  static async getGameDetails(id) {
    try {
      const [gameDetails, screenshots] = await Promise.all([
        api.get(endpoints.game(id)),
        api.get(endpoints.screenshots(id)),
      ]);

      return this.formatGameDetails(gameDetails, screenshots.results);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Format games data for consistent structure
   * @param {Array} games - Raw games data
   * @returns {Array} Formatted games
   */
  static formatGames(games) {
    return games.map(game => ({
      id: game.id,
      title: game.name,
      releaseDate: new Date(game.released).toLocaleDateString(),
      rating: game.rating,
      ratingCount: game.ratings_count,
      platforms: game.platforms?.map(p => p.platform.name) || [],
      image: game.background_image,
      genres: game.genres?.map(g => g.name) || [],
      metacritic: game.metacritic,
    }));
  }

  /**
   * Format detailed game data
   * @param {Object} game - Raw game data
   * @param {Array} screenshots - Game screenshots
   * @returns {Object} Formatted game details
   */
  static formatGameDetails(game, screenshots) {
    return {
      id: game.id,
      title: game.name,
      description: game.description_raw,
      releaseDate: new Date(game.released).toLocaleDateString(),
      rating: game.rating,
      ratingCount: game.ratings_count,
      platforms: game.platforms?.map(p => p.platform.name) || [],
      image: game.background_image,
      genres: game.genres?.map(g => g.name) || [],
      metacritic: game.metacritic,
      website: game.website,
      developers: game.developers?.map(d => d.name) || [],
      publishers: game.publishers?.map(p => p.name) || [],
      screenshots: screenshots.map(s => s.image) || [],
      esrbRating: game.esrb_rating?.name || 'Not rated',
    };
  }

  /**
   * Handle API errors
   * @param {Error} error - Error object
   * @returns {Error} Formatted error
   */
  static handleError(error) {
    // You could add logging here
    return {
      message: error.message,
      code: error.response?.status,
      isApiError: true,
    };
  }
}

export default GameService;