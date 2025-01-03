import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

export function useWatchlistStore(storageKey: string) {
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    const loadSymbols = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(storageKey);
        const savedSymbols = jsonValue !== null ? JSON.parse(jsonValue) : [];
        setSymbols(savedSymbols);
      } catch (error) {
        console.error('Error loading watchlist:', error);
      }
    };
    loadSymbols();
  }, [storageKey]);

  const addSymbol = useCallback(
    async (symbol: string) => {
      try {
        const newSymbols = [...symbols, symbol];
        await AsyncStorage.setItem(storageKey, JSON.stringify(newSymbols));
        setSymbols(newSymbols);
      } catch (error) {
        console.error('Error adding symbol:', error);
      }
    },
    [symbols, storageKey],
  );

  const removeSymbol = useCallback(
    async (symbolId: string) => {
      try {
        const newSymbols = symbols.filter(s => s !== symbolId);
        await AsyncStorage.setItem(storageKey, JSON.stringify(newSymbols));
        setSymbols(newSymbols);
      } catch (error) {
        console.error('Error removing symbol:', error);
      }
    },
    [symbols, storageKey],
  );

  return {
    symbols,
    addSymbol,
    removeSymbol,
  };
}
