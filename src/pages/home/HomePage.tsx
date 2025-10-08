import React from 'react';
import { MusicPlayer } from '../../widgets/music-player/MusicPlayer';
import { Header } from '../../widgets/header/Header';
import { CasinoBanner } from '../../widgets/casino-banner/CasinoBanner';
import { GamesGrid } from '../../widgets/games-grid/GamesGrid';
import { StreamSection } from '../../widgets/stream-section/StreamSection';
import { DonationSection } from '../../features/donation-system/DonationSection';
import { AboutTeaser } from '../../features/about/AboutTeaser';
import { EventCounters } from '../../widgets/event-counters/EventCounters';
import './HomePage.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <MusicPlayer />
      <EventCounters />
      <Header />
      <CasinoBanner />
      <main className="main-content">
        <DonationSection />
        <GamesGrid />
        <StreamSection />
        <AboutTeaser />
      </main>
      <div className="donation-container" id="donation-container"></div>
      <div className="event-notifications" id="event-notifications"></div>
    </div>
  );
};
