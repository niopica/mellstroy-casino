import React, { useState } from 'react';
import { MusicPlayer } from '../../widgets/music-player/MusicPlayer';
import { EventCounters } from '../../widgets/event-counters/EventCounters';
import { Header } from '../../widgets/header/Header';
import './HelpPage.scss';

export const HelpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
    description: '',
    contact: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Help request submitted:', formData);
    // Здесь будет логика отправки формы
    alert('Запрос на помощь отправлен! Мелстрой рассмотрит вашу заявку.');
    setFormData({
      name: '',
      type: '',
      amount: '',
      description: '',
      contact: '',
    });
  };

  return (
    <div className="help-page">
      <MusicPlayer />
      <EventCounters />
      <Header />
      <main className="help-main">
        <div className="container">
          {/* Заголовок страницы */}
          <section className="page-header">
            <h1 className="page-title">💎 Помощь людям</h1>
            <p className="page-subtitle">Мелстрой помогает тем, кто в этом нуждается</p>
          </section>

          {/* Статистика помощи */}
          <section className="help-stats">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <div className="stat-value">15,000,000₽</div>
                  <div className="stat-label">Помощь оказана</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <div className="stat-value">247</div>
                  <div className="stat-label">Людей помогли</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏥</div>
                <div className="stat-content">
                  <div className="stat-value">89</div>
                  <div className="stat-label">Медицинских операций</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏠</div>
                <div className="stat-content">
                  <div className="stat-value">34</div>
                  <div className="stat-label">Жилищных вопросов</div>
                </div>
              </div>
            </div>
          </section>

          {/* Фильтры */}
          <section className="help-filters">
            <div className="filters-container">
              <div className="filter-group">
                <label htmlFor="sort-by">Сортировать по:</label>
                <select id="sort-by" className="filter-select">
                  <option value="date">Дате</option>
                  <option value="amount">Сумме</option>
                  <option value="type">Типу помощи</option>
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="filter-type">Тип помощи:</label>
                <select id="filter-type" className="filter-select">
                  <option value="all">Все</option>
                  <option value="medical">Медицинская</option>
                  <option value="housing">Жилищная</option>
                  <option value="education">Образование</option>
                  <option value="other">Другое</option>
                </select>
              </div>
            </div>
          </section>

          {/* История помощи */}
          <section className="help-history">
            <h2 className="section-title">📋 История помощи Мелстроя</h2>

            {/* Медицинская помощь */}
            <div className="help-category">
              <div className="category-header">
                <h3 className="category-title">🏥 МЕДИЦИНСКАЯ ПОМОЩЬ</h3>
                <p className="category-description">
                  Мелстрой часто помогал людям, у которых проблемы со здоровьем.
                  <br />
                  Он говорил: <strong>«Если реально тяжёлая ситуация — пишите мне в личку, я помогу!»</strong>
                </p>
              </div>
              <div className="help-examples">
                <div className="example-group">
                  <h4 className="example-title">💉 Операции и лечение</h4>
                  <ul className="example-list">
                    <li>Оплачивал операции детям и взрослым (на сердце, глаза, позвоночник)</li>
                    <li>Помогал с реабилитацией после аварий</li>
                    <li>Покрывал расходы на лекарства, когда человек не мог позволить себе лечение</li>
                    <li>
                      <strong>2023 год:</strong> на стриме помог подписчице, у которой сын с ДЦП — отправил{' '}
                      <span className="amount">200 000 ₽</span> на курс терапии
                    </li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">🎗️ Помощь при онкологии и тяжёлых диагнозах</h4>
                  <ul className="example-list">
                    <li>
                      Несколько раз переводил от <span className="amount">100 000</span> до{' '}
                      <span className="amount">300 000 ₽</span> на лечение рака
                    </li>
                    <li>Один случай — семья писала прямо в чат, он проверил, позвонил и сразу перевёл деньги</li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">🚑 Помощь при травмах</h4>
                  <ul className="example-list">
                    <li>Парню, который попал в ДТП, оплатил протезирование ноги</li>
                    <li>Девушке после аварии оплатил курс реабилитации и коляску</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Жилищная помощь */}
            <div className="help-category">
              <div className="category-header">
                <h3 className="category-title">🏠 ЖИЛИЩНАЯ ПОМОЩЬ</h3>
                <p className="category-description">
                  Мелстрой очень эмоционально реагировал на истории про жильё — сгоревшие квартиры, съём, долги, сироты
                  и т.д.
                </p>
              </div>
              <div className="help-examples">
                <div className="example-group">
                  <h4 className="example-title">🔥 Помощь после пожаров и аварий</h4>
                  <ul className="example-list">
                    <li>
                      Семье из Брянска сгорел дом — он отправил <span className="amount">500 000 ₽</span>, чтобы
                      восстановить жильё
                    </li>
                    <li>Девушке, которая потеряла жильё, оплатил съём квартиры на 3 месяца</li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">👶 Сироты и многодетные</h4>
                  <ul className="example-list">
                    <li>Помогал ребятам из детдомов: давал деньги на съём, ремонт или покупку мебели</li>
                    <li>Поддерживал матерей-одиночек, у которых не было денег на оплату квартиры</li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">🏢 Дом престарелых и приюты</h4>
                  <ul className="example-list">
                    <li>Делал крупные донаты на ремонт помещений и продукты для приютов и домов престарелых</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Образование */}
            <div className="help-category">
              <div className="category-header">
                <h3 className="category-title">🎓 ОБРАЗОВАНИЕ</h3>
                <p className="category-description">
                  Мелстрой не раз говорил, что образование важно, особенно если человек реально хочет развиваться.
                </p>
              </div>
              <div className="help-examples">
                <div className="example-group">
                  <h4 className="example-title">📚 Оплата учёбы</h4>
                  <ul className="example-list">
                    <li>Переводил деньги студентам на оплату семестра в колледже или универе</li>
                    <li>Одному парню из провинции оплатил поступление в вуз в Москве</li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">💻 Помощь со школой и техникой</h4>
                  <ul className="example-list">
                    <li>Покупал ноутбуки, планшеты, телефоны детям и подросткам, чтобы они могли учиться онлайн</li>
                    <li>
                      <strong>2022 год:</strong> подарил MacBook девушке, которая училась на дизайнера, но не могла
                      позволить себе технику
                    </li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">🎯 Мотивационные челленджи</h4>
                  <ul className="example-list">
                    <li>
                      Делал стримы формата: <em>"Если сдашь сессию — получишь 100 000 ₽"</em>, поддерживая студентов
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Бытовая и социальная поддержка */}
            <div className="help-category">
              <div className="category-header">
                <h3 className="category-title">💰 БЫТОВАЯ И СОЦИАЛЬНАЯ ПОДДЕРЖКА</h3>
                <p className="category-description">Не всегда помощь была крупной, но часто — очень своевременной.</p>
              </div>
              <div className="help-examples">
                <div className="example-group">
                  <h4 className="example-title">🛒 Еда, одежда, бытовые нужды</h4>
                  <ul className="example-list">
                    <li>Раздавал деньги людям на улице — кассирам, дворникам, бездомным</li>
                    <li>Помогал подписчикам с покупкой одежды, продуктов, бытовой техники</li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">👴 Поддержка одиноких и пожилых</h4>
                  <ul className="example-list">
                    <li>Оплачивал лекарства пенсионерам, помогал с едой и арендой жилья</li>
                    <li>
                      Проводил акции — <em>"Помоги бабушке"</em>: отправлял своих подписчиков с деньгами по адресам
                    </li>
                  </ul>
                </div>
                <div className="example-group">
                  <h4 className="example-title">🐕 Животные и приюты</h4>
                  <ul className="example-list">
                    <li>Донаты на корм и лечение животных, помощь приютам для собак и кошек</li>
                    <li>В одном из стримов оплатил операцию собаки подписчицы</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Публичные акции и челленджи */}
            <div className="help-category">
              <div className="category-header">
                <h3 className="category-title">💥 ПУБЛИЧНЫЕ АКЦИИ И ЧЕЛЛЕНДЖИ</h3>
                <p className="category-description">Мелстрой часто устраивал "стримы добра", где:</p>
              </div>
              <div className="help-examples">
                <div className="example-group">
                  <h4 className="example-title">🎬 Формат "стримов добра"</h4>
                  <ul className="example-list">
                    <li>выбирал случайных людей из чата или улицы</li>
                    <li>задавал вопросы, узнавал их историю</li>
                    <li>
                      переводил от <span className="amount">10 000</span> до <span className="amount">1 000 000 ₽</span>{' '}
                      в прямом эфире
                    </li>
                    <li>призывал подписчиков тоже помогать</li>
                  </ul>
                </div>
                <div className="quote-section">
                  <div className="quote-card">
                    <div className="quote-icon">💬</div>
                    <div className="quote-text">
                      <blockquote>
                        <em>
                          "Если у тебя есть деньги — делись. Это реально возвращается. Лучше потратить на добро, чем на
                          трэш."
                        </em>
                      </blockquote>
                      <cite>— Мелстрой</cite>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Форма запроса помощи */}
          <section className="help-request">
            <h2 className="section-title">📝 Запрос на помощь</h2>
            <div className="request-form">
              <form id="help-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="help-name">Ваше имя:</label>
                  <input
                    id="help-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="help-type">Тип помощи:</label>
                  <select id="help-type" name="type" required value={formData.type} onChange={handleInputChange}>
                    <option value="">Выберите тип</option>
                    <option value="medical">Медицинская помощь</option>
                    <option value="housing">Жилищные вопросы</option>
                    <option value="education">Образование</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="help-amount">Необходимая сумма (₽):</label>
                  <input
                    id="help-amount"
                    name="amount"
                    type="number"
                    required
                    min="1000"
                    max="1000000"
                    value={formData.amount}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="help-description">Описание ситуации:</label>
                  <textarea
                    id="help-description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="help-contact">Контактная информация:</label>
                  <input
                    id="help-contact"
                    name="contact"
                    type="text"
                    required
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="submit-btn" type="submit">
                  <i className="fas fa-paper-plane"></i> Отправить запрос
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
