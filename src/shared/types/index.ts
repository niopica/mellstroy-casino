// Базовые типы для приложения Mellstroy Casino

export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover: string;
  duration?: number;
}

export interface Playlist {
  tracks: Track[];
  currentIndex: number;
}

export interface MusicPlayerState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  currentTrack: Track | null;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  message: string;
  username: string;
  timestamp: Date;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  multiplier: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Stream {
  id: string;
  title: string;
  thumbnail: string;
  viewers: number;
  isOnline: boolean;
  url?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  icon: string;
  status: 'active' | 'completed';
  videoUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
}

export interface User {
  id: string;
  username: string;
  balance: number;
  avatar?: string;
}

export interface GameResult {
  gameId: string;
  bet: number;
  win: number;
  isWin: boolean;
  timestamp: Date;
}

export interface HelpRequest {
  id: string;
  name: string;
  type: 'medical' | 'housing' | 'education' | 'other';
  amount: number;
  description: string;
  contact: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp: Date;
}

// Типы для компонентов UI
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

// Типы для хуков
export interface UseMusicPlayerReturn {
  isPlaying: boolean;
  currentTrack: Track | null;
  volume: number;
  currentTime: number;
  duration: number;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  toggleMute: () => void;
}

export interface UseDonationsReturn {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
  clearDonations: () => void;
}

// Типы для API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  code: number;
  details?: any;
}
