import React from 'react';
import { MusicPlayer } from '../../widgets/music-player';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <MusicPlayer />
      {children}
    </div>
  );
};
