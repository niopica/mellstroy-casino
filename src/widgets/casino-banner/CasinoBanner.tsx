import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CasinoBanner.scss';

export const CasinoBanner: React.FC = () => {
  const navigate = useNavigate();

  const handlePlayNow = () => {
    navigate('/games');
  };

  const handleWatchStream = () => {
    navigate('/stream');
  };

  return (
    <section className="casino-banner">
      <div className="banner-background">
        <div className="banner-overlay"></div>
      </div>
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-title">
            <span className="banner-text-main">🔥 ОТКРЫТИЕ</span>
            <span className="banner-text-casino">MELLSTROY CASINO</span>
            <span className="banner-text-subtitle">— СТАНЬ ЧАСТЬЮ ЛЕГЕНДЫ!</span>
          </div>
          <div className="banner-description">
            <p>Добро пожаловать в самое эксклюзивное казино в мире!</p>
            <p>Играй, выигрывай, помогай другим — всё в одном месте!</p>
          </div>
          <div className="banner-actions">
            <button className="banner-btn primary" onClick={handlePlayNow}>
              <i className="fas fa-play"></i> 🎰 Играть сейчас
            </button>
            <button className="banner-btn secondary" onClick={handleWatchStream}>
              <i className="fas fa-video"></i> 📺 Смотреть стрим
            </button>
          </div>
        </div>
        <div className="banner-effects">
          <div className="sparkle sparkle-1"></div>
          <div className="sparkle sparkle-2"></div>
          <div className="sparkle sparkle-3"></div>
          <div className="sparkle sparkle-4"></div>
          <div className="sparkle sparkle-5"></div>
        </div>
      </div>
    </section>
  );
};
