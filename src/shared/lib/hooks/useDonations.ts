import { useState, useCallback } from 'react';
import type { Donation, UseDonationsReturn } from '../../types';

export const useDonations = (): UseDonationsReturn => {
  const [donations, setDonations] = useState<Donation[]>([]);

  const addDonation = useCallback((donation: Omit<Donation, 'id' | 'timestamp'>) => {
    const newDonation: Donation = {
      ...donation,
      id: `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    setDonations((prev) => [newDonation, ...prev]);

    // Автоматически удаляем донат через 5 секунд
    setTimeout(() => {
      setDonations((prev) => prev.filter((d) => d.id !== newDonation.id));
    }, 5000);
  }, []);

  const clearDonations = useCallback(() => {
    setDonations([]);
  }, []);

  return {
    donations,
    addDonation,
    clearDonations,
  };
};
