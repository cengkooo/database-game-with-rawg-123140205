import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Loading.css';

/**
 * Loading component with different variants and animations
 * Implements CSS animations and modern React patterns
 * 
 * @param {Object} props - Component props
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Size of the loading spinner
 * @param {string} [props.text] - Loading text to display
 * @param {boolean} [props.fullScreen] - Whether to show in fullscreen overlay
 * @param {boolean} [props.withDots] - Whether to show animated dots after text
 * @param {string} [props.className] - Additional CSS classes
 */
const Loading = ({
  size = 'medium',
  text,
  fullScreen = false,
  withDots = false,
  className = '',
}) => {
  // Using template literals for dynamic class names
  const containerClasses = `loading-container ${className}`;
  const spinnerClasses = `loading-spinner ${size !== 'medium' ? `loading-spinner--${size}` : ''}`;
  const textClasses = `loading-text ${withDots ? 'loading-dots' : ''}`;

  // Loading component content
  const loadingContent = (
    <div className={containerClasses}>
      <div 
        className={spinnerClasses}
        role="progressbar"
        aria-label="Loading"
        aria-valuetext={text}
      />
      {text && (
        <p className={textClasses}>
          {text}
        </p>
      )}
    </div>
  );

  // Conditional rendering based on fullScreen prop
  return fullScreen ? (
    <div 
      className="loading-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Loading overlay"
    >
      {loadingContent}
    </div>
  ) : loadingContent;
};

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  withDots: PropTypes.bool,
  className: PropTypes.string,
};

// Custom hook for loading state management
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);
  
  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const stopLoading = React.useCallback(() => setIsLoading(false), []);
  
  return {
    isLoading,
    startLoading,
    stopLoading,
  };
};

export default Loading;
