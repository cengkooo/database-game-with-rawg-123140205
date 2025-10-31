import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/ErrorMessage.css';

/**
 * ErrorMessage component for displaying error states, warnings, and info messages
 * Implements modern JavaScript features and accessibility
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Error message title
 * @param {string} [props.description] - Detailed error description
 * @param {('error'|'warning'|'info')} [props.variant='error'] - Message variant
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.dismissible] - Whether the message can be dismissed
 * @param {function} [props.onDismiss] - Callback when message is dismissed
 */
const ErrorMessage = ({
  title,
  description,
  variant = 'error',
  className = '',
  dismissible = false,
  onDismiss,
}) => {
  // Using template literals for class names
  const baseClass = 'error-message';
  const classes = `${baseClass} ${variant !== 'error' ? `${baseClass}--${variant}` : ''} ${className}`;

  // SVG icons using template literals for colors
  const icons = {
    error: `#ff0000`,
    warning: `#ffa600`,
    info: `#00b8d4`
  };

  // Arrow function for handling dismiss
  const handleDismiss = () => {
    if (dismissible && onDismiss) {
      onDismiss();
    }
  };

  // Destructuring for current icon color
  const { [variant]: iconColor } = icons;

  return (
    // Using ARIA attributes for accessibility
    <div 
      className={classes}
      role="alert"
      aria-live="polite"
      onClick={handleDismiss}
    >
      <div className="error-message__icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {variant === 'error' && (
            <path
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z"
              fill={iconColor}
            />
          )}
          {variant === 'warning' && (
            <path
              d="M10 0L0 20H20L10 0ZM11 17H9V15H11V17ZM11 13H9V7H11V13Z"
              fill={iconColor}
            />
          )}
          {variant === 'info' && (
            <path
              d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
              fill={iconColor}
            />
          )}
        </svg>
      </div>
      <div className="error-message__content">
        <h4 className="error-message__title">{title}</h4>
        {description && (
          <p className="error-message__description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'warning', 'info']),
  className: PropTypes.string,
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
};

export default ErrorMessage;
