import { useState, useEffect, useRef } from 'react';

export const useStream = () => {
  // Состояния для чата
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatInputMobile, setChatInputMobile] = useState('');

  // Состояния для донатов
  const [recentDonations, setRecentDonations] = useState<any[]>([]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const chatMessagesMobileRef = useRef<HTMLDivElement>(null);

  // Инициализация чата
  useEffect(() => {
    addWelcomeMessage();
    startChat();
    startRecentDonations();
  }, []);

  // Автоскролл чата
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
    if (chatMessagesMobileRef.current) {
      chatMessagesMobileRef.current.scrollTop = chatMessagesMobileRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Чат функции
  const addWelcomeMessage = () => {
    const welcomeMessages = [
      { username: 'Mellstroy', message: 'Добро пожаловать на стрим! 🎮', type: 'moderator' },
      { username: 'Moderator', message: 'Чат открыт! Пишите свои сообщения 💬', type: 'moderator' },
      { username: 'viewer123', message: 'Привет всем! 🎉', type: 'user' },
      { username: 'mell_fan', message: 'Лучший стример! 🔥', type: 'user' },
      { username: 'casino_lover', message: 'Когда играем? 🎰', type: 'user' },
    ];

    welcomeMessages.forEach((msg, index) => {
      setTimeout(() => {
        addChatMessage(msg.type, msg.username, msg.message, false);
      }, index * 1000);
    });
  };

  const startChat = () => {
    // Запускаем автоматические сообщения - более часто для живого чата
    setInterval(() => {
      addRandomChatMessage();
    }, 800 + Math.random() * 1200); // Быстрее появление сообщений

    // Добавляем разные типы сообщений
    setInterval(() => {
      addModeratorMessage();
    }, 15000 + Math.random() * 10000);

    setInterval(() => {
      addSubscriberMessage();
    }, 20000 + Math.random() * 15000);

    setInterval(() => {
      addBotMessage();
    }, 25000 + Math.random() * 20000);

    // Случайные всплески активности
    setInterval(() => {
      createChatSpam();
    }, 60000 + Math.random() * 120000);

    // Специальные события
    setInterval(() => {
      addSpecialEvent();
    }, 120000 + Math.random() * 180000);
  };

  const addRandomChatMessage = () => {
    const usernames = [
      'burmalda228',
      'sup4ik',
      'batyaLIVE',
      'mellfan2000',
      'chechevicaTOP',
      'realFlexer',
      'melcontent',
      'prostoVasya',
      'ded_memories',
      'casino_guru',
      'bormotun',
      'FlexBoy',
      'krutoy_donater',
      'OldMelViewer',
      'd0nat_men',
      'f1xstream',
      'batyazin',
      'chelik_iz_chata',
      'stream_pahan',
      'ZalupnyVibe',
      'kasinochik',
      'flexy_mode',
      'burmaldovich',
      'chat_molodoy',
      'realKorish',
      'batyaTop1',
      'xX_Mel_Xx',
      'melarmy2024',
      'contentMaker',
      'dedpoolForever',
      'kto_zdes_s_2020',
      'vse_po_klassike',
      'melcasinoVIP',
      'donat_za_mel',
      'chelik228',
      'flex_dvizh',
      'batin_kotelok',
      'mel_streamer',
      'burmaldafan',
      '4echevichnyy',
      'chatvpotoke',
      'melchik',
      'kasino_master',
      'ded_smotrit',
      'livecontenter',
      'paцan_s_dviza',
      'megaFlexer',
      'burmaldachampion',
      'batya_v_efire',
      'donatNaMela',
      'ProFlexer',
      'MelFanForever',
      'burmaldagod',
      'chechevichka',
      'batin_dvizh',
      'KORISH228',
      'melstroymode',
      'stream_hard',
      'vot_eto_flex',
      'chelik_s_donatom',
      'burmalda_kazino',
      'oldviewr',
      'flexxmen',
      'melllegend',
      'random_chatman',
      'batya_ne_spit',
      'mel_ded_team',
      'burmaldalive',
      'f1nalboss',
      'kasino_zdes',
      'donat_letit',
      'chatovik',
      'prostoFlex',
      'Mel_Online',
      'chechik',
      'kasino777',
      'batya_flexit',
      'MelFanReal',
      'burmaldavibes',
      'legend_chat',
      'streamy_bro',
      'dedpool_mem',
      'donatik_na_udel',
      'Melchik_live',
      'paцan_na_minimalkah',
      'top_flexer',
      'burmalda_xxx',
      'batya_na_podryve',
      'stream_raznos',
      'melbrother',
      'chelik_po_dvizhu',
      'kasino_ded',
      'donatka_letit',
      'veter_burmaldy',
      'Melman',
      'ProContenter',
      'chatnostalgia',
      'burmaldist',
      'melstream_vibes',
    ];

    const messages = [
      'че за движ начинается 😂',
      'батя вернулся в эфир 💪',
      'опять бурмалда пошла 😭',
      'ну всё, пошёл контент 💥',
      'залупный вайб пошёл 🔥',
      'кто с 2020 тут? 🙋‍♂️',
      'звук норм? 🎧',
      'а где батя?',
      'дед бы гордился 🙏',
      'когда казино откроют?',
      'всё, пошёл донат 💸',
      'опять этот трек 😭',
      'чечевица подъехала 🍲',
      'вот это энергия!',
      'тут чисто флекс идёт 🕺',
      'камон мел, шо творишь 😂',
      'чат живой, я вижу 🔥',
      'бахни музыку погромче 🔊',
      'а где бурмалда?',
      'батя сейчас бы оценил 👴',
      'реально легенда в деле',
      'минус колонки 💀',
      'неужели опять донат батя?',
      'играем по крупному 🎰',
      'чел реально живёт контентом 😂',
      'стрим пошёл по плану 📡',
      'опять пошли донаты 💵',
      'вижу старую гвардию 💪',
      'у кого лаги?',
      'какой трек играет?',
      'батя на кухне, но одобряет 😎',
      'чисто энергия как в старые времена ⚡',
      'кореш навсегда с нами ❤️',
      'а будет челлендж?',
      'чат, плюс кто тут с начала 💬',
      'опять пошёл флекс 🤣',
      'мелстрой в ударе!',
      'это уже не стрим, это концерт 🎤',
      'он опять пошёл ва-банк 😳',
      'бро, не проиграй всё 😂',
      'душевно пошло ❤️',
      'реально без сценария 💥',
      'минус голос завтра 😭',
      'чат, что происходит вообще?',
      'опять он донатит сам себе? 💀',
      'а батя знает? 😂',
      'старый вайб, кайф!',
      'чечевица рулит 🍲',
      'контент мощный, базар ноль 💯',
      'эх, был бы дед, оценил бы 🕊️',
      'реально движ пошёл 🚀',
      'всё по классике 💪',
      'закинули донат, поехали 🔥',
      'ну всё, пошёл танец 😂',
      'кто помнит челленджи?',
      'легендарно, как всегда 👑',
      'чат, не спим!',
      'снова пошёл флекс от души 💃',
      'вот за это я люблю стрим 💥',
      'батя одобряет контент ✅',
      'чисто пацанский движ 🤝',
      'реально атмосфера 🔥',
    ];

    const username = usernames[Math.floor(Math.random() * usernames.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    addChatMessage('user', username, message, false);
  };

  const addModeratorMessage = () => {
    const moderators = ['Moderator_Pro', 'Chat_Guard', 'Stream_Mod', 'Casino_Mod', 'Mell_Mod'];
    const messages = [
      'Соблюдайте правила чата! 📋',
      'Не спамьте! 🚫',
      'Уважайте друг друга! 🤝',
      'Донаты приветствуются! 💰',
      'Казино открыто для всех! 🎰',
      'Стрим идёт отлично! 🔥',
      'Продолжайте в том же духе! 🚀',
      'Мелстрой легенда! 👑',
      'Чат активен! 💬',
      'Спасибо за активность! 🙏',
    ];

    const username = moderators[Math.floor(Math.random() * moderators.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    addChatMessage('moderator', username, message, false);
  };

  const addSubscriberMessage = () => {
    const subscribers = ['VIP_Subscriber', 'Gold_Member', 'Platinum_Sub', 'Diamond_Sub', 'Legend_Sub'];
    const messages = [
      'Спасибо за подписку! 💎',
      'VIP статус активирован! 👑',
      'Эксклюзивный контент! ⭐',
      'Подписка топ! 🔥',
      'VIP привилегии! 💎',
      'Золотой статус! 🥇',
      'Платиновый уровень! 🥈',
      'Алмазный подписчик! 💠',
      'Легендарная подписка! 🌟',
      'Премиум контент! ✨',
    ];

    const username = subscribers[Math.floor(Math.random() * subscribers.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    addChatMessage('subscriber', username, message, false);
  };

  const addBotMessage = () => {
    const bots = ['Casino_Bot', 'Stream_Bot', 'Donation_Bot', 'Game_Bot', 'Chat_Bot'];
    const messages = [
      'Добро пожаловать в казино! 🎰',
      'Игры ждут вас! 🎮',
      'Донаты принимаются! 💰',
      'Стрим активен! 📺',
      'Казино открыто 24/7! 🌙',
      'Играйте ответственно! ⚖️',
      'Удачи в играх! 🍀',
      'Выигрывайте больше! 🏆',
      'Казино рулит! 🎲',
      'Игры ждут! 🎯',
    ];

    const username = bots[Math.floor(Math.random() * bots.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];

    addChatMessage('bot', username, message, false);
  };

  const createChatSpam = () => {
    const spamMessages = [
      'POGGERS! 🤯',
      'LUL 😂',
      'KEKW 😆',
      'OMEGALUL 🤣',
      '5Head 🧠',
      'EZ Clap 👏',
      'POG 😮',
      'MONKAS 😰',
      'Pepega 🤪',
      'FeelsGoodMan 😊',
      'Kappa 😏',
      '4Head 🤔',
      'DansGame 😤',
      'BibleThump 😢',
      'EleGiggle 😄',
      '🔥🔥🔥',
      '💯💯💯',
      '🚀🚀🚀',
      '⭐⭐⭐',
      '👑👑👑',
    ];

    const spamUsers = ['SpamBot', 'ChatSpammer', 'PogChamp', 'LULUser', 'KappaFan'];

    const spamCount = 5 + Math.floor(Math.random() * 6);
    for (let i = 0; i < spamCount; i++) {
      setTimeout(() => {
        const username = spamUsers[Math.floor(Math.random() * spamUsers.length)];
        const message = spamMessages[Math.floor(Math.random() * spamMessages.length)];
        addChatMessage('user', username, message, false);
      }, i * 200);
    }
  };

  const addSpecialEvent = () => {
    const events = [
      {
        type: 'moderator',
        username: 'System_Alert',
        message: '🎉 СПЕЦИАЛЬНОЕ СОБЫТИЕ! Двойные донаты в течение 5 минут! 💰💰',
      },
      {
        type: 'subscriber',
        username: 'VIP_Announcement',
        message: '👑 VIP подписчики получают эксклюзивный доступ к играм! 🎰',
      },
      { type: 'bot', username: 'Casino_System', message: '🎲 ДЖЕКПОТ! Кто-то выиграл 1,000,000₽ в рулетке! 🏆' },
      { type: 'moderator', username: 'Stream_Alert', message: '📺 Мелстрой объявляет новый челлендж! Кто готов? 🚀' },
      {
        type: 'subscriber',
        username: 'Donation_Bot',
        message: '💰 Рекордный донат! 50,000₽ от анонимного зрителя! 💎',
      },
    ];

    const event = events[Math.floor(Math.random() * events.length)];
    addChatMessage(event.type, event.username, event.message, false);

    setTimeout(() => {
      addChatMessage('user', 'Excited_Viewer', 'WOW! 🤯', false);
    }, 1000);

    setTimeout(() => {
      addChatMessage('user', 'Lucky_Player', 'INSANE! 🔥', false);
    }, 2000);
  };

  const addChatMessage = (type: string, username: string, text: string, isUser: boolean = false) => {
    const timestamp = new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const message = {
      id: Date.now() + Math.random(),
      type,
      username,
      text,
      timestamp,
      isUser,
      highlight: type === 'moderator' || type === 'subscriber',
    };

    setChatMessages((prev) => {
      const newMessages = [...prev, message];
      // Ограничиваем количество сообщений
      return newMessages.length > 150 ? newMessages.slice(-150) : newMessages;
    });
  };

  const sendChatMessage = (chatType: 'desktop' | 'mobile' = 'desktop') => {
    const message = chatType === 'desktop' ? chatInput : chatInputMobile;
    if (!message.trim()) return;

    addChatMessage('user', 'Вы', message, true);

    if (chatType === 'desktop') {
      setChatInput('');
    } else {
      setChatInputMobile('');
    }

    // Генерируем ответ
    setTimeout(() => {
      generateBotResponse(message);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage: string) => {
    const responses = getBotResponses(userMessage);
    const response = responses[Math.floor(Math.random() * responses.length)];
    addChatMessage('bot', 'Mellstroy', response, false);
  };

  const getBotResponses = (userMessage: string) => {
    const message = userMessage.toLowerCase();

    if (message.includes('донат') || message.includes('деньги')) {
      return ['Донать, бро!', 'Где мои 500₽?', 'Донаты летят!', 'Поддержи меня!'];
    }

    if (message.includes('игра') || message.includes('казино')) {
      return ['Рулетка ждёт тебя!', 'Казино открылось!', 'Играем в игры!', 'Казино ждёт!'];
    }

    if (message.includes('помощь') || message.includes('люди')) {
      return ['Помогаем людям!', 'Ты вдохновляешь!', 'Спасибо за контент!', 'Продолжай!'];
    }

    if (message.includes('стрим') || message.includes('эфир')) {
      return ['Стрим рулит!', 'Контент пошёл!', 'Эфир идёт!', 'Стрим легенда!'];
    }

    if (message.includes('мелстрой') || message.includes('мел')) {
      return ['Мелстрой легенда!', 'Ты лучший!', 'Легенда!', 'Ты вдохновляешь!'];
    }

    return [
      'Ты кто такой?',
      'Слабак!',
      'Бери масштаб — не тормози!',
      'Победа!',
      'Легенда!',
      'Ты вдохновляешь!',
      'Продолжай!',
      'Спасибо за контент!',
      'Ты лучший!',
      'Казино ждёт!',
    ];
  };

  // Донаты функции
  const startRecentDonations = () => {
    setInterval(() => {
      addRecentDonation();
    }, 5000 + Math.random() * 10000);
  };

  const addRecentDonation = () => {
    const amounts = [500, 1000, 2000, 5000, 10000];
    const currencies = ['₽', '$', '€'];
    const icons = ['💵', '💰', '💎', '💶', '🪙'];
    const messages = ['Мел, выпей за нас!', 'Бери Rolls!', 'Помоги людям!', 'Ты лучший!', 'Казино рулит!'];
    const usernames = ['user123', 'mell_fan', 'casino_lover', 'stream_viewer', 'donator_pro'];

    const amount = amounts[Math.floor(Math.random() * amounts.length)];
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const icon = icons[Math.floor(Math.random() * icons.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    const username = usernames[Math.floor(Math.random() * usernames.length)];

    const donation = {
      id: Date.now() + Math.random(),
      amount,
      currency,
      icon,
      message,
      username,
      timestamp: new Date(),
    };

    setRecentDonations((prev) => {
      const newDonations = [donation, ...prev];
      return newDonations.length > 10 ? newDonations.slice(0, 10) : newDonations;
    });
  };

  return {
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
  };
};
