import React from 'react';
import './OtherStreams.scss';

interface Stream {
  id: string;
  title: string;
  thumbnail: string;
  viewers: string;
  url: string;
}

export const OtherStreams: React.FC = () => {
  const streams: Stream[] = [
    {
      id: '1',
      title: 'Mellstroy Live',
      thumbnail: '/assets/streams/stream1.jpg',
      viewers: '1.2M зрителей',
      url: 'https://www.youtube.com/watch?v=3PwZK_zkrPQ',
    },
    {
      id: '2',
      title: 'Казино Ночь',
      thumbnail: '/assets/streams/stream2.jpg',
      viewers: '856K зрителей',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: '3',
      title: 'Помощь Людям',
      thumbnail: '/assets/streams/stream3.jpg',
      viewers: '654K зрителей',
      url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    },
  ];

  const handleStreamClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="other-streams">
      <h3 className="section-subtitle">🎞️ Другие стримы</h3>
      <div className="streams-grid">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="stream-card"
            data-url={stream.url}
            onClick={() => handleStreamClick(stream.url)}
          >
            <div className="stream-thumbnail">
              <img
                alt={stream.title}
                src={stream.thumbnail}
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div className="stream-overlay">
                <i className="fas fa-play"></i>
              </div>
            </div>
            <div className="stream-info">
              <h4>{stream.title}</h4>
              <span className="viewers">{stream.viewers}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
