import React, { useState, useEffect, useRef } from 'react';
import { MusicPlayer } from '../../widgets/music-player/MusicPlayer';
import { EventCounters } from '../../widgets/event-counters/EventCounters';
import { Header } from '../../widgets/header/Header';
import './GamesPage.scss';

export const GamesPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Состояния для рулетки
  const [rouletteSpinning, setRouletteSpinning] = useState(false);
  const [rouletteSymbols] = useState(['💎', '🍀', '🔥', '💰', '❤️', '💣', '🎲']);
  const [rouletteBet, setRouletteBet] = useState(200);
  const [rouletteBalance, setRouletteBalance] = useState(10000);
  const [rouletteHistory, setRouletteHistory] = useState<any[]>([]);
  const [rouletteResult, setRouletteResult] = useState('');
  const rouletteReelsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Состояния для блэкджека
  const [blackjackGameStarted, setBlackjackGameStarted] = useState(false);
  const [blackjackCardsFlipped, setBlackjackCardsFlipped] = useState(false);
  const [blackjackPlayerCards, setBlackjackPlayerCards] = useState<any[]>([]);
  const [blackjackDealerCards, setBlackjackDealerCards] = useState<any[]>([]);
  const [blackjackPlayerScore, setBlackjackPlayerScore] = useState(0);
  const [blackjackDealerScore, setBlackjackDealerScore] = useState(0);
  const [blackjackBet, setBlackjackBet] = useState(50);
  const [blackjackBalance, setBlackjackBalance] = useState(1000);
  const [blackjackHistory, setBlackjackHistory] = useState<any[]>([]);
  const [blackjackResult, setBlackjackResult] = useState('');

  // Состояния для пряток с военкоматом
  const [hideSeekGameStarted, setHideSeekGameStarted] = useState(false);
  const [hideSeekAttempts, setHideSeekAttempts] = useState(10);
  const [hideSeekFound, setHideSeekFound] = useState(0);
  const [hideSeekMellstroyPosition, setHideSeekMellstroyPosition] = useState<number | null>(null);
  const [hideSeekBalance, setHideSeekBalance] = useState(1000);
  const [hideSeekBet, setHideSeekBet] = useState(100);
  const [hideSeekItems] = useState([
    { emoji: '🍐', name: 'Груша', value: 50 },
    { emoji: '🍇', name: 'Слива', value: 30 },
    { emoji: '🍎', name: 'Яблоко', value: 40 },
    { emoji: '🍌', name: 'Банан', value: 35 },
    { emoji: '🍊', name: 'Апельсин', value: 45 },
  ]);
  const [hideSeekGameEnded, setHideSeekGameEnded] = useState(false);
  const [hideSeekStatus, setHideSeekStatus] = useState('Готов к игре');
  const [hideSeekResult, setHideSeekResult] = useState('');
  const [hideSeekGrid, setHideSeekGrid] = useState<any[]>([]);

  // Состояния для костей
  const [diceBet, setDiceBet] = useState(100);
  const [diceBetType, setDiceBetType] = useState('sum');
  const [diceBalance, setDiceBalance] = useState(1000);
  const [diceRolling, setDiceRolling] = useState(false);
  const [diceValues, setDiceValues] = useState({ dice1: '🎲', dice2: '🎲' });
  const [diceResult, setDiceResult] = useState('');

  // Состояния для миллионера
  const [millionaireGameStarted, setMillionaireGameStarted] = useState(false);
  const [millionaireCurrentQuestion, setMillionaireCurrentQuestion] = useState(0);
  const [millionaireCorrectAnswers, setMillionaireCorrectAnswers] = useState(0);
  const [millionaireWrongAnswers, setMillionaireWrongAnswers] = useState(0);
  const [millionaireQuestions] = useState([
    {
      question: 'На какой фразе основан этот мем?',
      answers: ['ам ам ам', 'бабачай', 'бем бем бем', 'быстрее, быстрее'],
      correct: 0,
    },
    {
      question: 'Какой город является родиной Мелстроя?',
      answers: ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург'],
      correct: 1,
    },
    {
      question: 'Сколько лет Мелстрою?',
      answers: ['25', '26', '27', '28'],
      correct: 2,
    },
  ]);
  const [millionaireGameFinished, setMillionaireGameFinished] = useState(false);
  const [millionaireResult, setMillionaireResult] = useState('');

  // Состояния для Rolls Royce
  const [rollsRoyceScore, setRollsRoyceScore] = useState(0);
  const [rollsRoyceLives, setRollsRoyceLives] = useState(3);

  // Состояния для Мизулиной
  const [mizulinaScore, setMizulinaScore] = useState(0);

  const games = [
    {
      id: 'roulette',
      icon: '🎰',
      title: 'Рулетка',
      description: 'Однорукий бандит с фруктами',
      stats: [
        { label: 'Выигрыш', value: 'x100' },
        { label: 'Сложность', value: 'Легко' },
      ],
      enabled: true,
    },
    {
      id: 'blackjack',
      icon: '♠️',
      title: 'Блэкджек',
      description: 'Карточная игра против дилера',
      stats: [
        { label: 'Выигрыш', value: 'x2' },
        { label: 'Сложность', value: 'Средне' },
      ],
      enabled: true,
    },
    {
      id: 'rolls-royce',
      icon: '🚗',
      title: 'Похищение Rolls Royce',
      description: 'Убеги от охранников',
      stats: [
        { label: 'Выигрыш', value: 'x50' },
        { label: 'Сложность', value: 'Сложно' },
      ],
      enabled: false,
    },
    {
      id: 'mizulina',
      icon: '🏃‍♂️',
      title: 'Побег от Мизулиной',
      description: 'Как Dino в Chrome',
      stats: [
        { label: 'Выигрыш', value: 'x25' },
        { label: 'Сложность', value: 'Средне' },
      ],
      enabled: false,
    },
    {
      id: 'hide-seek',
      icon: '🎯',
      title: 'Прятки с военкоматом',
      description: 'Найди Мелстроя',
      stats: [
        { label: 'Выигрыш', value: 'x75' },
        { label: 'Сложность', value: 'Легко' },
      ],
      enabled: false,
    },
    {
      id: 'dice',
      icon: '🎲',
      title: 'Кости',
      description: 'Бросай кубики и выигрывай',
      stats: [
        { label: 'Выигрыш', value: 'x10' },
        { label: 'Сложность', value: 'Легко' },
      ],
      enabled: false,
    },
    {
      id: 'millionaire',
      icon: '🧠',
      title: 'Кто хочет стать миллионером',
      description: 'Mellstroy Edition',
      stats: [
        { label: 'Выигрыш', value: 'x100' },
        { label: 'Сложность', value: 'Сложно' },
      ],
      enabled: false,
    },
  ];

  const handleGameClick = (gameId: string, enabled: boolean) => {
    if (!enabled) return;
    setActiveGame(gameId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveGame(null);
  };

  // Функции для рулетки
  const spinRoulette = () => {
    if (rouletteSpinning) return;
    if (rouletteBet > rouletteBalance) {
      setRouletteResult('Недостаточно средств!');
      return;
    }

    setRouletteSpinning(true);
    setRouletteResult('');

    // Очистить предыдущие классы результата
    const resultElement = document.getElementById('roulette-result');
    if (resultElement) {
      resultElement.classList.remove('show', 'win', 'loss');
    }

    // Очистить предыдущие классы барабанов
    rouletteReelsRef.current.forEach((reel) => {
      if (reel) {
        reel.classList.remove('spinning', 'win', 'loss');
      }
    });

    // Добавить анимацию вращения к барабанам
    rouletteReelsRef.current.forEach((reel) => {
      if (reel) {
        reel.classList.add('spinning');
      }
    });

    setTimeout(() => {
      const reel1Symbol = rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)];
      const reel2Symbol = rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)];
      const reel3Symbol = rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)];
      const reel4Symbol = rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)];
      const reel5Symbol = rouletteSymbols[Math.floor(Math.random() * rouletteSymbols.length)];

      // Обновить символы в барабанах
      const reelElements = rouletteReelsRef.current.map((reel) => reel?.querySelector('.reel-symbol'));

      if (reelElements[0]) reelElements[0].textContent = reel1Symbol;
      if (reelElements[1]) reelElements[1].textContent = reel2Symbol;
      if (reelElements[2]) reelElements[2].textContent = reel3Symbol;
      if (reelElements[3]) reelElements[3].textContent = reel4Symbol;
      if (reelElements[4]) reelElements[4].textContent = reel5Symbol;

      // Остановить анимацию вращения
      rouletteReelsRef.current.forEach((reel) => {
        if (reel) {
          reel.classList.remove('spinning');
        }
      });

      const combination = `${reel1Symbol}${reel2Symbol}${reel3Symbol}${reel4Symbol}${reel5Symbol}`;

      // Проверить комбинации
      const combinations: Record<string, { multiplier: number; name: string; type: string }> = {
        '💎💎💎💎💎': { multiplier: 50, name: 'Алмазы', type: 'legendary' },
        '🍀🍀🍀🍀🍀': { multiplier: 25, name: 'Клеверы', type: 'epic' },
        '🔥🔥🔥🔥🔥': { multiplier: 15, name: 'Огонь', type: 'rare' },
        '💰💰💰💰💰': { multiplier: 10, name: 'Деньги', type: 'uncommon' },
        '❤️❤️❤️❤️❤️': { multiplier: 7.5, name: 'Сердца', type: 'common' },
        '💣💣💣💣💣': { multiplier: 0, name: 'Бомбы', type: 'bomb' },
        '💎💎💎': { multiplier: 5, name: 'Алмазы x3', type: 'rare' },
        '🍀🍀🍀': { multiplier: 3, name: 'Клеверы x3', type: 'uncommon' },
        '🔥🔥🔥': { multiplier: 2, name: 'Огонь x3', type: 'common' },
        '💰💰💰': { multiplier: 1.5, name: 'Деньги x3', type: 'common' },
        '❤️❤️❤️': { multiplier: 1.2, name: 'Сердца x3', type: 'common' },
        '💣💣💣': { multiplier: 0, name: 'Бомбы x3', type: 'bomb' },
      };

      let winAmount = 0;
      let isWin = false;

      // Проверить комбинации из 5 символов
      if (combinations[combination]) {
        winAmount = rouletteBet * combinations[combination].multiplier;
        isWin = winAmount > 0;
      } else {
        // Проверить комбинации из 3 символов
        for (let i = 0; i <= 2; i++) {
          const threeSymbols = combination.slice(i, i + 3);
          if (combinations[threeSymbols]) {
            winAmount = rouletteBet * combinations[threeSymbols].multiplier;
            isWin = winAmount > 0;
            break;
          }
        }
      }

      // Добавить в историю
      const gameData = {
        combination: combination,
        bet: rouletteBet,
        win: winAmount,
        isWin: isWin,
        timestamp: new Date(),
      };
      setRouletteHistory((prev) => [gameData, ...prev]);

      if (isWin) {
        setRouletteBalance((prev) => prev + winAmount);
        setRouletteResult(`🎉 ВЫИГРЫШ! +$${winAmount}`);

        // Добавить эффекты выигрыша
        rouletteReelsRef.current.forEach((reel, index) => {
          if (reel) {
            setTimeout(() => {
              reel.classList.add('win');
            }, index * 200);
          }
        });

        // Создать эффект фейерверка
        createFireworksEffect();

        // Показать результат с анимацией
        setTimeout(() => {
          const resultElement = document.getElementById('roulette-result');
          if (resultElement) {
            resultElement.classList.add('show', 'win');
          }
        }, 100);
      } else {
        setRouletteBalance((prev) => prev - rouletteBet);
        setRouletteResult(`❌ Проигрыш! -$${rouletteBet}`);

        // Добавить эффекты проигрыша
        rouletteReelsRef.current.forEach((reel, index) => {
          if (reel) {
            setTimeout(() => {
              reel.classList.add('loss');
            }, index * 100);
          }
        });

        // Показать результат с анимацией
        setTimeout(() => {
          const resultElement = document.getElementById('roulette-result');
          if (resultElement) {
            resultElement.classList.add('show', 'loss');
          }
        }, 100);
      }

      setRouletteSpinning(false);
    }, 2000 + Math.random() * 1000);
  };

  // Функция создания эффекта фейерверка
  const createFireworksEffect = () => {
    const container = document.querySelector('.reels-container');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';
        particle.style.cssText = `
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1000;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
        `;

        container.appendChild(particle);

        // Удалить частицу после анимации
        setTimeout(() => {
          if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 1000);
      }, i * 200);
    }
  };

  // Функции для модальных окон
  const openRouletteModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (modalId === 'history-modal') {
        updateRouletteHistoryModal();
      } else if (modalId === 'combinations-modal') {
        // Модальное окно комбинаций не требует обновления
        // так как данные статичны
      }
    }
  };

  const closeRouletteModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  const updateRouletteHistoryModal = () => {
    const historyList = document.getElementById('history-list-full');
    const totalGames = document.getElementById('total-games');
    const totalWins = document.getElementById('total-wins');
    const totalLosses = document.getElementById('total-losses');
    const totalProfit = document.getElementById('total-profit');

    if (!historyList) return;

    // Статистика
    const wins = rouletteHistory.filter((game) => game.isWin).length;
    const losses = rouletteHistory.filter((game) => !game.isWin).length;
    const profit = rouletteHistory.reduce((sum, game) => sum + game.win, 0);

    if (totalGames) totalGames.textContent = rouletteHistory.length.toString();
    if (totalWins) totalWins.textContent = wins.toString();
    if (totalLosses) totalLosses.textContent = losses.toString();
    if (totalProfit) totalProfit.textContent = `$${profit.toLocaleString()}`;

    // История игр
    historyList.innerHTML = '';
    rouletteHistory.forEach((game) => {
      const gameElement = document.createElement('div');
      gameElement.className = `history-item ${game.isWin ? 'win' : 'loss'}`;

      const resultText = game.isWin ? 'Выигрыш' : 'Проигрыш';
      const amountText = game.win > 0 ? `+$${game.win}` : game.win < 0 ? `-$${Math.abs(game.win)}` : '$0';

      gameElement.innerHTML = `
        <div class="history-time">${game.timestamp.toLocaleString()}</div>
        <div class="history-result">${resultText}</div>
        <div class="history-details">
          <span>Ставка: $${game.bet}</span>
          <span>${amountText}</span>
        </div>
      `;

      historyList.appendChild(gameElement);
    });
  };

  const clearRouletteHistory = () => {
    setRouletteHistory([]);
    localStorage.removeItem('roulette_history');
    updateRouletteHistoryModal();
    console.log('История рулетки очищена');
  };

  const clearBlackjackHistory = () => {
    setBlackjackHistory([]);
    localStorage.removeItem('blackjack_history');
    console.log('История блэкджека очищена');
  };

  const openBlackjackModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      if (modalId === 'blackjack-history-modal') {
        updateBlackjackHistoryModal();
      }
    }
  };

  const closeBlackjackModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  const updateBlackjackHistoryModal = () => {
    const historyList = document.getElementById('blackjack-history-list-full');
    const totalGames = document.getElementById('blackjack-total-games');
    const totalWins = document.getElementById('blackjack-total-wins');
    const totalLosses = document.getElementById('blackjack-total-losses');
    const totalProfit = document.getElementById('blackjack-total-profit');

    if (!historyList) return;

    // Статистика
    const wins = blackjackHistory.filter((game) => game.isWin).length;
    const losses = blackjackHistory.filter((game) => !game.isWin).length;
    const profit = blackjackHistory.reduce((sum, game) => sum + game.win, 0);

    if (totalGames) totalGames.textContent = blackjackHistory.length.toString();
    if (totalWins) totalWins.textContent = wins.toString();
    if (totalLosses) totalLosses.textContent = losses.toString();
    if (totalProfit) totalProfit.textContent = `$${profit.toLocaleString()}`;

    // История игр
    historyList.innerHTML = '';
    blackjackHistory.forEach((game) => {
      const gameElement = document.createElement('div');
      gameElement.className = `history-item ${game.isWin ? 'win' : 'loss'}`;

      const resultText = game.isWin ? 'Выигрыш' : 'Проигрыш';
      const amountText = game.win > 0 ? `+$${game.win}` : game.win < 0 ? `-$${Math.abs(game.win)}` : '$0';

      gameElement.innerHTML = `
        <div class="history-time">${game.timestamp.toLocaleString()}</div>
        <div class="history-result">${resultText}</div>
        <div class="history-details">
          <span>Ставка: $${game.bet}</span>
          <span>${amountText}</span>
        </div>
      `;

      historyList.appendChild(gameElement);
    });
  };

  // Автоматически инициализируем блэкджек при открытии игры
  useEffect(() => {
    if (activeGame === 'blackjack' && !blackjackGameStarted) {
      startBlackjack();
    }
  }, [activeGame]);

  const getRandomCards = (count: number) => {
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const cards = [];

    for (let i = 0; i < count; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const value = values[Math.floor(Math.random() * values.length)];
      cards.push({ suit, value });
    }

    return cards;
  };

  const calculateScore = (cards: any[]) => {
    let score = 0;
    let aces = 0;

    cards.forEach((card) => {
      if (card.value === 'A') {
        aces++;
        score += 11;
      } else if (['J', 'Q', 'K'].includes(card.value)) {
        score += 10;
      } else {
        score += parseInt(card.value);
      }
    });

    while (score > 21 && aces > 0) {
      score -= 10;
      aces--;
    }

    return score;
  };

  const startBlackjack = () => {
    const newPlayerCards = getRandomCards(2);
    const newDealerCards = getRandomCards(2);
    const newPlayerScore = calculateScore(newPlayerCards);
    const newDealerScore = calculateScore(newDealerCards);

    setBlackjackPlayerCards(newPlayerCards);
    setBlackjackDealerCards(newDealerCards);
    setBlackjackPlayerScore(newPlayerScore);
    setBlackjackDealerScore(newDealerScore);
    setBlackjackGameStarted(true);
    setBlackjackCardsFlipped(false);
    setBlackjackResult('');
  };

  const hitCard = () => {
    if (!blackjackGameStarted || !blackjackCardsFlipped) return;

    const newCard = getRandomCards(1)[0];
    const newPlayerCards = [...blackjackPlayerCards, newCard];
    const newPlayerScore = calculateScore(newPlayerCards);

    setBlackjackPlayerCards(newPlayerCards);
    setBlackjackPlayerScore(newPlayerScore);

    if (newPlayerScore > 21) {
      setBlackjackResult('Игрок перебрал!');
      setBlackjackBalance((prev) => prev - blackjackBet);
      setTimeout(() => startBlackjack(), 2000);
    }
  };

  const standCard = () => {
    if (!blackjackGameStarted || !blackjackCardsFlipped) return;

    let newDealerCards = [...blackjackDealerCards];
    let newDealerScore = calculateScore(newDealerCards);

    while (newDealerScore < 17) {
      const newCard = getRandomCards(1)[0];
      newDealerCards.push(newCard);
      newDealerScore = calculateScore(newDealerCards);
    }

    setBlackjackDealerCards(newDealerCards);
    setBlackjackDealerScore(newDealerScore);

    let result = '';
    if (blackjackPlayerScore > 21) {
      result = `❌ Перебор! Вы проиграли $${blackjackBet}`;
      setBlackjackBalance((prev) => prev - blackjackBet);
    } else if (newDealerScore > 21) {
      result = `🎉 Дилер перебрал! Вы выиграли $${blackjackBet}`;
      setBlackjackBalance((prev) => prev + blackjackBet);
    } else if (blackjackPlayerScore > newDealerScore) {
      result = `🎉 Выигрыш! Вы выиграли $${blackjackBet}`;
      setBlackjackBalance((prev) => prev + blackjackBet);
    } else if (newDealerScore > blackjackPlayerScore) {
      result = `❌ Проигрыш! Вы проиграли $${blackjackBet}`;
      setBlackjackBalance((prev) => prev - blackjackBet);
    } else {
      result = `🤝 Ничья! Ставка возвращена`;
    }

    setBlackjackResult(result);

    // Добавить в историю
    const gameData = {
      timestamp: new Date(),
      bet: blackjackBet,
      win: result.includes('выиграли') ? blackjackBet : result.includes('проиграли') ? -blackjackBet : 0,
      isWin: result.includes('выиграли'),
      playerScore: blackjackPlayerScore,
      dealerScore: newDealerScore,
    };
    setBlackjackHistory((prev) => [gameData, ...prev.slice(0, 49)]);

    setTimeout(() => startBlackjack(), 2000);
  };

  const flipCards = () => {
    if (!blackjackGameStarted) return;
    setBlackjackCardsFlipped(true);
  };

  // Функции для пряток с военкоматом
  const startHideSeek = () => {
    if (hideSeekGameEnded) {
      resetHideSeek();
    }

    if (hideSeekBet > hideSeekBalance) {
      setHideSeekResult('Недостаточно средств!');
      return;
    }

    setHideSeekGameStarted(true);
    setHideSeekAttempts(10);
    setHideSeekFound(0);
    // setHideSeekFoundItems([]);
    setHideSeekGameEnded(false);
    setHideSeekStatus('Ищем...');
    setHideSeekBalance((prev) => prev - hideSeekBet);
    createHideSeekGrid();
  };

  const resetHideSeek = () => {
    setHideSeekGameStarted(false);
    setHideSeekAttempts(10);
    setHideSeekFound(0);
    setHideSeekMellstroyPosition(null);
    // setHideSeekFoundItems([]);
    setHideSeekGameEnded(false);
    setHideSeekStatus('Готов к игре');
    setHideSeekResult('');
  };

  const createHideSeekGrid = () => {
    const grid = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      content: '❓',
      flipped: false,
      item: null as any,
    }));

    // Случайно выбрать позицию Мелстроя
    const mellstroyPos = Math.floor(Math.random() * 20);
    setHideSeekMellstroyPosition(mellstroyPos);

    // Добавить предметы
    const itemPositions = [];
    for (let i = 0; i < 20; i++) {
      if (i !== mellstroyPos) {
        itemPositions.push(i);
      }
    }

    const shuffledPositions = itemPositions.sort(() => Math.random() - 0.5);
    const itemsToPlace = Math.min(8, shuffledPositions.length);

    for (let i = 0; i < itemsToPlace; i++) {
      const randomItem = hideSeekItems[Math.floor(Math.random() * hideSeekItems.length)];
      const position = shuffledPositions[i];
      grid[position].item = randomItem;
    }

    setHideSeekGrid(grid);
  };

  const checkHideSeekItem = (index: number) => {
    if (!hideSeekGameStarted || hideSeekAttempts <= 0) return;

    const newGrid = [...hideSeekGrid];
    const item = newGrid[index];

    if (item.flipped) return;

    item.flipped = true;
    setHideSeekAttempts((prev) => prev - 1);

    // Добавить анимацию переворота
    const gridElement = document.querySelector(`[data-index="${index}"]`);
    if (gridElement) {
      gridElement.classList.add('flipped');
    }

    if (index === hideSeekMellstroyPosition) {
      item.content = '🎯';
      setHideSeekFound((prev) => prev + 1);
      const winAmount = 500 + hideSeekBet * 5;
      setHideSeekBalance((prev) => prev + winAmount);
      setHideSeekResult(`🎉 НАЙДЕН МЕЛСТРОЙ! +$${winAmount}`);

      // Добавить эффект выигрыша
      if (gridElement) {
        gridElement.classList.add('mellstroy');
        createHideSeekFireworksEffect(gridElement);
      }

      endHideSeek();
    } else if (item.item) {
      item.content = item.item.emoji;
      // setHideSeekFoundItems((prev: any[]) => [...prev, item.item]);
      setHideSeekBalance((prev) => prev + item.item.value);
      setHideSeekResult(`🍎 Найден ${item.item.name}! +$${item.item.value}`);

      // Добавить эффект найденного предмета
      if (gridElement) {
        gridElement.classList.add('item-found');
      }
    } else {
      item.content = '❌';
      setHideSeekResult('❌ Пусто! Попробуйте ещё раз');
    }

    setHideSeekGrid(newGrid);

    if (hideSeekAttempts <= 1 && !hideSeekGameEnded) {
      endHideSeek();
    }
  };

  // Функция создания эффекта фейерверка для пряток
  const createHideSeekFireworksEffect = (item: Element) => {
    const rect = item.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.left = centerX + 'px';
      particle.style.top = centerY + 'px';
      particle.style.width = '6px';
      particle.style.height = '6px';
      particle.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 50%)`;
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '9999';

      const angle = (i / 12) * Math.PI * 2;
      const velocity = 100 + Math.random() * 50;
      const lifetime = 1000 + Math.random() * 500;

      document.body.appendChild(particle);

      let startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / lifetime;

        if (progress >= 1) {
          document.body.removeChild(particle);
          return;
        }

        const x = centerX + Math.cos(angle) * velocity * progress;
        const y = centerY + Math.sin(angle) * velocity * progress - 50 * progress * progress;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = (1 - progress).toString();

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  };

  const endHideSeek = () => {
    setHideSeekGameStarted(false);
    setHideSeekGameEnded(true);

    if (hideSeekFound > 0) {
      setHideSeekStatus('Найден!');
    } else {
      setHideSeekStatus('Убежал!');
    }

    setTimeout(() => {
      setHideSeekResult('');
    }, 3000);
  };

  // Функции для костей
  const rollDice = () => {
    if (diceRolling) return;
    if (diceBet > diceBalance) {
      setDiceResult('Недостаточно средств!');
      return;
    }

    setDiceRolling(true);
    setDiceResult('');

    // Очистить предыдущие классы результата
    const resultElement = document.getElementById('dice-result');
    if (resultElement) {
      resultElement.classList.remove('show', 'win', 'loss');
    }

    // Очистить предыдущие классы костей
    const dice1Element = document.getElementById('dice1');
    const dice2Element = document.getElementById('dice2');
    if (dice1Element) dice1Element.classList.remove('rolling', 'win', 'loss');
    if (dice2Element) dice2Element.classList.remove('rolling', 'win', 'loss');

    // Добавить анимацию вращения к костям
    if (dice1Element) dice1Element.classList.add('rolling');
    if (dice2Element) dice2Element.classList.add('rolling');

    setTimeout(() => {
      const value1 = Math.floor(Math.random() * 6) + 1;
      const value2 = Math.floor(Math.random() * 6) + 1;
      const sum = value1 + value2;

      const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      setDiceValues({
        dice1: diceEmojis[value1 - 1],
        dice2: diceEmojis[value2 - 1],
      });

      // Убрать анимацию вращения
      if (dice1Element) dice1Element.classList.remove('rolling');
      if (dice2Element) dice2Element.classList.remove('rolling');

      let win = false;
      let multiplier = 1;

      switch (diceBetType) {
        case 'sum':
          win = sum === 7;
          multiplier = 6;
          break;
        case 'even':
          win = sum % 2 === 0;
          multiplier = 2;
          break;
        case 'odd':
          win = sum % 2 === 1;
          multiplier = 2;
          break;
      }

      if (win) {
        const winAmount = diceBet * multiplier;
        setDiceBalance((prev) => prev + winAmount);
        setDiceResult(`🎉 ВЫИГРЫШ! Сумма: ${sum} (${value1}+${value2}) - +$${winAmount}`);

        // Добавить эффекты выигрыша
        if (dice1Element) dice1Element.classList.add('win');
        if (dice2Element) dice2Element.classList.add('win');
      } else {
        setDiceBalance((prev) => prev - diceBet);
        setDiceResult(`❌ Проигрыш! Сумма: ${sum} (${value1}+${value2}) - -$${diceBet}`);

        // Добавить эффекты проигрыша
        if (dice1Element) dice1Element.classList.add('loss');
        if (dice2Element) dice2Element.classList.add('loss');
      }

      // Показать результат с анимацией
      setTimeout(() => {
        const resultElement = document.getElementById('dice-result');
        if (resultElement) {
          resultElement.classList.add('show', win ? 'win' : 'loss');
        }
      }, 100);

      setDiceRolling(false);
    }, 1500);
  };

  // Функции для миллионера
  const startMillionaire = () => {
    setMillionaireGameStarted(true);
    setMillionaireCurrentQuestion(0);
    setMillionaireCorrectAnswers(0);
    setMillionaireWrongAnswers(0);
    setMillionaireGameFinished(false);
    setMillionaireResult('');
  };

  const selectMillionaireAnswer = (answerIndex: number) => {
    if (!millionaireGameStarted || millionaireGameFinished) return;

    // setMillionaireSelectedAnswer(answerIndex);

    const currentQuestion = millionaireQuestions[millionaireCurrentQuestion];
    const isCorrect = answerIndex === currentQuestion.correct;

    if (isCorrect) {
      setMillionaireCorrectAnswers((prev) => prev + 1);
    } else {
      setMillionaireWrongAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      const nextQuestion = millionaireCurrentQuestion + 1;
      if (nextQuestion >= millionaireQuestions.length) {
        finishMillionaire();
      } else {
        setMillionaireCurrentQuestion(nextQuestion);
        // setMillionaireSelectedAnswer(null);
      }
    }, 2000);
  };

  const finishMillionaire = () => {
    setMillionaireGameFinished(true);
    const percentage = Math.round((millionaireCorrectAnswers / millionaireQuestions.length) * 100);

    if (percentage >= 70) {
      setMillionaireResult(`✅ Ты — ${percentage}% фанат Мелстроя! Отличный результат!`);
    } else {
      setMillionaireResult(`❌ Ты не шаришь 😅 (${percentage}% правильных ответов)`);
    }
  };

  // Функции для Rolls Royce
  const startRollsRoyce = () => {
    // setRollsRoyceGameStarted(true);
    setRollsRoyceScore(0);
    setRollsRoyceLives(3);
  };

  // Функции для Мизулиной
  const startMizulina = () => {
    // setMizulinaGameStarted(true);
    setMizulinaScore(0);
  };

  return (
    <div className="games-page">
      <MusicPlayer />
      <EventCounters />
      <Header />
      <main className="games-main">
        {/* Заголовок страницы */}
        <section className="page-header">
          <h1 className="page-title">🎮 ИГРЫ КАЗИНО</h1>
          <p className="page-subtitle">Выберите игру и начните выигрывать!</p>
        </section>

        {/* Сетка игр */}
        <section className="games-grid-section">
          <div className="games-grid">
            {games.map((game) => (
              <div
                key={game.id}
                className={`game-card ${!game.enabled ? 'disabled' : ''}`}
                data-game={game.id}
                onClick={() => handleGameClick(game.id, game.enabled)}
              >
                {!game.enabled && (
                  <div className="development-badge">
                    <span className="badge-text">🚧 В РАЗРАБОТКЕ</span>
                  </div>
                )}
                <div className="game-icon">{game.icon}</div>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <div className="game-stats">
                  {game.stats.map((stat, index) => (
                    <span key={index} className="stat">
                      {stat.label}: {stat.value}
                    </span>
                  ))}
                </div>
                <button className="play-btn" disabled={!game.enabled}>
                  {game.enabled ? 'ИГРАТЬ' : 'В РАЗРАБОТКЕ'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Модальные окна игр */}
      <div className={`game-modal ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>

          {/* Рулетка */}
          <div id="roulette-game" className={`game-container ${activeGame === 'roulette' ? 'active' : 'hidden'}`}>
            <div className="roulette-header">
              <div className="roulette-title-section">
                <h2 className="roulette-title">🎰 Рулетка</h2>
                <div className="balance-display">
                  <span className="balance-label">Баланс:</span>
                  <span id="player-balance" className="balance-amount">
                    ${rouletteBalance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="roulette-buttons">
                <button
                  id="history-btn"
                  className="roulette-info-btn"
                  onClick={() => openRouletteModal('history-modal')}
                >
                  <i className="fas fa-history"></i>
                  История игр
                </button>
                <button
                  id="combinations-btn"
                  className="roulette-info-btn"
                  onClick={() => openRouletteModal('combinations-modal')}
                >
                  <i className="fas fa-trophy"></i>
                  Комбинации выигрыша
                </button>
              </div>
            </div>

            <div className="roulette-container">
              <div className="reels-container">
                <div className="reels">
                  <div
                    className="reel"
                    id="reel1"
                    ref={(el) => {
                      rouletteReelsRef.current[0] = el;
                    }}
                  >
                    <div className="reel-symbol">💎</div>
                  </div>
                  <div
                    className="reel"
                    id="reel2"
                    ref={(el) => {
                      rouletteReelsRef.current[1] = el;
                    }}
                  >
                    <div className="reel-symbol">🍀</div>
                  </div>
                  <div
                    className="reel"
                    id="reel3"
                    ref={(el) => {
                      rouletteReelsRef.current[2] = el;
                    }}
                  >
                    <div className="reel-symbol">🔥</div>
                  </div>
                  <div
                    className="reel"
                    id="reel4"
                    ref={(el) => {
                      rouletteReelsRef.current[3] = el;
                    }}
                  >
                    <div className="reel-symbol">💰</div>
                  </div>
                  <div
                    className="reel"
                    id="reel5"
                    ref={(el) => {
                      rouletteReelsRef.current[4] = el;
                    }}
                  >
                    <div className="reel-symbol">❤️</div>
                  </div>
                </div>
                <div className="reel-lines"></div>
              </div>

              <div className="roulette-controls">
                <div className="bet-section">
                  <div className="bet-label">Сделайте ставку:</div>
                  <div className="bet-controls-row">
                    <div className="bet-input-container">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        id="bet-amount"
                        value={rouletteBet}
                        onChange={(e) => setRouletteBet(Number(e.target.value))}
                        min="10"
                        max="1000"
                        className="bet-input"
                      />
                    </div>
                    <div className="bet-buttons">
                      <button className="bet-quick" onClick={() => setRouletteBet(50)}>
                        50
                      </button>
                      <button className="bet-quick" onClick={() => setRouletteBet(100)}>
                        100
                      </button>
                      <button
                        className={`bet-quick ${rouletteBet === 200 ? 'active' : ''}`}
                        onClick={() => setRouletteBet(200)}
                      >
                        200
                      </button>
                      <button className="bet-quick" onClick={() => setRouletteBet(500)}>
                        500
                      </button>
                    </div>
                  </div>
                </div>

                <button className="spin-btn" id="spin-btn" onClick={spinRoulette} disabled={rouletteSpinning}>
                  <div className="spin-btn-content">
                    <i className="fas fa-play"></i>
                    <span>{rouletteSpinning ? 'SPINNING...' : 'SPIN'}</span>
                  </div>
                </button>
              </div>

              <div className="roulette-result" id="roulette-result">
                {rouletteResult}
              </div>
            </div>
          </div>

          {/* Блэкджек */}
          <div id="blackjack-game" className={`game-container ${activeGame === 'blackjack' ? 'active' : 'hidden'}`}>
            <div className="blackjack-header">
              <div className="blackjack-title-section">
                <h2 className="blackjack-title">🃏 Блэкджек</h2>
                <div className="blackjack-balance">
                  <span className="balance-label">Баланс:</span>
                  <span id="blackjack-balance" className="balance-amount">
                    ${blackjackBalance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="blackjack-buttons">
                <button
                  id="blackjack-history-btn"
                  className="blackjack-info-btn"
                  onClick={() => openBlackjackModal('blackjack-history-modal')}
                >
                  <i className="fas fa-history"></i>
                  <span className="btn-text">История игр</span>
                </button>
                <button
                  id="blackjack-rules-btn"
                  className="blackjack-info-btn"
                  onClick={() => openBlackjackModal('blackjack-rules-modal')}
                >
                  <i className="fas fa-book"></i>
                  <span className="btn-text">Правила игры</span>
                </button>
              </div>
            </div>

            <div className="blackjack-container">
              <div className="cards-container">
                <div className="dealer-section">
                  <div className="section-header">
                    <h3>Дилер</h3>
                    <span className="score" id="dealer-score">
                      {blackjackCardsFlipped ? blackjackDealerScore : '?'}
                    </span>
                  </div>
                  <div id="dealer-cards" className="cards-grid">
                    {blackjackDealerCards.map((card, index) => (
                      <div key={index} className="card">
                        <span className="card-content">
                          {blackjackCardsFlipped ? `${card.value}${card.suit}` : '🂠'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="player-section">
                  <div className="section-header">
                    <h3>Игрок</h3>
                    <span className="score" id="player-score">
                      {blackjackCardsFlipped ? blackjackPlayerScore : '?'}
                    </span>
                  </div>
                  <div id="player-cards" className="cards-grid">
                    {blackjackPlayerCards.map((card, index) => (
                      <div key={index} className={`card ${!blackjackCardsFlipped ? 'back' : ''}`}>
                        <span className="card-content">
                          {blackjackCardsFlipped ? `${card.value}${card.suit}` : '🂠'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="blackjack-controls">
                <div className="bet-section">
                  <div className="bet-label">Сделайте ставку:</div>
                  <div className="bet-controls-row">
                    <div className="bet-input-container">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        id="blackjack-bet"
                        value={blackjackBet}
                        onChange={(e) => setBlackjackBet(Number(e.target.value))}
                        min="10"
                        max="500"
                        className="bet-input"
                      />
                    </div>
                    <div className="bet-buttons">
                      <button className="bet-quick" onClick={() => setBlackjackBet(25)}>
                        25
                      </button>
                      <button className="bet-quick" onClick={() => setBlackjackBet(50)}>
                        50
                      </button>
                      <button className="bet-quick" onClick={() => setBlackjackBet(100)}>
                        100
                      </button>
                      <button className="bet-quick" onClick={() => setBlackjackBet(200)}>
                        200
                      </button>
                    </div>
                  </div>
                </div>

                <div className="game-buttons">
                  <button
                    id="flip-btn"
                    className="game-btn secondary"
                    onClick={flipCards}
                    disabled={!blackjackGameStarted || blackjackCardsFlipped}
                  >
                    <i className="fas fa-sync-alt"></i>
                    <span>Перевернуть</span>
                  </button>
                  <button
                    id="hit-btn"
                    className="game-btn secondary"
                    onClick={hitCard}
                    disabled={!blackjackGameStarted || !blackjackCardsFlipped}
                  >
                    <i className="fas fa-plus"></i>
                    <span>Взять</span>
                  </button>
                  <button
                    id="double-btn"
                    className="game-btn secondary"
                    disabled={!blackjackGameStarted || !blackjackCardsFlipped}
                  >
                    <i className="fas fa-angle-double-up"></i>
                    <span>Дабл</span>
                  </button>
                  <button
                    id="stand-btn"
                    className="game-btn secondary"
                    onClick={standCard}
                    disabled={!blackjackGameStarted || !blackjackCardsFlipped}
                  >
                    <i className="fas fa-hand-paper"></i>
                    <span>Остановиться</span>
                  </button>
                </div>
              </div>

              <div className="blackjack-result" id="blackjack-result">
                {blackjackResult}
              </div>
            </div>
          </div>

          {/* Похищение Rolls Royce */}
          <div id="rolls-royce-game" className={`game-container ${activeGame === 'rolls-royce' ? 'active' : 'hidden'}`}>
            <h2>🚗 Похищение Rolls Royce</h2>
            <div className="rolls-royce-container">
              <canvas id="rolls-canvas" width="800" height="600"></canvas>
              <div className="rolls-controls">
                <button className="game-btn" onClick={startRollsRoyce}>
                  Начать игру
                </button>
                <div className="rolls-info">
                  <span>
                    Очки: <span>{rollsRoyceScore}</span>
                  </span>
                  <span>
                    Жизни: <span>{rollsRoyceLives}</span>
                  </span>
                </div>
              </div>
              <div className="rolls-instructions">
                <p>Используйте стрелки для движения. Избегайте охранников!</p>
              </div>
            </div>
          </div>

          {/* Побег от Мизулиной */}
          <div id="mizulina-game" className={`game-container ${activeGame === 'mizulina' ? 'active' : 'hidden'}`}>
            <h2>🏃‍♂️ Побег от Мизулиной</h2>
            <div className="mizulina-container">
              <canvas id="mizulina-canvas" width="800" height="400"></canvas>
              <div className="mizulina-controls">
                <button className="game-btn" onClick={startMizulina}>
                  Начать игру
                </button>
                <div className="mizulina-info">
                  <span>
                    Очки: <span>{mizulinaScore}</span>
                  </span>
                  <span>
                    Рекорд: <span>{mizulinaScore}</span>
                  </span>
                </div>
              </div>
              <div className="mizulina-instructions">
                <p>Нажмите ПРОБЕЛ или кликните для прыжка. Избегайте Мизулину!</p>
              </div>
            </div>
          </div>

          {/* Прятки с военкоматом */}
          <div id="hide-seek-game" className={`game-container ${activeGame === 'hide-seek' ? 'active' : 'hidden'}`}>
            <div className="hide-seek-header">
              <div className="hide-seek-title-section">
                <h2 className="hide-seek-title">🎯 Прятки с военкоматом</h2>
                <div className="hide-seek-balance">
                  <span className="balance-label">Баланс:</span>
                  <span id="hide-seek-balance" className="balance-amount">
                    ${hideSeekBalance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="hide-seek-buttons">
                <button id="hide-seek-history-btn" className="hide-seek-info-btn">
                  <i className="fas fa-history"></i>
                  История игр
                </button>
                <button id="hide-seek-rules-btn" className="hide-seek-info-btn">
                  <i className="fas fa-book"></i>
                  Правила игры
                </button>
              </div>
            </div>

            <div className="hide-seek-container">
              <div className="hide-seek-single-line">
                <div className="hide-seek-betting">
                  <div className="bet-section">
                    <div className="bet-label">Ставка:</div>
                    <div className="bet-controls-row">
                      <div className="bet-input-container">
                        <span className="currency">$</span>
                        <input
                          type="number"
                          id="hide-seek-bet"
                          value={hideSeekBet}
                          onChange={(e) => setHideSeekBet(Number(e.target.value))}
                          min="10"
                          max="1000"
                          className="bet-input"
                        />
                      </div>
                      <div className="bet-buttons">
                        <button className="bet-quick" onClick={() => setHideSeekBet(50)}>
                          50
                        </button>
                        <button className="bet-quick" onClick={() => setHideSeekBet(100)}>
                          100
                        </button>
                        <button className="bet-quick" onClick={() => setHideSeekBet(200)}>
                          200
                        </button>
                        <button className="bet-quick" onClick={() => setHideSeekBet(500)}>
                          500
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hide-seek-stats">
                  <div className="stat-item">
                    <span className="stat-label">Попытки:</span>
                    <span id="hide-seek-attempts" className="stat-value">
                      {hideSeekAttempts}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Найдено:</span>
                    <span id="hide-seek-found" className="stat-value">
                      {hideSeekFound}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Статус:</span>
                    <span id="hide-seek-status" className="stat-value">
                      {hideSeekStatus}
                    </span>
                  </div>
                </div>

                <div className="hide-seek-controls">
                  <button
                    id="start-hide-seek"
                    className="hide-seek-btn"
                    onClick={startHideSeek}
                    disabled={hideSeekGameStarted}
                  >
                    <div className="hide-seek-btn-content">
                      <i className="fas fa-search"></i>
                      <span>{hideSeekGameStarted ? 'ИГРА ИДЕТ...' : 'НАЧАТЬ ПОИСК'}</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="hide-seek-grid" id="hide-seek-grid">
                {/* Сетка 4x5 для пряток */}
                {hideSeekGrid.map((item, index) => (
                  <div
                    key={index}
                    className="hide-seek-item"
                    data-index={index}
                    onClick={() => checkHideSeekItem(index)}
                  >
                    <span className="item-content">{item.content}</span>
                  </div>
                ))}
              </div>

              <div className="hide-seek-result" id="hide-seek-result">
                {hideSeekResult}
              </div>
            </div>
          </div>

          {/* Кости */}
          <div id="dice-game" className={`game-container ${activeGame === 'dice' ? 'active' : 'hidden'}`}>
            <div className="dice-header">
              <div className="dice-title-section">
                <h2 className="dice-title">🎲 Кости</h2>
                <div className="dice-balance">
                  <span className="balance-label">Баланс:</span>
                  <span id="dice-balance" className="balance-amount">
                    ${diceBalance.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="dice-buttons">
                <button id="dice-history-btn" className="dice-info-btn">
                  <i className="fas fa-history"></i>
                  <span className="btn-text">История игр</span>
                </button>
                <button id="dice-rules-btn" className="dice-info-btn">
                  <i className="fas fa-book"></i>
                  <span className="btn-text">Правила игры</span>
                </button>
              </div>
            </div>

            <div className="dice-container">
              <div className="dice-area">
                <div className="dice" id="dice1">
                  {diceValues.dice1}
                </div>
                <div className="dice" id="dice2">
                  {diceValues.dice2}
                </div>
              </div>

              <div className="dice-controls">
                <div className="bet-section">
                  <div className="bet-label">Сделайте ставку:</div>
                  <div className="bet-controls-row">
                    <div className="bet-input-container">
                      <span className="currency">$</span>
                      <input
                        type="number"
                        value={diceBet}
                        onChange={(e) => setDiceBet(Number(e.target.value))}
                        min="10"
                        max="1000"
                        className="bet-input"
                      />
                    </div>
                    <div className="bet-buttons">
                      <button className="bet-quick" onClick={() => setDiceBet(50)}>
                        50
                      </button>
                      <button className="bet-quick" onClick={() => setDiceBet(100)}>
                        100
                      </button>
                      <button className="bet-quick" onClick={() => setDiceBet(200)}>
                        200
                      </button>
                      <button className="bet-quick" onClick={() => setDiceBet(500)}>
                        500
                      </button>
                    </div>
                  </div>
                </div>

                <div className="dice-options">
                  <div className="option-group">
                    <h4>Тип ставки:</h4>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="dice-bet-type"
                          value="sum"
                          checked={diceBetType === 'sum'}
                          onChange={(e) => setDiceBetType(e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-text">Сумма (7)</span>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="dice-bet-type"
                          value="even"
                          checked={diceBetType === 'even'}
                          onChange={(e) => setDiceBetType(e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-text">Чётное</span>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="dice-bet-type"
                          value="odd"
                          checked={diceBetType === 'odd'}
                          onChange={(e) => setDiceBetType(e.target.value)}
                        />
                        <span className="radio-custom"></span>
                        <span className="radio-text">Нечётное</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="roll-btn" onClick={rollDice} disabled={diceRolling}>
                  <div className="roll-btn-content">
                    <i className="fas fa-dice"></i>
                    <span>{diceRolling ? 'БРОСАЕМ...' : 'БРОСИТЬ КОСТИ'}</span>
                  </div>
                </button>
              </div>

              <div className="dice-result">{diceResult}</div>
            </div>
          </div>

          {/* Кто хочет стать миллионером */}
          <div id="millionaire-game" className={`game-container ${activeGame === 'millionaire' ? 'active' : 'hidden'}`}>
            <h2>🧠 Кто хочет стать миллионером</h2>
            <div className="millionaire-container">
              <div className="millionaire-header">
                <div className="millionaire-logo">
                  <h3>Mellstroy Edition</h3>
                  <div className="millionaire-progress">
                    <span>
                      Вопрос <span>1</span> из <span>10</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="millionaire-content">
                <div className="question-area">
                  <div className="question-image">
                    <img
                      src="/assets/main-meme.png"
                      alt="Mellstroy"
                      style={{ maxWidth: '200px', borderRadius: '12px' }}
                    />
                  </div>
                  <div className="question-text">{millionaireQuestions[millionaireCurrentQuestion]?.question}</div>
                </div>

                <div className="answers-grid">
                  {millionaireQuestions[millionaireCurrentQuestion]?.answers.map((answer, index) => (
                    <div
                      key={index}
                      className="answer-card"
                      data-answer={index}
                      onClick={() => selectMillionaireAnswer(index)}
                    >
                      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="answer-text">{answer}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="millionaire-controls">
                <button className="game-btn" onClick={startMillionaire} disabled={millionaireGameStarted}>
                  Начать викторину
                </button>
                <div className="millionaire-info">
                  <span>
                    Правильных ответов: <span>{millionaireCorrectAnswers}</span>
                  </span>
                  <span>
                    Неправильных: <span>{millionaireWrongAnswers}</span>
                  </span>
                </div>
              </div>

              <div className="millionaire-result">{millionaireResult}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальные окна истории и комбинаций */}
      {/* История игр рулетки */}
      <div id="history-modal" className="roulette-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>📊 История игр</h3>
            <div className="modal-header-buttons">
              <button className="clear-history-btn" title="Очистить историю" onClick={clearRouletteHistory}>
                <i className="fas fa-trash"></i>
              </button>
              <button className="modal-close-btn" onClick={() => closeRouletteModal('history-modal')}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="history-stats">
              <div className="stat-item">
                <span className="stat-label">Всего игр:</span>
                <span id="total-games" className="stat-value">
                  0
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Выигрышей:</span>
                <span id="total-wins" className="stat-value">
                  0
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Проигрышей:</span>
                <span id="total-losses" className="stat-value">
                  0
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Общий выигрыш:</span>
                <span id="total-profit" className="stat-value">
                  $0
                </span>
              </div>
            </div>
            <div className="history-list-full" id="history-list-full">
              {/* История будет заполняться динамически */}
            </div>
          </div>
        </div>
      </div>

      {/* Комбинации выигрыша рулетки */}
      <div id="combinations-modal" className="roulette-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>🏆 Комбинации выигрыша</h3>
            <button className="modal-close-btn" onClick={() => closeRouletteModal('combinations-modal')}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="combinations-table">
              <div className="table-header">
                <div className="col-symbols">Комбинация</div>
                <div className="col-name">Символы</div>
                <div className="col-multiplier">Выигрыш от ставки</div>
              </div>
              <div className="table-row legendary">
                <div className="col-symbols">💎💎💎💎💎</div>
                <div className="col-name">Алмазы (5)</div>
                <div className="col-multiplier">x50</div>
              </div>
              <div className="table-row epic">
                <div className="col-symbols">🍀🍀🍀🍀🍀</div>
                <div className="col-name">Клевер (5)</div>
                <div className="col-multiplier">x40</div>
              </div>
              <div className="table-row rare">
                <div className="col-symbols">🔥🔥🔥🔥🔥</div>
                <div className="col-name">Огонь (5)</div>
                <div className="col-multiplier">x30</div>
              </div>
              <div className="table-row common">
                <div className="col-symbols">💰💰💰💰💰</div>
                <div className="col-name">Деньги (5)</div>
                <div className="col-multiplier">x20</div>
              </div>
              <div className="table-row common">
                <div className="col-symbols">❤️❤️❤️❤️❤️</div>
                <div className="col-name">Сердце (5)</div>
                <div className="col-multiplier">x15</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальные окна блэкджека */}
      {/* История игр блэкджека */}
      <div id="blackjack-history-modal" className="roulette-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>📊 История игр Блэкджек</h3>
            <div className="modal-header-buttons">
              <button className="clear-history-btn" title="Очистить историю" onClick={clearBlackjackHistory}>
                <i className="fas fa-trash"></i>
              </button>
              <button className="modal-close-btn" onClick={() => closeBlackjackModal('blackjack-history-modal')}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="history-stats">
              <div className="stat-item">
                <span className="stat-label">Всего игр:</span>
                <span id="blackjack-total-games" className="stat-value">
                  0
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Выигрышей:</span>
                <span id="blackjack-total-wins" className="stat-value">
                  0
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Проигрышей:</span>
                <span id="blackjack-total-losses" className="stat-value">
                  0
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Общий выигрыш:</span>
                <span id="blackjack-total-profit" className="stat-value">
                  $0
                </span>
              </div>
            </div>
            <div className="history-list-full" id="blackjack-history-list-full">
              {/* История будет заполняться динамически */}
            </div>
          </div>
        </div>
      </div>

      {/* Правила игры блэкджека */}
      <div id="blackjack-rules-modal" className="roulette-modal">
        <div className="modal-content">
          <div className="modal-header">
            <h3>📖 Правила игры Блэкджек</h3>
            <button className="modal-close-btn" onClick={() => closeBlackjackModal('blackjack-rules-modal')}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="modal-body">
            <div className="rules-content">
              <h4>🎯 Цель игры</h4>
              <p>Набрать сумму карт как можно ближе к 21, но не превысить её. Победить дилера.</p>

              <h4>🃏 Значения карт</h4>
              <ul>
                <li>
                  <strong>Туз (A):</strong> 1 или 11 (выбирается автоматически)
                </li>
                <li>
                  <strong>Король, Дама, Валет (K, Q, J):</strong> 10
                </li>
                <li>
                  <strong>Остальные карты:</strong> номинал карты (2-10)
                </li>
              </ul>

              <h4>🎮 Ход игры</h4>
              <ol>
                <li>Сделайте ставку (от $10 до $500)</li>
                <li>Нажмите "Начать игру"</li>
                <li>Нажмите "Перевернуть карты"</li>
                <li>Выберите действие: "Взять" или "Остановиться"</li>
                <li>Дилер автоматически играет по правилам</li>
              </ol>

              <h4>🏆 Результаты</h4>
              <ul>
                <li>
                  <strong>Выигрыш:</strong> Сумма карт ближе к 21, чем у дилера
                </li>
                <li>
                  <strong>Проигрыш:</strong> Сумма карт больше 21 или меньше дилера
                </li>
                <li>
                  <strong>Ничья:</strong> Одинаковая сумма карт
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
