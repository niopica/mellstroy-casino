import React, { useEffect, useRef } from 'react';
import { MusicPlayer } from '../../widgets/music-player/MusicPlayer';
import { EventCounters } from '../../widgets/event-counters/EventCounters';
import { Header } from '../../widgets/header/Header';
import './AboutPage.scss';

export const AboutPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setupCanvasSize = (canvas: HTMLCanvasElement) => {
    const container = canvas.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Устанавливаем размеры canvas равными размерам контейнера
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    // Устанавливаем CSS размеры для правильного отображения
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = containerHeight + 'px';
  };

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Устанавливаем адаптивные размеры canvas
    setupCanvasSize(canvas);

    // Данные для графика (точно как в оригинале)
    const data = {
      labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
      datasets: [
        {
          label: 'Доходы ($)',
          data: [50000, 150000, 300000, 500000, 800000, 1200000, 2000000],
          borderColor: '#00e0ff',
          backgroundColor: 'rgba(0, 224, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#ffffff',
            font: {
              size: 14,
              family: 'Inter, sans-serif',
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#b0b0b0',
            font: {
              size: 12,
              family: 'Inter, sans-serif',
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          ticks: {
            color: '#b0b0b0',
            font: {
              size: 12,
              family: 'Inter, sans-serif',
            },
            callback: function (value: number) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            },
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      elements: {
        point: {
          backgroundColor: '#00e0ff',
          borderColor: '#ffffff',
          borderWidth: 2,
          radius: 6,
          hoverRadius: 8,
        },
      },
    };

    // Создаем простой график без Chart.js (точно как в оригинале)
    drawSimpleChart(ctx, data, options);
  };

  const drawSimpleChart = (ctx: CanvasRenderingContext2D, data: any, options: any) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    // Очистка canvas
    ctx.clearRect(0, 0, width, height);

    // Фон
    ctx.fillStyle = 'rgba(15, 15, 15, 0.8)';
    ctx.fillRect(0, 0, width, height);

    // Сетка
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;

    // Вертикальные линии
    for (let i = 0; i <= 6; i++) {
      const x = padding + (chartWidth / 6) * i;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Горизонтальные линии
    for (let i = 0; i <= 5; i++) {
      const y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Данные
    const maxValue = Math.max(...data.datasets[0].data);
    const minValue = Math.min(...data.datasets[0].data);
    const valueRange = maxValue - minValue;

    // Линия графика
    ctx.strokeStyle = data.datasets[0].borderColor;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.labels.forEach((_: string, index: number) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = height - padding - ((data.datasets[0].data[index] - minValue) / valueRange) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Точки
    ctx.fillStyle = data.datasets[0].borderColor;
    data.labels.forEach((_: string, index: number) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      const y = height - padding - ((data.datasets[0].data[index] - minValue) / valueRange) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();

      // Белая обводка
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // Подписи осей
    ctx.fillStyle = options.scales.x.ticks.color;
    ctx.font = `${options.scales.x.ticks.font.size}px ${options.scales.x.ticks.font.family}`;
    ctx.textAlign = 'center';

    data.labels.forEach((label: string, index: number) => {
      const x = padding + (chartWidth / (data.labels.length - 1)) * index;
      ctx.fillText(label, x, height - padding + 20);
    });

    // Подписи Y оси
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const value = minValue + (valueRange / 5) * i;
      const y = height - padding - (chartHeight / 5) * i;
      ctx.fillText('$' + (value / 1000000).toFixed(1) + 'M', padding - 10, y + 5);
    }

    // Заголовок
    ctx.fillStyle = options.plugins.legend.labels.color;
    ctx.font = `${options.plugins.legend.labels.font.size}px ${options.plugins.legend.labels.font.family}`;
    ctx.textAlign = 'center';
    ctx.fillText('Рост доходов по годам', width / 2, 30);
  };

  useEffect(() => {
    drawChart();

    // Обработчик изменения размера окна
    const handleResize = () => {
      drawChart();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="about-page">
      <MusicPlayer />
      <EventCounters />
      <Header />
      <main className="about-main">
        <div className="container">
          {/* Заголовок страницы */}
          <section className="page-header">
            <h1 className="page-title">🧠 О Мелстрое</h1>
            <p className="page-subtitle">История легенды и его путь к успеху</p>
          </section>

          {/* Биография */}
          <section className="biography-section">
            <div className="biography-content">
              <div className="biography-text">
                <h2 className="section-title">🌟 История Мелстроя</h2>

                {/* Основная информация */}
                <div className="bio-intro">
                  <div className="intro-card">
                    <div className="intro-icon">👶</div>
                    <div className="intro-content">
                      <h3>Ранние годы</h3>
                      <p>
                        <strong>Родился 15 декабря 1998 года в Гомеле, Беларусь.</strong> Семья была небогатой: отец
                        работал слесарем, мать — продавцом. В детстве было сложно с ресурсами, но это закалило характер
                        и дало понимание ценности денег.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Путь к успеху */}
                <div className="success-story">
                  <h3 className="story-title">🚀 Путь к успеху</h3>
                  <div className="story-timeline">
                    <div className="story-item">
                      <div className="story-year">2018-2019</div>
                      <div className="story-content">
                        <h4>🎮 Начало карьеры</h4>
                        <p>
                          После школы увлекся видеоиграми (Minecraft, Dota, CS:GO) и начал вести стримы.{' '}
                          <strong>Постепенно его контент становился всё более популярным</strong> — он делал эфиры с
                          чат-рулетками, создавал провокационный контент, который привлекал внимание.
                        </p>
                      </div>
                    </div>

                    <div className="story-item">
                      <div className="story-year">2019</div>
                      <div className="story-content">
                        <h4>🏙️ Переезд в Москву</h4>
                        <p>
                          Переехал в Москву и начал устраивать стримы вечеринок, показывая шумные форматы, приглашения,
                          дорогие места. <strong>Это привлекло огромную аудиторию</strong>, которая хотела увидеть
                          роскошную жизнь.
                        </p>
                      </div>
                    </div>

                    <div className="story-item">
                      <div className="story-year">2019-2020</div>
                      <div className="story-content">
                        <h4>💰 Сотрудничество с казино</h4>
                        <p>
                          Начал сотрудничать с онлайн-казино, рекламировать их, делать стримы со ставками.{' '}
                          <strong>За один стрим с казино он мог получать порядка $16,000</strong> — это показывало его
                          коммерческую ценность.
                        </p>
                      </div>
                    </div>

                    <div className="story-item">
                      <div className="story-year">2024-2025</div>
                      <div className="story-content">
                        <h4>🎰 Собственный проект</h4>
                        <p>
                          В мае 2025 года объявил о партнерстве с 1win для запуска своего онлайн-казино.{' '}
                          <strong>Активно участвует в концепции, дизайне, структуре площадки</strong> и даже в настройке
                          RTP (процент возврата игрокам).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Положительные качества */}
                <div className="positive-qualities">
                  <h3 className="qualities-title">✨ Что привлекает людей в Мелстрое</h3>
                  <div className="qualities-grid">
                    <div className="quality-card">
                      <div className="quality-icon">🎯</div>
                      <div className="quality-content">
                        <h4>Амбициозность и целеустремлённость</h4>
                        <p>
                          Из бедной семьи, без ресурсов он сумел построить огромную аудиторию и влиять на медийное
                          пространство. <strong>Это вдохновляет людей</strong> — показывает, что можно достичь успеха с
                          нуля.
                        </p>
                      </div>
                    </div>

                    <div className="quality-card">
                      <div className="quality-icon">🎭</div>
                      <div className="quality-content">
                        <h4>Харизма и умение привлекать внимание</h4>
                        <p>
                          Он умеет делать провокационный и запоминающийся контент, «шокировать», заставлять о нём
                          говорить.
                          <strong>Его харизма притягивает миллионы зрителей</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="quality-card">
                      <div className="quality-icon">🎲</div>
                      <div className="quality-content">
                        <h4>Готовность рисковать и экспериментировать</h4>
                        <p>
                          Стремится выходить за рамки обычного стрима, создавать масштабные проекты, коллаборации,
                          крупные конкурсы. <strong>Люди ценят его смелость</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="quality-card">
                      <div className="quality-icon">💝</div>
                      <div className="quality-content">
                        <h4>Благотворительность и щедрые жесты</h4>
                        <p>
                          Делал пожертвования, помогал детским домам, финансировал лечение нуждающихся.{' '}
                          <strong>В марте 2024 года купил спортинвентарь для 500 детских домов в Беларуси</strong>, а в
                          марте 2025 года перевёл 5 млн рублей на лечение Паши Техника.
                        </p>
                      </div>
                    </div>

                    <div className="quality-card">
                      <div className="quality-icon">💼</div>
                      <div className="quality-content">
                        <h4>Предпринимательская жилка</h4>
                        <p>
                          Он не просто «ведёт стримы» — он называет себя соучастником проектов, работает над концептом,
                          структуре, дизайне. <strong>Люди видят в нём успешного бизнесмена</strong>.
                        </p>
                      </div>
                    </div>

                    <div className="quality-card">
                      <div className="quality-icon">🎪</div>
                      <div className="quality-content">
                        <h4>Уникальный формат "стримов добра"</h4>
                        <p>
                          Часто устраивал "стримы добра", где выбирал случайных людей из чата или улицы, узнавал их
                          историю и переводил от 10,000 до 1,000,000 ₽ в прямом эфире.{' '}
                          <strong>Это создавало ощущение справедливости и возможности</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Философия */}
                <div className="philosophy-section">
                  <h3 className="philosophy-title">💭 Философия Мелстроя</h3>
                  <div className="philosophy-quote">
                    <div className="quote-icon">💬</div>
                    <div className="quote-content">
                      <blockquote>
                        <em>
                          "Если у тебя есть деньги — делись. Это реально возвращается. Лучше потратить на добро, чем на
                          трэш."
                        </em>
                      </blockquote>
                      <cite>— Мелстрой</cite>
                    </div>
                  </div>
                  <div className="philosophy-text">
                    <p>
                      Мелстрой позиционирует свой новый проект как{' '}
                      <strong>"для хайроллеров, с моментальными выплатами и агрессивным маркетингом"</strong>. Он
                      говорит, что активно участвует в создании казино, которое будет помогать людям благодаря
                      заработку.
                    </p>
                    <p>
                      <strong>Его цель — объединить развлечения и благотворительность</strong>, создавая уникальный
                      проект, где каждый может не только играть, но и помогать другим людям.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Достижения */}
          <section className="achievements-section">
            <h2 className="section-title">🏆 Достижения</h2>
            <div className="achievements-grid">
              <div className="achievement-card">
                <div className="achievement-icon">👥</div>
                <div className="achievement-content">
                  <div className="achievement-number">15M+</div>
                  <div className="achievement-label">Подписчиков</div>
                </div>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">💰</div>
                <div className="achievement-content">
                  <div className="achievement-number">50M+</div>
                  <div className="achievement-label">Донатов получено</div>
                </div>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">🤝</div>
                <div className="achievement-content">
                  <div className="achievement-number">1000+</div>
                  <div className="achievement-label">Людей помогли</div>
                </div>
              </div>
              <div className="achievement-card">
                <div className="achievement-icon">🎯</div>
                <div className="achievement-content">
                  <div className="achievement-number">500+</div>
                  <div className="achievement-label">Челенджей выполнено</div>
                </div>
              </div>
            </div>
          </section>

          {/* Цели и миссия */}
          <section className="mission-section">
            <div className="mission-content">
              <div className="mission-text">
                <h2 className="section-title">🎯 Цели и миссия</h2>
                <div className="mission-item">
                  <div className="mission-icon">💡</div>
                  <div className="mission-content-text">
                    <h3>Вдохновение</h3>
                    <p>Вдохновлять людей на достижение своих целей и не сдаваться перед трудностями.</p>
                  </div>
                </div>
                <div className="mission-item">
                  <div className="mission-icon">🤝</div>
                  <div className="mission-content-text">
                    <h3>Помощь</h3>
                    <p>Помогать людям в трудных ситуациях и поддерживать тех, кто в этом нуждается.</p>
                  </div>
                </div>
                <div className="mission-item">
                  <div className="mission-icon">🎮</div>
                  <div className="mission-content-text">
                    <h3>Развлечения</h3>
                    <p>Создавать качественный контент и развлечения для миллионов людей по всему миру.</p>
                  </div>
                </div>
                <div className="mission-item">
                  <div className="mission-icon">🌍</div>
                  <div className="mission-content-text">
                    <h3>Развитие</h3>
                    <p>Развивать новые проекты и технологии для улучшения жизни людей.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Статистика доходов */}
          <section className="earnings-section">
            <h2 className="section-title">📊 Статистика доходов</h2>
            <div className="earnings-chart">
              <div className="chart-container">
                <canvas ref={canvasRef} id="earnings-chart"></canvas>
              </div>
              <div className="earnings-stats">
                <div className="earnings-stat">
                  <div className="stat-label">Общий доход</div>
                  <div className="stat-value">$2,500,000</div>
                </div>
                <div className="earnings-stat">
                  <div className="stat-label">Донаты</div>
                  <div className="stat-value">$1,800,000</div>
                </div>
                <div className="earnings-stat">
                  <div className="stat-label">Реклама</div>
                  <div className="stat-value">$500,000</div>
                </div>
                <div className="earnings-stat">
                  <div className="stat-label">Проекты</div>
                  <div className="stat-value">$200,000</div>
                </div>
              </div>
            </div>
          </section>

          {/* Цитаты */}
          <section className="quotes-section">
            <h2 className="section-title">💬 Цитаты Мелстроя</h2>
            <div className="quotes-grid">
              <div className="quote-card">
                <div className="quote-text">"Бери масштаб — не тормози!"</div>
                <div className="quote-context">О достижении целей</div>
              </div>
              <div className="quote-card">
                <div className="quote-text">"Помогай людям, и они помогут тебе"</div>
                <div className="quote-context">О благотворительности</div>
              </div>
              <div className="quote-card">
                <div className="quote-text">"Ты кто такой? Давай, донать!"</div>
                <div className="quote-context">О взаимодействии с аудиторией</div>
              </div>
              <div className="quote-card">
                <div className="quote-text">"Казино ждёт тебя!"</div>
                <div className="quote-context">О новых проектах</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
