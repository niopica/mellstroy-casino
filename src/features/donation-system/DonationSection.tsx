import React from 'react';
import './DonationSection.scss';
import { useApp } from '../../app/providers/AppProvider';

export const DonationSection: React.FC = () => {
  const { donations } = useApp();

  const handleDonation = (amount: number) => {
    donations.addDonation({
      amount,
      currency: 'RUB',
      message: `Донат на сумму ${amount}₽`,
      username: 'Анонимный донатер',
    });
  };

  const handleCustomDonation = () => {
    const amount = prompt('Введите сумму доната:');
    if (amount && !isNaN(Number(amount))) {
      handleDonation(Number(amount));
    }
  };

  return (
    <section className="donation-section">
      <div className="container">
        <h2 className="section-title">💎  Мелстроя</h2>
        <p className="section-subtitle">Каждый донат приближает новый контент!</p>
        <div className="donation-grid">
          <div className="donation-card" data-amount={500}>
            <div className="donation-icon">💵</div>
            <div className="donation-amount">500₽</div>
            <button className="donation-btn" onClick={() => handleDonation(500)}>
              Задонатить
            </button>
          </div>
          <div className="donation-card" data-amount={1000}>
            <div className="donation-icon">💰</div>
            <div className="donation-amount">1000₽</div>
            <button className="donation-btn" onClick={() => handleDonation(1000)}>
              Задонатить
            </button>
          </div>
          <div className="donation-card" data-amount={5000}>
            <div className="donation-icon">💎</div>
            <div className="donation-amount">5000₽</div>
            <button className="donation-btn" onClick={() => handleDonation(5000)}>
              Задонатить
            </button>
          </div>
          <div className="donation-card custom">
            <div className="donation-icon">❤️</div>
            <div className="donation-amount">Другая сумма</div>
            <button className="donation-btn" onClick={handleCustomDonation}>
              Задонатить
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
