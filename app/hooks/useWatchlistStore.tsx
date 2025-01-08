import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const STORAGE_KEY = 'default-watchlist';

type WatchlistContextType = {
  symbols: string[];
  addSymbol: (symbol: string) => Promise<void>;
  removeSymbol: (symbolId: string) => Promise<void>;
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined,
);

export const WatchlistProvider: FC<PropsWithChildren> = ({children}) => {
  const [symbols, setSymbols] = useState<string[]>([]);

  useEffect(() => {
    const loadSymbols = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        const savedSymbols = jsonValue !== null ? JSON.parse(jsonValue) : [];
        setSymbols(savedSymbols);
      } catch (error) {
        console.error('Error loading watchlist:', error);
      }
    };
    loadSymbols();
  }, []);

  const addSymbol = useCallback(
    async (symbol: string) => {
      try {
        const newSymbols = [...symbols, symbol];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSymbols));
        setSymbols(newSymbols);
      } catch (error) {
        console.error('Error adding symbol:', error);
      }
    },
    [symbols],
  );

  const removeSymbol = useCallback(
    async (symbol: string) => {
      try {
        const newSymbols = symbols.filter(s => s !== symbol);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSymbols));
        setSymbols(newSymbols);
      } catch (error) {
        console.error('Error removing symbol:', error);
      }
    },
    [symbols],
  );

  const providerValue = useMemo(
    () => ({symbols, addSymbol, removeSymbol}),
    [addSymbol, removeSymbol, symbols],
  );

  return (
    <WatchlistContext.Provider value={providerValue}>
      {children}
    </WatchlistContext.Provider>
  );
};

export function useWatchlistStore() {
  const context = useContext(WatchlistContext);

  if (!context) {
    throw new Error(
      'useWatchlistStore must be used within a WatchlistProvider',
    );
  }

  return context;
}
