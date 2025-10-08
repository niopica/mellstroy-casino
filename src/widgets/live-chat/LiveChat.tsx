import React, { useState, useEffect, useRef } from 'react';
import './LiveChat.scss';

interface ChatMessage {
  id: string;
  author: string;
  text: string;
  time: string;
  isDonation?: boolean;
  amount?: number;
}

interface LiveChatProps {
  isMobile: boolean;
}

export const LiveChat: React.FC<LiveChatProps> = ({ isMobile }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(!isMobile);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Симуляция входящих сообщений
    const interval = setInterval(() => {
      const sampleMessages = [
        { author: 'User123', text: 'Привет всем!', amount: 0 },
        { author: 'Fan456', text: 'Мелстрой топ!', amount: 0 },
        { author: 'Donator789', text: 'Поддерживаю стримера!', amount: 1000 },
        { author: 'Viewer321', text: 'Когда новая игра?', amount: 0 },
        { author: 'Supporter654', text: 'Спасибо за контент!', amount: 500 },
      ];

      const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const isDonation = randomMessage.amount > 0;

      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        author: randomMessage.author,
        text: randomMessage.text,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isDonation,
        amount: randomMessage.amount,
      };

      setMessages((prev) => [...prev.slice(-49), newMsg]); // Ограничиваем до 50 сообщений
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      author: 'Вы',
      text: newMessage,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev.slice(-49), message]);
    setNewMessage('');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const chatId = isMobile ? 'chat-container-mobile' : 'chat-container';
  const messagesId = isMobile ? 'chat-messages-mobile' : 'chat-messages';
  const inputId = isMobile ? 'chat-input-mobile' : 'chat-input';
  const sendId = isMobile ? 'chat-send-mobile' : 'chat-send';
  const toggleId = isMobile ? 'chat-toggle-mobile' : 'chat-toggle';

  return (
    <div className="chat-section">
      <div className="chat-header">
        <h3>💬 Live Chat</h3>
        <button className="chat-toggle" id={toggleId} onClick={toggleChat}>
          <i className="fas fa-comments"></i>
        </button>
      </div>

      {isChatOpen && (
        <div className="chat-container" id={chatId}>
          <div className="chat-messages" id={messagesId}>
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.isDonation ? 'donation' : ''}`}>
                <div className="message-author">{message.author}</div>
                <div className="message-text">{message.text}</div>
                {message.isDonation && message.amount && <div className="donation-amount">💰 {message.amount}₽</div>}
                <div className="message-time">{message.time}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-container" onSubmit={handleSendMessage}>
            <input
              className="chat-input"
              id={inputId}
              placeholder="Напишите сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button className="chat-send-btn" id={sendId} type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
