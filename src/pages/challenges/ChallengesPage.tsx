import React, { useState } from 'react';
import { MusicPlayer } from '../../widgets/music-player/MusicPlayer';
import { EventCounters } from '../../widgets/event-counters/EventCounters';
import { Header } from '../../widgets/header/Header';
import './ChallengesPage.scss';

export const ChallengesPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');

  const activeChallenges = [
    {
      id: 'record-tiktok',
      icon: '♪',
      title: 'Рекорд в тик ток',
      description: 'Побить любой рекорд в тик ток, Лайки, Комментарии, Репосты',
      reward: '5 млн ₽',
      rewardIcon: '💰',
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      status: 'active',
    },
    {
      id: 'football-greeting',
      icon: '⚽',
      title: 'Привет от футболистов',
      description: 'Записать видеопривет стримеру от имени Месси, Роналду, Мбаппе или Холанда',
      reward: '30 млн ₽',
      rewardIcon: '💰',
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      status: 'active',
    },
    {
      id: 'champions-league-run',
      icon: '🏟️',
      title: 'Пробежка на поле ЛЧ',
      description: 'Выйти на поле во время финала Лиги чемпионов с логотипом "MELLSTROY"',
      reward: '30 млн ₽',
      rewardIcon: '🏆',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'active',
    },
    {
      id: 'mrbeast-greeting',
      icon: '🎬',
      title: 'Привет от MrBeast',
      description: 'Сделать так, чтобы MrBeast передал привет в ролике',
      reward: '37,5 млн ₽',
      rewardIcon: '🎖️',
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      status: 'active',
    },
    {
      id: 'everest-photo',
      icon: '🏔️',
      title: 'Фото на Эвересте',
      description: 'Достичь вершины Эвереста и сфотографировать себя с ником стримера',
      reward: '45 млн ₽',
      rewardIcon: '💎',
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      status: 'active',
    },
    {
      id: 'celebrity-subscription',
      icon: '⭐',
      title: 'Подписка от знаменитостей',
      description: 'IShowSpeed, KSI, Хаби Лейм или Логан Пол подписывается на аккаунт Мелстроя',
      reward: '30 млн ₽',
      rewardIcon: '🌟',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'active',
    },
    {
      id: 'mrbeast-instagram',
      icon: '📸',
      title: 'Подписка MrBeast в Instagram',
      description: 'Добиться, чтобы MrBeast подписался на Мелстроя в Instagram',
      reward: '150 млн ₽',
      rewardIcon: '💎',
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      status: 'active',
    },
    {
      id: 'president-greeting',
      icon: '🏛️',
      title: 'Привет от президента',
      description: 'Записать видео, где президент какой-либо страны передаёт привет стримеру',
      reward: '2 млн $',
      rewardIcon: '👑',
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      status: 'active',
    },
  ];

  const completedChallenges = [
    {
      id: 'mbappe-greeting',
      icon: '⚽',
      title: 'Привет от Мбаппе',
      description: 'Мбаппе передал привет Мелстрою - это широко освещалось в СМИ',
      reward: '30 млн ₽',
      rewardIcon: '🏅',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      status: 'completed',
    },
    {
      id: 'champions-league-run-completed',
      icon: '🏟️',
      title: 'Пробежка на поле ЛЧ',
      description: 'Болельщики выбежали на поле под это задание',
      reward: '30 млн ₽',
      rewardIcon: '🏁',
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      status: 'completed',
    },
    {
      id: 'lithuania-president',
      icon: '🏛️',
      title: 'Привет от президента Литвы',
      description: 'Школьник из Литвы записал видео с президентом, но Мелстрой не выплатил всю сумму',
      reward: 'Частично выплачено',
      rewardIcon: '👑',
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      status: 'completed',
    },
  ];

  const payouts = [
    {
      user: '@mbappe_official',
      description: 'Привет от Мбаппе для Мелстроя',
      date: '15.12.2024',
      amount: '+30,000,000₽',
    },
    {
      user: '@champions_league_fan',
      description: 'Пробежка на поле финала ЛЧ',
      date: '14.12.2024',
      amount: '+30,000,000₽',
    },
    {
      user: '@lithuanian_student',
      description: 'Привет от президента Литвы',
      date: '13.12.2024',
      amount: '+500,000₽',
    },
    {
      user: '@everest_climber',
      description: 'Фото на Эвересте с ником Мелстроя',
      date: '12.12.2024',
      amount: '+45,000,000₽',
    },
    {
      user: '@mrbeast_collab',
      description: 'Привет от MrBeast в видео',
      date: '11.12.2024',
      amount: '+37,500,000₽',
    },
  ];

  const handleVideoClick = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setCurrentVideoUrl('');
  };

  return (
    <div className="challenges-page">
      <MusicPlayer />
      <EventCounters />
      <Header />
      <main className="challenges-main">
        <div className="container">
          {/* Заголовок страницы */}
          <section className="page-header">
            <h1 className="page-title">🎯 Mellstroy Challenges</h1>
            <p className="page-subtitle">Принимай вызовы и становись легендой!</p>
          </section>

          {/* Активные челенджи */}
          <section className="challenges-section">
            <h2 className="section-title">🔥 Активные челенджи</h2>
            <div className="challenges-grid">
              {activeChallenges.map((challenge) => (
                <div key={challenge.id} className="challenge-card" data-video={challenge.videoUrl}>
                  <div className="challenge-header">
                    <div className="challenge-icon">{challenge.icon}</div>
                    <div className={`challenge-status ${challenge.status}`}>
                      {challenge.status === 'active' ? 'Активен' : 'Завершён'}
                    </div>
                  </div>
                  <div className="challenge-content">
                    <h3 className="challenge-title">{challenge.title}</h3>
                    <p className="challenge-description">{challenge.description}</p>
                    <div className="challenge-reward">
                      <span className="reward-icon">{challenge.rewardIcon}</span>
                      <span className="reward-amount">{challenge.reward}</span>
                    </div>
                  </div>
                  <button className="challenge-btn" onClick={() => handleVideoClick(challenge.videoUrl)}>
                    Смотреть видео
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Завершённые челенджи */}
          <section className="completed-challenges">
            <h2 className="section-title">✅ Завершённые челенджи</h2>
            <div className="challenges-grid">
              {completedChallenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`challenge-card ${challenge.status}`}
                  data-video={challenge.videoUrl}
                >
                  <div className="challenge-header">
                    <div className="challenge-icon">{challenge.icon}</div>
                    <div className={`challenge-status ${challenge.status}`}>
                      {challenge.status === 'active' ? 'Активен' : 'Завершён'}
                    </div>
                  </div>
                  <div className="challenge-content">
                    <h3 className="challenge-title">{challenge.title}</h3>
                    <p className="challenge-description">{challenge.description}</p>
                    <div className="challenge-reward">
                      <span className="reward-icon">{challenge.rewardIcon}</span>
                      <span className="reward-amount">{challenge.reward}</span>
                    </div>
                  </div>
                  <button className="challenge-btn" onClick={() => handleVideoClick(challenge.videoUrl)}>
                    Смотреть видео
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Выплаты каттерам */}
          <section className="payouts-section">
            <h2 className="section-title">💸 Выплаты каттерам</h2>
            <div className="payouts-list">
              {payouts.map((payout, index) => (
                <div key={index} className="payout-item">
                  <div className="payout-info">
                    <div className="payout-user">{payout.user}</div>
                    <div className="payout-description">{payout.description}</div>
                    <div className="payout-date">{payout.date}</div>
                  </div>
                  <div className="payout-amount">{payout.amount}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Модальное окно для видео */}
        {isVideoModalOpen && (
          <div className="video-modal active">
            <div className="modal-content">
              <button className="modal-close" onClick={closeVideoModal}>
                <i className="fas fa-times"></i>
              </button>
              <div className="video-container">
                <iframe
                  src={currentVideoUrl.replace('watch?v=', 'embed/')}
                  allowFullScreen
                  title="Challenge Video"
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
