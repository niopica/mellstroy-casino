// Константы для приложения Mellstroy Casino

export const APP_CONFIG = {
  name: 'Mellstroy Casino',
  version: '1.0.0',
  description: 'Официальный сайт казино Мелстроя с играми, стримами и благотворительностью',
  author: 'Mellstroy',
} as const;

export const ROUTES = {
  HOME: '/',
  STREAM: '/stream',
  GAMES: '/games',
  CHALLENGES: '/challenges',
  HELP: '/help',
  ABOUT: '/about',
} as const;

export const NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: 'Главная',
    path: ROUTES.HOME,
    icon: '🏠',
  },
  {
    id: 'stream',
    label: 'Стрим',
    path: ROUTES.STREAM,
    icon: '🎥',
  },
  {
    id: 'challenges',
    label: 'Челенджи',
    path: ROUTES.CHALLENGES,
    icon: '🎯',
  },
  {
    id: 'help',
    label: 'Помощь людям',
    path: ROUTES.HELP,
    icon: '💎',
  },
  {
    id: 'about',
    label: 'О Мелстрое',
    path: ROUTES.ABOUT,
    icon: '🧠',
  },
  {
    id: 'games',
    label: 'Игры',
    path: ROUTES.GAMES,
    icon: '🎮',
  },
] as const;

export const MUSIC_PLAYLIST = [
  {
    id: 'track1',
    title: 'Mellstroy Theme',
    artist: 'Mellstroy',
    src: '/assets/tracks/track1.mp3',
    cover: '/assets/main-meme.png',
  },
  {
    id: 'track2',
    title: 'Casino Nights',
    artist: 'Mellstroy',
    src: '/assets/tracks/track2.mp3',
    cover: '/assets/main-meme.png',
  },
  {
    id: 'track3',
    title: 'Victory Dance',
    artist: 'Mellstroy',
    src: '/assets/tracks/track3.mp3',
    cover: '/assets/main-meme.png',
  },
  {
    id: 'track4',
    title: 'Help People',
    artist: 'Mellstroy',
    src: '/assets/tracks/track4.mp3',
    cover: '/assets/main-meme.png',
  },
  {
    id: 'track5',
    title: 'Stream Vibes',
    artist: 'Mellstroy',
    src: '/assets/tracks/track5.mp3',
    cover: '/assets/main-meme.png',
  },
] as const;

export const GAMES = [
  {
    id: 'roulette',
    name: 'Рулетка',
    description: 'Однорукий бандит с фруктами',
    icon: '🎰',
    isAvailable: true,
    multiplier: 100,
    difficulty: 'easy' as const,
  },
  {
    id: 'blackjack',
    name: 'Блэкджек',
    description: 'Карточная игра против дилера',
    icon: '♠️',
    isAvailable: true,
    multiplier: 2,
    difficulty: 'medium' as const,
  },
  {
    id: 'rolls-royce',
    name: 'Похищение Rolls Royce',
    description: 'Убеги от охранников',
    icon: '🚗',
    isAvailable: false,
    multiplier: 50,
    difficulty: 'hard' as const,
  },
  {
    id: 'mizulina',
    name: 'Побег от Мизулиной',
    description: 'Как Dino в Chrome',
    icon: '🏃‍♂️',
    isAvailable: false,
    multiplier: 25,
    difficulty: 'medium' as const,
  },
  {
    id: 'hide-seek',
    name: 'Прятки с военкоматом',
    description: 'Найди Мелстроя',
    icon: '🎯',
    isAvailable: true,
    multiplier: 75,
    difficulty: 'easy' as const,
  },
  {
    id: 'dice',
    name: 'Кости',
    description: 'Бросай кубики и выигрывай',
    icon: '🎲',
    isAvailable: true,
    multiplier: 10,
    difficulty: 'easy' as const,
  },
  {
    id: 'millionaire',
    name: 'Кто хочет стать миллионером',
    description: 'Mellstroy Edition',
    icon: '🧠',
    isAvailable: false,
    multiplier: 100,
    difficulty: 'hard' as const,
  },
] as const;

