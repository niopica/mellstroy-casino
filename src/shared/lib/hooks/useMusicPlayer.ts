import { useState, useEffect, useRef, useCallback } from 'react';
import type { MusicPlayerState, UseMusicPlayerReturn } from '../../types';
import { MUSIC_PLAYLIST, STORAGE_KEYS } from '../../constants';

export const useMusicPlayer = (): UseMusicPlayerReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicPlayerState>({
    isPlaying: false,
    isMuted: false,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
    currentTrack: MUSIC_PLAYLIST[0] || null,
  });

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Загрузка состояния из localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEYS.MUSIC_PLAYER_STATE);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      setCurrentTrackIndex(parsedState.currentTrackIndex || 0);
      setState((prev) => ({
        ...prev,
        volume: parsedState.volume || 0.7,
        currentTrack: MUSIC_PLAYLIST[parsedState.currentTrackIndex || 0] || MUSIC_PLAYLIST[0],
      }));
    }
  }, []);

  // Сохранение состояния в localStorage
  const saveState = useCallback(() => {
    const stateToSave = {
      currentTrackIndex,
      volume: state.volume,
    };
    localStorage.setItem(STORAGE_KEYS.MUSIC_PLAYER_STATE, JSON.stringify(stateToSave));
  }, [currentTrackIndex, state.volume]);

  // Инициализация аудио
  useEffect(() => {
    if (!audioRef.current && MUSIC_PLAYLIST.length > 0) {
      audioRef.current = new Audio(MUSIC_PLAYLIST[currentTrackIndex].src);
      audioRef.current.volume = state.volume;
      audioRef.current.preload = 'metadata';
    }
  }, []);

  // Обработчики событий аудио
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;

      const handleLoadedMetadata = () => {
        console.log('Metadata loaded, duration:', audio.duration);
        setState((prev) => ({ ...prev, duration: audio.duration || 0 }));
      };

      const handleTimeUpdate = () => {
        const currentTime = audio.currentTime || 0;
        console.log('Time update:', currentTime, 'seconds');
        setState((prev) => ({ ...prev, currentTime }));
      };

      const handleEnded = () => {
        next();
      };

      const handleError = () => {
        console.error('Ошибка загрузки трека:', MUSIC_PLAYLIST[currentTrackIndex].title);
        next();
      };

      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('error', handleError);

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      };
    }
  }, [currentTrackIndex]);

  // Принудительное обновление времени для отладки
  useEffect(() => {
    if (state.isPlaying && audioRef.current) {
      const interval = setInterval(() => {
        if (audioRef.current) {
          const currentTime = audioRef.current.currentTime || 0;
          setState((prev) => ({ ...prev, currentTime }));
        }
      }, 100); // Обновляем каждые 100мс

      return () => clearInterval(interval);
    }
  }, [state.isPlaying]);

  // Обновление текущего трека
  useEffect(() => {
    if (audioRef.current && MUSIC_PLAYLIST[currentTrackIndex]) {
      setState((prev) => ({
        ...prev,
        currentTrack: MUSIC_PLAYLIST[currentTrackIndex],
        currentTime: 0, // Сбрасываем только при смене трека
        duration: 0, // Сбрасываем duration при смене трека
      }));

      audioRef.current.src = MUSIC_PLAYLIST[currentTrackIndex].src;
      audioRef.current.currentTime = 0;

      // Принудительно загружаем метаданные
      audioRef.current.load();

      if (state.isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrackIndex]); // Убираем state.isPlaying из зависимостей

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setState((prev) => ({ ...prev, isPlaying: true }));
        })
        .catch(console.error);
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, []);

  const next = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % MUSIC_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    saveState();
  }, [currentTrackIndex, saveState]);

  const previous = useCallback(() => {
    const prevIndex = currentTrackIndex === 0 ? MUSIC_PLAYLIST.length - 1 : currentTrackIndex - 1;
    setCurrentTrackIndex(prevIndex);
    saveState();
  }, [currentTrackIndex, saveState]);

  const setVolume = useCallback(
    (volume: number) => {
      const clampedVolume = Math.max(0, Math.min(1, volume));
      setState((prev) => ({ ...prev, volume: clampedVolume }));

      if (audioRef.current) {
        audioRef.current.volume = clampedVolume;
      }

      saveState();
    },
    [saveState]
  );

  const seekTo = useCallback(
    (time: number) => {
      if (audioRef.current && state.duration > 0) {
        const clampedTime = Math.max(0, Math.min(state.duration, time));
        console.log('Seeking to:', clampedTime, 'seconds');

        audioRef.current.currentTime = clampedTime;
        setState((prev) => ({ ...prev, currentTime: clampedTime }));
      }
    },
    [state.duration]
  );

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !state.isMuted;
      audioRef.current.muted = newMutedState;
      setState((prev) => ({ ...prev, isMuted: newMutedState }));
    }
  }, [state.isMuted]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    isPlaying: state.isPlaying,
    currentTrack: state.currentTrack,
    volume: state.volume,
    currentTime: state.currentTime,
    duration: state.duration,
    isMuted: state.isMuted,
    play,
    pause,
    next,
    previous,
    setVolume,
    seekTo,
    toggleMute,
  };
};
