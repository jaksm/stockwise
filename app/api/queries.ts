import {MOCK} from '@env';

import {useQuery} from 'react-query';

import * as api from './client';
import * as mockApi from './mockClient';

console.log(`Mocking enabled: ${MOCK}`);
const client = MOCK === 'true' ? mockApi : api;

export function useSearchAssetsQuery(searchTerm: string) {
  const queryKey = `search-assets-[${searchTerm}]`;
  const enabled = searchTerm.length > 0;

  return useQuery(queryKey, {
    queryFn: () => client.symbolSearch(searchTerm),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled,
  });
}

export function useGetAssetsQuery(
  symbols: string[],
  options?: {isLive?: boolean},
) {
  const queryKey = `get-assets-[${symbols.join(',')}]`;
  const enabled = symbols.length > 0;
  const queryFn = () => Promise.all(symbols.map(client.getAsset));

  return useQuery(queryKey, {
    queryFn,
    enabled,
    refetchInterval: options?.isLive ? 1_000 : undefined,
  });
}
