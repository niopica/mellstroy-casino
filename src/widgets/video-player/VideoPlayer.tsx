import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.scss';

export const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    video.currentTime = newTime;
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    video.volume = percentage;
    setVolume(percentage);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullscreen) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="video-container">
      <video ref={videoRef} className="main-video-player" controls={false} preload="metadata" id="main-video-player">
        <source src="/assets/videos/stream.mp4" type="video/mp4" />
        Ваш браузер не поддерживает видео элемент.
      </video>

      <div className="video-controls">
        <div className="controls-row">
          <button className="video-control-btn" onClick={togglePlayPause}>
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>

          <div className="progress-container">
            <div className="progress-bar" onClick={handleProgressClick}>
              <div
                className="video-progress"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              ></div>
            </div>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>

          <div className="volume-container">
            <button className="video-control-btn" onClick={toggleMute}>
              <i className={`fas fa-volume-${isMuted ? 'mute' : volume < 0.5 ? 'down' : 'up'}`}></i>
            </button>
            <div className="volume-bar" onClick={handleVolumeClick}>
              <div className="video-volume-progress" style={{ width: `${isMuted ? 0 : volume * 100}%` }}></div>
            </div>
          </div>

          <button className="video-control-btn" onClick={toggleFullscreen}>
            <i className="fas fa-expand"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
