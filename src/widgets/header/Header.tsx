import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/assets/main-meme.png" alt="Mellstroy" className="logo-img" />
          <span className="logo-text">MELLSTROY CASINO</span>
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
            Главная
          </Link>
          <Link to="/stream" className={`nav-link ${isActive('/stream') ? 'active' : ''}`}>
            🎥 Стрим
          </Link>
          <Link to="/challenges" className={`nav-link ${isActive('/challenges') ? 'active' : ''}`}>
            🎯 Челенджи
          </Link>
          <Link to="/help" className={`nav-link ${isActive('/help') ? 'active' : ''}`}>
            💎 Помощь людям
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
            🧠 О Мелстрое
          </Link>
          <Link to="/games" className={`nav-link ${isActive('/games') ? 'active' : ''}`}>
            🎮 Игры
          </Link>
        </div>

        <div className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};
