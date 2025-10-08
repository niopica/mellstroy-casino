import React, { useState, useEffect } from 'react';
import './RecentDonations.scss';

interface Donation {
  id: string;
  amount: number;
  currency: string;
  message: string;
  username: string;
  time: string;
}

export const RecentDonations: React.FC = () => {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    // Симуляция последних донатов
    const sampleDonations: Donation[] = [
      {
        id: '1',
        amount: 5000,
        currency: 'RUB',
        message: 'Спасибо за контент!',
        username: 'Supporter123',
        time: '2 мин назад',
      },
      {
        id: '2',
        amount: 1000,
        currency: 'RUB',
        message: 'Продолжай в том же духе!',
        username: 'Fan456',
        time: '5 мин назад',
      },
      {
        id: '3',
        amount: 2500,
        currency: 'RUB',
        message: 'Ты лучший!',
        username: 'Loyal789',
        time: '8 мин назад',
      },
      {
        id: '4',
        amount: 10000,
        currency: 'RUB',
        message: 'На развитие казино!',
        username: 'BigDonator',
        time: '12 мин назад',
      },
      {
        id: '5',
        amount: 500,
        currency: 'RUB',
        message: 'Поддерживаю!',
        username: 'SmallSupporter',
        time: '15 мин назад',
      },
    ];

    setDonations(sampleDonations);

    // Обновляем донаты каждые 10 секунд
    const interval = setInterval(() => {
      setDonations((prev) => {
        const newDonation: Donation = {
          id: Date.now().toString(),
          amount: Math.floor(Math.random() * 5000) + 100,
          currency: 'RUB',
          message: 'Спасибо за стрим!',
          username: `User${Math.floor(Math.random() * 1000)}`,
          time: 'только что',
        };
        return [newDonation, ...prev.slice(0, 4)]; // Ограничиваем до 5 донатов
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatAmount = (amount: number, currency: string): string => {
    return `${amount.toLocaleString()}${currency === 'RUB' ? '₽' : currency}`;
  };

  return (
    <section className="donations-section">
      <h3 className="section-subtitle">💸 Последние донаты</h3>
      <div className="recent-donations" id="recent-donations">
        {donations.map((donation) => (
          <div key={donation.id} className="donation-item">
            <div className="donation-icon">💰</div>
            <div className="donation-info">
              <div className="donation-amount">{formatAmount(donation.amount, donation.currency)}</div>
              <div className="donation-message">{donation.message}</div>
              <div className="donation-time">
                {donation.username} • {donation.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
