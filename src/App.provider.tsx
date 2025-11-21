import React from 'react';
import { createContext, useState, useCallback } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from '../src/types.ts';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

const defaultValue: AppContextType = {
  moodList: [],
  handleSelectMood: () => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);

  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};
