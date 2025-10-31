import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Button.css';

/**
 * Button component that supports different variants and sizes
 * @param {Object} props - Component props
 * @param {('primary'|'secondary'|'text')} [props.variant='primary'] - Button variant
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Button size
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional CSS classes
 * @param {React.ReactNode} [props.icon] - Icon element to show
 * @param {boolean} [props.isLoading] - Loading state
 * @param {boolean} [props.disabled] - Disabled state
 * @param {function} [props.onClick] - Click handler
 */
const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  className = '',
  icon,
  isLoading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClass = 'button';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    size !== 'medium' && `${baseClass}--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="button__icon">{icon}</span>}
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.node,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
