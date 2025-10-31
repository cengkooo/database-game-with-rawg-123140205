import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import '../../styles/components/Input.css';

/**
 * Custom Input component with validation and different variants
 * Implements HTML5 validation attributes and modern React patterns
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} [props.type='text'] - Input type (text, email, search, etc.)
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.value] - Input value
 * @param {function} props.onChange - Change handler
 * @param {boolean} [props.required] - Whether the field is required
 * @param {string} [props.error] - Error message
 * @param {boolean} [props.disabled] - Disabled state
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.validation] - HTML5 validation attributes
 * @param {React.ReactNode} [props.icon] - Icon element
 */
const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  className = '',
  validation = {},
  icon,
  ...props
}, ref) => {
  // Destructure validation props for HTML5 validation
  const {
    minLength,
    maxLength,
    pattern,
    min,
    max,
    step,
  } = validation;

  // Using template literals for class names
  const containerClasses = `input-container ${error ? 'error' : ''} ${className}`;
  const labelClasses = `input-label ${required ? 'required' : ''}`;

  // Arrow function for handling change with validation
  const handleChange = (e) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={containerClasses}>
      {/* Label with accessibility attributes */}
      {label && (
        <label 
          className={labelClasses}
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
      )}
      
      <div style={{ position: 'relative' }}>
        <input
          ref={ref}
          type={type}
          className="input-field"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          // HTML5 validation attributes
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        {icon && <span className="input-icon">{icon}</span>}
      </div>

      {/* Error message with accessibility */}
      {error && (
        <span 
          className="input-error"
          id={`${props.id}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  validation: PropTypes.shape({
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    pattern: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number
  }),
  icon: PropTypes.node,
  id: PropTypes.string,
  name: PropTypes.string
};

export default Input;
