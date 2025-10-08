import React from 'react';
import { Card } from '../../shared/ui';
import './StreamSection.scss';

interface StreamCardProps {
  image: string;
  title: string;
  status: 'online' | 'offline';
  viewers: number;
  link: string;
}

const StreamCard: React.FC<StreamCardProps> = ({ image, title, status, viewers }) => {
  return (
    <Card className="stream-card">
      <div className="stream-thumbnail">
        <img src={image} alt={title} onError={(e) => (e.currentTarget.src = '/assets/images/stream-placeholder.jpg')} />
        <span className={`status ${status}`}>{status === 'online' ? 'LIVE' : 'OFFLINE'}</span>
        <div className="stream-overlay">
          <i className="fas fa-play"></i>
        </div>
      </div>
      <div className="stream-info">
        <h3>{title}</h3>
        <div className="stream-stats">
          <span className="viewers">
            <i className="fas fa-eye"></i> {viewers.toLocaleString()}
          </span>
        </div>
      </div>
    </Card>
  );
};

export const StreamSection: React.FC = () => {
  const streams = [
    {
      image: '/assets/streams/stream1.jpg',
      title: 'Mellstroy Live',
      status: 'online' as const,
      viewers: 1234567,
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      image: '/assets/streams/stream2.jpg',
      title: 'Казино Ночь',
      status: 'offline' as const,
      viewers: 856432,
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      image: '/assets/streams/stream3.jpg',
      title: 'Помощь Людям',
      status: 'offline' as const,
      viewers: 654321,
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
  ];

  return (
    <section className="stream-section">
      <div className="container">
        <h2 className="section-title">📺 ПОСЛЕДНИЕ СТРИМЫ</h2>
        <div className="stream-grid">
          {streams.map((stream, index) => (
            <StreamCard key={index} {...stream} />
          ))}
        </div>
      </div>
    </section>
  );
};
