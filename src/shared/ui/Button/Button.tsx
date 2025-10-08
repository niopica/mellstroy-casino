import React from 'react';
import type { ButtonProps } from '../../types';
import './Button.scss';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled ? 'btn--disabled' : '';

  const buttonClass = [baseClass, variantClass, sizeClass, disabledClass, className].filter(Boolean).join(' ');

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} type="button">
      {children}
    </button>
  );
};
