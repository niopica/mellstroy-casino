import React from 'react';
import { useApp } from '../../app/providers/AppProvider';
import './MusicPlayer.scss';

export const MusicPlayer: React.FC = () => {
  const { musicPlayer } = useApp();
  const {
    isPlaying,
    currentTrack,
    volume,
    currentTime,
    duration,
    isMuted,
    play,
    pause,
    next,
    previous,
    setVolume,
    seekTo,
    toggleMute,
  } = musicPlayer;

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * duration;

      console.log('Progress click:', {
        clickX,
        rectWidth: rect.width,
        percentage: percentage * 100,
        newTime,
        duration,
      });

      seekTo(newTime);
    }
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(percentage);
  };

  if (!currentTrack) return null;

  // Отладочная информация
  console.log('MusicPlayer state:', {
    currentTime,
    duration,
    isPlaying,
    progressPercentage: duration ? (currentTime / duration) * 100 : 0,
    formattedCurrentTime: formatTime(currentTime),
    formattedDuration: formatTime(duration),
  });

  return (
    <div className="music-player" id="music-player">
      <div className="player-content">
        <div className="track-info">
          <img src={currentTrack.cover} alt="Track Cover" className="track-cover" id="track-cover" />
          <div className="track-details">
            <div className="track-name" id="track-name">
              {currentTrack.title}
            </div>
            <div className="track-artist" id="track-artist">
              {currentTrack.artist}
            </div>
          </div>
        </div>

        <div className="player-controls">
          <button className="control-btn" id="prev-btn" onClick={previous}>
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="control-btn play-btn" id="play-pause-btn" onClick={isPlaying ? pause : play}>
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>
          <button className="control-btn" id="next-btn" onClick={next}>
            <i className="fas fa-step-forward"></i>
          </button>
        </div>

        <div className="progress-section">
          <span className="time" id="current-time">
            {formatTime(currentTime)}
          </span>
          <div className="progress-bar" onClick={handleProgressClick}>
            <div
              className="music-progress"
              id="progress"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <span className="time" id="total-time">
            {formatTime(duration)}
          </span>
        </div>

        <div className="volume-section">
          <button className="control-btn" id="volume-btn" onClick={toggleMute}>
            <i className={`fas fa-volume-${isMuted ? 'mute' : volume < 0.5 ? 'down' : 'up'}`}></i>
          </button>
          <div className="volume-bar" onClick={handleVolumeClick}>
            <div className="music-volume-progress" id="volume-progress" style={{ width: `${volume * 100}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
