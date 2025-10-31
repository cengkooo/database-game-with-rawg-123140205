import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../ui/Checkbox';
import '../../styles/components/PlatformFilter.css';

/**
 * Platform filter component for filtering games by platform
 * Uses modern React patterns and implements accessibility
 * 
 * @param {Object} props - Component props
 * @param {function} props.onFilterChange - Filter change handler
 * @param {Object} [props.initialSelected] - Initially selected platforms
 * @param {string} [props.className] - Additional CSS classes
 */
const PlatformFilter = ({
  onFilterChange,
  initialSelected = {},
  className = '',
}) => {
  // Platform groups data structure
  const platformGroups = {
    desktop: {
      title: 'Desktop',
      platforms: [
        { id: 'pc', name: 'PC', icon: 'windows' },
        { id: 'mac', name: 'macOS', icon: 'apple' },
        { id: 'linux', name: 'Linux', icon: 'linux' },
      ],
    },
    playstation: {
      title: 'PlayStation',
      platforms: [
        { id: 'ps5', name: 'PlayStation 5', icon: 'playstation' },
        { id: 'ps4', name: 'PlayStation 4', icon: 'playstation' },
        { id: 'ps3', name: 'PlayStation 3', icon: 'playstation' },
      ],
    },
    xbox: {
      title: 'Xbox',
      platforms: [
        { id: 'xbox-series-x', name: 'Xbox Series X/S', icon: 'xbox' },
        { id: 'xbox-one', name: 'Xbox One', icon: 'xbox' },
        { id: 'xbox-360', name: 'Xbox 360', icon: 'xbox' },
      ],
    },
  };

  // State management using useState hook
  const [selectedPlatforms, setSelectedPlatforms] = useState(initialSelected);

  // Calculate selected count
  const selectedCount = Object.values(selectedPlatforms).filter(Boolean).length;

  // Handle platform selection using useCallback
  const handlePlatformChange = useCallback((platformId, checked) => {
    setSelectedPlatforms(prev => {
      const updated = { ...prev, [platformId]: checked };
      onFilterChange(updated);
      return updated;
    });
  }, [onFilterChange]);

  // Reset all filters
  const handleReset = useCallback(() => {
    const resetState = {};
    Object.keys(selectedPlatforms).forEach(key => {
      resetState[key] = false;
    });
    setSelectedPlatforms(resetState);
    onFilterChange(resetState);
  }, [selectedPlatforms, onFilterChange]);

  // Platform icon component
  const PlatformIcon = ({ icon }) => {
    const iconMap = {
      windows: (
        <svg className="platform-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 12V6.75l6-1.32v6.48L3 12m17-9v8.75l-10 .15V5.21L20 3M3 13l6 .09v6.81l-6-1.15V13m17 .25V22l-10-1.91V13.1l10 .15z"/>
        </svg>
      ),
      playstation: (
        <svg className="platform-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9.5 6.5v-4h-6v4h6zm-6 4h6v-4h-6v4zm6 4h-6v4h6v-4zm4-8v4h6v-4h-6zm6 4h-6v4h6v-4zm-6 8h6v-4h-6v4z"/>
        </svg>
      ),
      xbox: (
        <svg className="platform-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 2c2.3 0 4.4.8 6.1 2.1-1.7-.5-3.5-.8-5.3-.8s-3.6.3-5.3.8C9.6 2.8 11.7 2 12 2zm0 20c-2.3 0-4.4-.8-6.1-2.1 1.7.5 3.5.8 5.3.8s3.6-.3 5.3-.8c-1.7 1.3-3.8 2.1-4.5 2.1z"/>
        </svg>
      ),
      apple: (
        <svg className="platform-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      linux: (
        <svg className="platform-icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.198.05-.393.121-.552.146-.322.335-.485.59-.472.254.013.407.157.525.398.119.24.177.494.173.742-.007.438-.178.892-.57 1.024-.393.132-.695.051-.947-.01-.252-.06-.407-.132-.488-.198-.087-.071-.175-.135-.25-.193a.98.98 0 01-.191-.135c-.135-.093-.23-.176-.343-.296a1.81 1.81 0 01-.242-.319c-.063-.11-.12-.231-.157-.351-.037-.119-.073-.199-.087-.332a1.69 1.69 0 01.011-.401c.024-.134.073-.334.127-.531.074-.135.153-.332.257-.47.107-.138.229-.306.439-.351.115-.026.219-.021.318-.023zm-2.182 1.47c.166-.12.335-.23.44-.394.105-.164.175-.367.175-.672 0-.305-.085-.526-.253-.647a.874.874 0 00-.55-.179h-.012c-.218 0-.406.06-.594.195a.932.932 0 00-.438.533 2.35 2.35 0 00-.161.724 2.109 2.109 0 00-.127-.534 1.142 1.142 0 00-.316-.496c-.157-.134-.332-.198-.586-.198h-.012c-.218 0-.371.096-.488.272a1.126 1.126 0 00-.21.534c-.02.194 0 .401.06.401.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.198.05-.393.121-.552.146-.322.335-.485.59-.472.254.013.407.157.525.398.119.24.177.494.173.742-.007.438-.178.892-.57 1.024-.393.132-.695.051-.947-.01-.252-.06-.407-.132-.488-.198a5.299 5.299 0 00-.25-.193 2.108 2.108 0 01-.191-.135c-.135-.093-.23-.176-.343-.296a1.81 1.81 0 01-.242-.319c-.063-.11-.12-.231-.157-.351-.037-.119-.073-.199-.087-.332a1.69 1.69 0 01.011-.401c.024-.134.073-.334.127-.531.074-.135.153-.332.257-.47l.061-.089c.117-.168.236-.336.44-.355.115-.026.219-.021.318-.023zm-4.93.457c.063-.089.146-.169.208-.296.105-.189.157-.385.157-.678 0-.305-.085-.526-.253-.647a.874.874 0 00-.55-.179h-.012c-.218 0-.406.06-.594.195-.19.135-.33.332-.438.533a2.35 2.35 0 00-.161.724 2.109 2.109 0 00-.126-.534 1.142 1.142 0 00-.317-.496c-.157-.134-.332-.198-.586-.198h-.012c-.218 0-.371.096-.488.272-.119.175-.176.446-.176.687 0 .305.085.526.253.647.165.122.373.196.575.196h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.198.05-.393.121-.552.146-.322.335-.485.59-.472.254.013.407.157.525.398.119.24.177.494.173.742-.007.438-.178.892-.57 1.024-.393.132-.695.051-.947-.01-.252-.06-.407-.132-.488-.198a5.299 5.299 0 00-.25-.193 2.108 2.108 0 01-.191-.135c-.135-.093-.23-.176-.343-.296a1.81 1.81 0 01-.242-.319c-.063-.11-.12-.231-.157-.351-.037-.119-.073-.199-.087-.332a1.69 1.69 0 01.011-.401c.024-.134.073-.334.127-.531.074-.135.153-.332.257-.47.103-.138.229-.306.439-.351.115-.026.219-.021.318-.023zm12.643 2.108h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.198.05-.393.121-.552.146-.322.335-.485.59-.472.254.013.407.157.525.398.119.24.177.494.173.742-.007.438-.178.892-.57 1.024-.393.132-.695.051-.947-.01-.252-.06-.407-.132-.488-.198a5.299 5.299 0 00-.25-.193 2.108 2.108 0 01-.191-.135c-.135-.093-.23-.176-.343-.296a1.81 1.81 0 01-.242-.319c-.063-.11-.12-.231-.157-.351-.037-.119-.073-.199-.087-.332a1.69 1.69 0 01.011-.401c.024-.134.073-.334.127-.531.074-.135.153-.332.257-.47.103-.138.229-.306.439-.351.115-.026.219-.021.318-.023z"/>
        </svg>
      ),
    };
    return iconMap[icon] || null;
  };

  return (
    <div className={`platform-filter ${className}`}>
      <h3 className="platform-filter__title">
        Platforms
        {selectedCount > 0 && (
          <span className="platform-filter__count">
            {selectedCount} selected
          </span>
        )}
        {selectedCount > 0 && (
          <button
            className="platform-filter__reset"
            onClick={handleReset}
            aria-label="Reset platform filters"
          >
            Reset
          </button>
        )}
      </h3>
      
      <div className="platform-filter__list">
        {Object.entries(platformGroups).map(([groupKey, group]) => (
          <div key={groupKey} className="platform-group">
            <div className="platform-group__title">
              {group.title}
            </div>
            {group.platforms.map(platform => (
              <Checkbox
                key={platform.id}
                label={(
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlatformIcon icon={platform.icon} />
                    {platform.name}
                  </span>
                )}
                checked={!!selectedPlatforms[platform.id]}
                onChange={(checked) => handlePlatformChange(platform.id, checked)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

PlatformFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  initialSelected: PropTypes.object,
  className: PropTypes.string,
};

export default PlatformFilter;