export const STREAMS = [
  {
    id: 'stream1',
    title: 'Mellstroy Live',
    thumbnail: '/assets/streams/stream1.jpg',
    viewers: 1234567,
    isOnline: true,
    url: 'https://www.youtube.com/watch?v=3PwZK_zkrPQ',
  },
  {
    id: 'stream2',
    title: 'Казино Ночь',
    thumbnail: '/assets/streams/stream2.jpg',
    viewers: 856432,
    isOnline: false,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'stream3',
    title: 'Помощь Людям',
    thumbnail: '/assets/streams/stream3.jpg',
    viewers: 654321,
    isOnline: false,
    url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  },
] as const;

export const CHALLENGES = {
  active: [
    {
      id: 'football-greeting',
      title: 'Привет от футболистов',
      description: 'Записать видеопривет стримеру от имени Месси, Роналду, Мбаппе или Холанда',
      reward: '30 млн ₽',
      icon: '⚽',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    },
    {
      id: 'champions-league',
      title: 'Пробежка на поле ЛЧ',
      description: 'Выйти на поле во время финала Лиги чемпионов с логотипом "MELLSTROY"',
      reward: '30 млн ₽',
      icon: '🏟️',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'mrbeast-greeting',
      title: 'Привет от MrBeast',
      description: 'Сделать так, чтобы MrBeast передал привет в ролике',
      reward: '37,5 млн ₽',
      icon: '🎬',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    },
    {
      id: 'everest-photo',
      title: 'Фото на Эвересте',
      description: 'Достичь вершины Эвереста и сфотографировать себя с ником стримера',
      reward: '45 млн ₽',
      icon: '🏔️',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    },
    {
      id: 'celebrity-subscription',
      title: 'Подписка от знаменитостей',
      description: 'IShowSpeed, KSI, Хаби Лейм или Логан Пол подписывается на аккаунт Мелстроя',
      reward: '30 млн ₽',
      icon: '⭐',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'mrbeast-instagram',
      title: 'Подписка MrBeast в Instagram',
      description: 'Добиться, чтобы MrBeast подписался на Мелстроя в Instagram',
      reward: '150 млн ₽',
      icon: '📸',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    },
    {
      id: 'president-greeting',
      title: 'Привет от президента',
      description: 'Записать видео, где президент какой-либо страны передаёт привет стримеру',
      reward: '2 млн $',
      icon: '🏛️',
      status: 'active' as const,
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    },
  ],
  completed: [
    {
      id: 'mbappe-greeting',
      title: 'Привет от Мбаппе',
      description: 'Мбаппе передал привет Мелстрою - это широко освещалось в СМИ',
      reward: '30 млн ₽',
      icon: '⚽',
      status: 'completed' as const,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'champions-league-completed',
      title: 'Пробежка на поле ЛЧ',
      description: 'Болельщики выбежали на поле под это задание',
      reward: '30 млн ₽',
      icon: '🏟️',
      status: 'completed' as const,
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    },
    {
      id: 'lithuania-president',
      title: 'Привет от президента Литвы',
      description: 'Школьник из Литвы записал видео с президентом, но Мелстрой не выплатил всю сумму',
      reward: 'Частично выплачено',
      icon: '🏛️',
      status: 'completed' as const,
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    },
  ],
} as const;

export const DONATION_AMOUNTS = [500, 1000, 5000] as const;

export const HELP_STATS = {
  totalHelp: 15000000,
  peopleHelped: 247,
  medicalOperations: 89,
  housingIssues: 34,
} as const;

export const KEYBOARD_SHORTCUTS = {
  MUSIC_TOGGLE: 'KeyM',
  DONATION_TEST: 'KeyD',
  EVENT_TEST: 'KeyE',
  GAMES_PAGE: 'KeyG',
  STREAM_PAGE: 'KeyS',
} as const;

export const STORAGE_KEYS = {
  MUSIC_PLAYER_STATE: 'music_player_state',
  MUSIC_PLAYER_VISITED: 'music_player_visited',
  USER_PREFERENCES: 'user_preferences',
} as const;
