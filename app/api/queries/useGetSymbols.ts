import {API_KEY, API_URL} from '@env';
import {useQuery} from 'react-query';

// Realtime bulk api is premium, so we have to improvise (https://www.alphavantage.co/documentation/#realtime-bulk-quotes)
export const getSymbols = async (symbols: string[]) => {
  const responses = await Promise.all(
    symbols.map(symbol =>
      fetch(
        `${API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
      ),
    ),
  );

  return Promise.all(responses.map(response => response.json()));
};

export function useGetSymbols(symbols: string[]) {
  const queryKey = `get-symbols-[${symbols.join(',')}]`;

  return useQuery(queryKey, {
    queryFn: () => getSymbols(symbols),
    cacheTime: 1000 * 60 * 5, // let's not reach rate limit quota
    refetchOnMount: false,
  });
}
