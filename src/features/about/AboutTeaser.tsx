import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/ui';
import './AboutTeaser.scss';

export const AboutTeaser: React.FC = () => {
  return (
    <section className="about-teaser">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">🧠 О Мелстрое</h2>
            <p>
              Мелстрой — это не просто стример, это легенда интернета. Человек, который создал новый формат контента и
              вдохновил миллионы людей по всему миру.
            </p>
            <p>
              От скромного начала до создания собственного казино — история Мелстроя полна невероятных поворотов и
              достижений.
            </p>
            <Link to="/about">
              <Button className="btn btn-lg btn-primary">
                <i className="fas fa-info-circle"></i> Подробнее
              </Button>
            </Link>
          </div>
          <div className="about-image">
            <img
              src="/assets/memes/nice-photo.jpg"
              alt="Mellstroy"
              className="about-img"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
