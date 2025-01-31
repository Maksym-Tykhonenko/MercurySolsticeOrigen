import {useState, useContext, useEffect, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext({
  timerHistory: {},
  diaryEntries: [],
  saveTimer: async (title, duration) => {},
  saveDiaryEntry: async (mood, text) => {},
  getDiaryEntries: () => [],
  clearDiaryEntries: async () => {},
  getTimerHistory: async title => [],
  getAllTimers: async () => {},
  clearTimerHistory: async () => {},
  totalScore: 0,
  highestLevel: 1,
  gamesPlayed: 0,
  saveGameProgress: async (score, level) => {},
  deductScore: async amount => {},
  resetGameProgress: async () => {},
  isMusicEnable: () => {},
  setIsMusicEnable: () => {},
});

export const AppProvider = ({children}) => {
  const [timerHistory, setTimerHistory] = useState({});
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [highestLevel, setHighestLevel] = useState(1);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [isMusicEnable, setIsMusicEnable] = useState(true);
  console.log(totalScore, highestLevel, gamesPlayed);

  // Load all data when app starts
  useEffect(() => {
    loadAllTimers();
    loadDiaryEntries();
    loadSavedData();
  }, []);

  // Load diary entries from storage
  const loadDiaryEntries = async () => {
    try {
      const entries = await AsyncStorage.getItem('diary_entries');
      if (entries) {
        setDiaryEntries(JSON.parse(entries));
      }
    } catch (error) {
      console.error('Error loading diary entries:', error);
    }
  };

  // Save new diary entry
  const saveDiaryEntry = async (mood, text) => {
    try {
      const newEntry = {
        id: Date.now(),
        mood,
        text,
        date: new Date().toISOString(),
      };

      const updatedEntries = [...diaryEntries, newEntry];

      // Save to AsyncStorage
      await AsyncStorage.setItem(
        'diary_entries',
        JSON.stringify(updatedEntries),
      );

      // Update state
      setDiaryEntries(updatedEntries);

      return true;
    } catch (error) {
      console.error('Error saving diary entry:', error);
      return false;
    }
  };

  // Get all diary entries
  const getDiaryEntries = () => {
    return diaryEntries;
  };

  // Clear all diary entries
  const clearDiaryEntries = async () => {
    try {
      await AsyncStorage.removeItem('diary_entries');
      setDiaryEntries([]);
      return true;
    } catch (error) {
      console.error('Error clearing diary entries:', error);
      return false;
    }
  };

  // Load all timer data when the app starts
  useEffect(() => {
    loadAllTimers();
  }, []);

  // Load all timers from AsyncStorage
  const loadAllTimers = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const timerKeys = keys.filter(key => key.startsWith('timer_'));
      const result = {};

      for (const key of timerKeys) {
        const data = await AsyncStorage.getItem(key);
        const activity = key.replace('timer_', '');
        result[activity] = JSON.parse(data);
      }

      setTimerHistory(result);
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  // Save a new timer entry
  const saveTimer = async (title, duration) => {
    try {
      const currentTimers = timerHistory[title] || [];

      const newTimer = {
        duration,
        date: new Date().toISOString(),
      };

      const updatedTimers = [...currentTimers, newTimer];

      // Update AsyncStorage
      await AsyncStorage.setItem(
        `timer_${title}`,
        JSON.stringify(updatedTimers),
      );

      // Update state
      setTimerHistory(prev => ({
        ...prev,
        [title]: updatedTimers,
      }));

      return true;
    } catch (error) {
      console.error('Error saving timer:', error);
      return false;
    }
  };

  // Get timer history for specific activity
  const getTimerHistory = title => {
    return timerHistory[title] || [];
  };

  // Get all timer data
  const getAllTimers = () => {
    return timerHistory;
  };

  // Clear timer history for specific activity or all
  const clearTimerHistory = async title => {
    try {
      if (title) {
        await AsyncStorage.removeItem(`timer_${title}`);
        setTimerHistory(prev => {
          const newHistory = {...prev};
          delete newHistory[title];
          return newHistory;
        });
      } else {
        const keys = await AsyncStorage.getAllKeys();
        const timerKeys = keys.filter(key => key.startsWith('timer_'));
        await AsyncStorage.multiRemove(timerKeys);
        setTimerHistory({});
      }
      return true;
    } catch (error) {
      console.error('Error clearing timer history:', error);
      return false;
    }
  };

  const loadSavedData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('gameProgress');
      if (savedData) {
        const {totalScore, highestLevel, gamesPlayed} = JSON.parse(savedData);
        setTotalScore(totalScore || 0);
        setHighestLevel(highestLevel || 1);
        setGamesPlayed(gamesPlayed || 0);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const saveGameProgress = async (score, level) => {
    try {
      const newTotalScore = totalScore + score;
      const newHighestLevel = Math.max(highestLevel, level);
      const newGamesPlayed = gamesPlayed + 1;

      setTotalScore(newTotalScore);
      setHighestLevel(newHighestLevel);
      setGamesPlayed(newGamesPlayed);

      await AsyncStorage.setItem(
        'gameProgress',
        JSON.stringify({
          totalScore: newTotalScore,
          highestLevel: newHighestLevel,
          gamesPlayed: newGamesPlayed,
        }),
      );

      return newTotalScore;
    } catch (error) {
      console.error('Error saving game progress:', error);
      return totalScore;
    }
  };

  // Add new function to handle score deduction
  const deductScore = async amount => {
    try {
      const newTotalScore = Math.max(0, totalScore - amount); // Prevent negative score
      setTotalScore(newTotalScore);

      await AsyncStorage.setItem(
        'gameProgress',
        JSON.stringify({
          totalScore: newTotalScore,
          highestLevel,
          gamesPlayed,
        }),
      );

      return newTotalScore;
    } catch (error) {
      console.error('Error deducting score:', error);
      return totalScore;
    }
  };

  const resetGameProgress = async () => {
    try {
      // Reset all state values
      setTotalScore(0);
      setHighestLevel(1);
      setGamesPlayed(0);

      // Clear storage
      await AsyncStorage.multiRemove(['gameProgress', 'unlockedArticles']);

      console.log('Game progress reset successfully');
    } catch (error) {
      console.error('Error resetting game progress:', error);
    }
  };

  const value = {
    timerHistory,
    diaryEntries,
    saveTimer,
    saveDiaryEntry,
    getDiaryEntries,
    clearDiaryEntries,
    getTimerHistory,
    getAllTimers,
    clearTimerHistory,
    totalScore,
    highestLevel,
    gamesPlayed,
    saveGameProgress,
    deductScore,
    resetGameProgress,
    isMusicEnable,
    setIsMusicEnable,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
