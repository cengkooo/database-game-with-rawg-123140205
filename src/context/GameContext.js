import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  filters: {
    search: '',
    platforms: [],
    genres: [],
    ordering: 'rating'
  },
  favorites: [],
  theme: 'light'
};

// Action types
const ActionTypes = {
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  SET_SEARCH: 'SET_SEARCH',
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  TOGGLE_THEME: 'TOGGLE_THEME'
};

// Reducer
const gameReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    
    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload
        }
      };
    
    case ActionTypes.TOGGLE_FAVORITE:
      const gameId = action.payload;
      const favorites = state.favorites.includes(gameId)
        ? state.favorites.filter(id => id !== gameId)
        : [...state.favorites, gameId];
      return {
        ...state,
        favorites
      };
    
    case ActionTypes.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };

    default:
      return state;
  }
};

// Create context
const GameContext = createContext(null);

/**
 * Game Provider Component
 * Provides global state management for the application
 */
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Actions
  const updateFilters = (filters) => {
    dispatch({ type: ActionTypes.UPDATE_FILTERS, payload: filters });
  };

  const setSearch = (searchQuery) => {
    dispatch({ type: ActionTypes.SET_SEARCH, payload: searchQuery });
  };

  const toggleFavorite = (gameId) => {
    dispatch({ type: ActionTypes.TOGGLE_FAVORITE, payload: gameId });
  };

  const toggleTheme = () => {
    dispatch({ type: ActionTypes.TOGGLE_THEME });
  };

  // Value object
  const value = {
    state,
    updateFilters,
    setSearch,
    toggleFavorite,
    toggleTheme,
    favorites: state.favorites,
    theme: state.theme,
    filters: state.filters
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

/**
 * Custom hook untuk menggunakan game context
 * Memberikan akses ke state dan actions
 */
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

export default GameContext;