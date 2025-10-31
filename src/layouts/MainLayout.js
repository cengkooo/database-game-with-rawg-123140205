import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import '../styles/layouts/MainLayout.css';

/**
 * MainLayout Component
 * Provides consistent layout structure across all pages
 */
const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Navigation />
      <div className="layout__main">
        <Header />
        <main className="layout__content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;