import React, { useState, useEffect } from 'react';
import './EventCounters.scss';

export const EventCounters: React.FC = () => {
  const [timeOnSite, setTimeOnSite] = useState('00:00:00');
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const updateTime = () => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);

      setTimeOnSite(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`
      );
    };

    const interval = setInterval(updateTime, 1000);

    // Симуляция прибыли
    const profitInterval = setInterval(() => {
      setProfit((prev) => prev + Math.random() * 10);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(profitInterval);
    };
  }, []);

  return (
    <div className="event-counters" id="event-counters">
      <div className="counter-item">
        <span className="counter-label">Время на сайте:</span>
        <span className="counter-value" id="time-counter">
          {timeOnSite}
        </span>
      </div>
      <div className="counter-item">
        <span className="counter-label">Прибыль:</span>
        <span className="counter-value" id="profit-counter">
          +${profit.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
