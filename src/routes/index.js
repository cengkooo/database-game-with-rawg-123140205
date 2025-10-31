import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page Components
import Home from '../pages/Home';
import GameDetail from '../pages/GameDetail';
import Favorites from '../pages/Favorites';
import Platforms from '../pages/Platforms';
import Genres from '../pages/Genres';
import NotFound from '../pages/NotFound';

/**
 * AppRoutes Component
 * Centralized routing configuration
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game/:id" element={<GameDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/platforms" element={<Platforms />} />
      <Route path="/genres" element={<Genres />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default AppRoutes;