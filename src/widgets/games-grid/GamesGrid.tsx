import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GamesGrid.scss';

export const GamesGrid: React.FC = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: 'roulette',
      icon: '🎰',
      title: 'Рулетка',
      description: 'Классическая рулетка в неоновом стиле',
    },
    {
      id: 'blackjack',
      icon: '♠️',
      title: 'Блэкджек',
      description: 'Карточная игра против дилера',
    },
    {
      id: 'mizulina',
      icon: '🏃‍♂️',
      title: 'Побег от Мизулиной',
      description: 'Как Dino в Chrome',
    },
    {
      id: 'rolls-royce',
      icon: '🚗',
      title: 'Похищение Rolls Royce',
      description: 'Убеги от охранников',
    },
    {
      id: 'hide-seek',
      icon: '🎯',
      title: 'Прятки с военкоматом',
      description: 'Найди Мелстроя',
    },
    {
      id: 'dice',
      icon: '🎲',
      title: 'Кости',
      description: 'Бросай кубики и выигрывай',
    },
    {
      id: 'millionaire',
      icon: '🧠',
      title: 'Кто хочет стать миллионером',
      description: 'Mellstroy Edition',
    },
  ];

  const handleGameClick = (gameId: string) => {
    navigate(`/games#${gameId}`);
  };

  return (
    <section className="games-section">
      <div className="container">
        <h2 className="section-title">🎰 ИГРЫ КАЗИНО</h2>
        <div className="games-grid">
          {games.map((game) => (
            <div key={game.id} className="game-card" onClick={() => handleGameClick(game.id)}>
              <div className="game-icon">{game.icon}</div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
