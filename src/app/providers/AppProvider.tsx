import React, { createContext, useContext, type ReactNode } from 'react';
import { useMusicPlayer } from '../../shared/lib/hooks/useMusicPlayer';
import { useDonations } from '../../shared/lib/hooks';
interface AppContextType {
  musicPlayer: ReturnType<typeof useMusicPlayer>;
  donations: ReturnType<typeof useDonations>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const musicPlayer = useMusicPlayer();
  const donations = useDonations();

  const value: AppContextType = {
    musicPlayer,
    donations,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
