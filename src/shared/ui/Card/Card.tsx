import React from 'react';
import type { CardProps } from '../../types';
import './Card.scss';

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const baseClass = 'card';
  const clickableClass = onClick ? 'card--clickable' : '';

  const cardClass = [baseClass, clickableClass, className].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};
