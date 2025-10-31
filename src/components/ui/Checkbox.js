import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Checkbox.css';

/**
 * Custom Checkbox component with consistent styling
 * @param {Object} props - Component props
 * @param {string} props.label - Checkbox label text
 * @param {boolean} props.checked - Checked state
 * @param {function} props.onChange - Change handler function
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 */
const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className = '',
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <div 
      className={`checkbox-container ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      <div className={`checkbox ${checked ? 'checked' : ''}`}>
        <svg
          className="checkbox-mark"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {label && <span className="checkbox-label">{label}</span>}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Checkbox;
