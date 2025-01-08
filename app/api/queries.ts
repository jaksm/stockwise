import {MOCK} from '@env';

import {useQuery} from 'react-query';

import * as api from './client';
import * as mockApi from './mockClient';
import {GetStatsOptions} from './types';

console.log(`Mocking enabled: ${MOCK}`);
const client = MOCK === 'true' ? mockApi : api;

export function useSearchAssetsQuery(searchTerm: string) {
  const queryKey = ['search-assets', searchTerm];
  const enabled = searchTerm.length > 0;

  return useQuery({
    queryKey,
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
  const queryKey = ['get-assets', ...symbols];
  const enabled = symbols.length > 0;
  const queryFn = () => Promise.all(symbols.map(client.getAsset));

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    refetchInterval: options?.isLive ? 1_000 : undefined,
    keepPreviousData: true,
  });
}

export function useGetAssetDetailsQuery(symbol: string) {
  const queryKey = ['get-asset-details', symbol];
  const enabled = Boolean(symbol);
  const queryFn = () => client.getAsset(symbol);

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    keepPreviousData: true,
  });
}

export function useGetAssetNewsQuery(symbol: string) {
  const queryKey = ['get-asset-news', symbol];
  const enabled = Boolean(symbol);
  const queryFn = () => client.getNews(symbol);

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    keepPreviousData: true,
  });
}

export function useGetNewsQuery(symbols: string[]) {
  const queryKey = ['get-news', ...symbols];
  const enabled = symbols.length > 0;
  const queryFn = () => Promise.all(symbols.map(client.getNews));

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    keepPreviousData: true,
  });
}

export function useGetStats(
  symbol: string,
  options: GetStatsOptions = {interval: 'month'},
) {
  const queryKey = ['get-stats', symbol, options];
  const enabled = Boolean(symbol);

  const queryFn = () => client.getStats(symbol, options);

  return useQuery({
    queryKey,
    queryFn,
    enabled,
    keepPreviousData: true,
  });
}
