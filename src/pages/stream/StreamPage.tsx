import React from 'react';
import { MusicPlayer } from '../../widgets/music-player';
import { EventCounters } from '../../widgets/event-counters';
import { Header } from '../../widgets/header';
import { VideoPlayer } from '../../widgets/video-player';
import { useStream } from '../../shared/lib/hooks';
import './StreamPage.scss';

export const StreamPage: React.FC = () => {
  const {
    // Чат состояния
    chatMessages,
    chatInput,
    chatInputMobile,
    chatMessagesRef,
    chatMessagesMobileRef,

    // Чат функции
    setChatInput,
    setChatInputMobile,
    sendChatMessage,

    // Донаты состояния
    recentDonations,
  } = useStream();

  return (
    <div className="stream-page">
      <MusicPlayer />
      <EventCounters />
      <Header />
      <main className="stream-main">
        <div className="stream-container">
          <section className="stream-player-section">
            <div className="stream-player">
              <div className="player-header">
                <h1 className="stream-title">Mellstroy Live</h1>
                <div className="stream-stats">
                  <span className="viewers">
                    <i className="fas fa-eye"></i> 1,234,567 зрителей
                  </span>
                  <span className="online status">ONLINE</span>
                </div>
              </div>
              <div className="video-container">
                <VideoPlayer />
              </div>
            </div>
            <aside className="chat-section chat-mobile">
              <div className="chat-header">
                <h3>💬 Live Chat</h3>
                <button className="chat-toggle" id="chat-toggle-mobile">
                  <i className="fas fa-comments"></i>
                </button>
              </div>
              <div className="chat-container" id="chat-container-mobile">
                <div ref={chatMessagesMobileRef} className="chat-messages" id="chat-messages-mobile">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`chat-message ${message.type} ${message.highlight ? 'highlight' : ''}`}
                    >
                      <div className={`chat-username ${message.type}`}>{message.username}:</div>
                      <div className="chat-text">{message.text}</div>
                      <div className="chat-timestamp">{message.timestamp}</div>
                    </div>
                  ))}
                </div>
                <div className="chat-input-container">
                  <input
                    className="chat-input"
                    id="chat-input-mobile"
                    placeholder="Напишите сообщение..."
                    value={chatInputMobile}
                    onChange={(e) => setChatInputMobile(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage('mobile')}
                  />
                  <button className="chat-send-btn" id="chat-send-mobile" onClick={() => sendChatMessage('mobile')}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </aside>
            <section className="donations-section">
              <h3 className="section-subtitle">💸 Последние донаты</h3>
              <div className="recent-donations" id="recent-donations">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="donation-item-recent">
                    <div className="donation-icon-recent">{donation.icon}</div>
                    <div className="donation-info-recent">
                      <div className="donation-amount-recent">
                        {donation.amount}
                        {donation.currency}
                      </div>
                      <div className="donation-message-recent">{donation.message}</div>
                      <div className="donation-user-recent">от {donation.username}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="other-streams">
              <h3 className="section-subtitle">🎞️ Другие стримы</h3>
              <div className="streams-grid">
                <div className="stream-card" data-url="https://www.youtube.com/watch?v=3PwZK_zkrPQ">
                  <div className="stream-thumbnail">
                    <img
                      alt="Stream 1"
                      src="../assets/streams/stream1.jpg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="stream-overlay">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                  <div className="stream-info">
                    <h4>Mellstroy Live</h4>
                    <span className="viewers">1.2M зрителей</span>
                  </div>
                </div>
                <div className="stream-card" data-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <div className="stream-thumbnail">
                    <img
                      alt="Stream 2"
                      src="../assets/streams/stream2.jpg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="stream-overlay">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                  <div className="stream-info">
                    <h4>Казино Ночь</h4>
                    <span className="viewers">856K зрителей</span>
                  </div>
                </div>
                <div className="stream-card" data-url="https://www.youtube.com/watch?v=9bZkp7q19f0">
                  <div className="stream-thumbnail">
                    <img
                      alt="Stream 3"
                      src="../assets/streams/stream3.jpg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="stream-overlay">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                  <div className="stream-info">
                    <h4>Помощь Людям</h4>
                    <span className="viewers">654K зрителей</span>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <aside className="chat-section chat-desktop">
            <div className="chat-header">
              <h3>💬 Live Chat</h3>
              <button className="chat-toggle" id="chat-toggle">
                <i className="fas fa-comments"></i>
              </button>
            </div>
            <div className="chat-container" id="chat-container">
              <div ref={chatMessagesRef} className="chat-messages" id="chat-messages">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`chat-message ${message.type} ${message.highlight ? 'highlight' : ''}`}
                  >
                    <div className={`chat-username ${message.type}`}>{message.username}:</div>
                    <div className="chat-text">{message.text}</div>
                    <div className="chat-timestamp">{message.timestamp}</div>
                  </div>
                ))}
              </div>
              <div className="chat-input-container">
                <input
                  className="chat-input"
                  id="chat-input"
                  placeholder="Напишите сообщение..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage('desktop')}
                />
                <button className="chat-send-btn" id="chat-send" onClick={() => sendChatMessage('desktop')}>
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <div className="donation-container" id="donation-container"></div>
      <div className="event-notifications" id="event-notifications"></div>
    </div>
  );
};
