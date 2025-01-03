import { useQuery } from 'react-query';
import * as client from './client';

export function useAssetSearchQuery(keywords: string) {
  const queryKey = `asset-search-[${keywords}]`;
  const enabled = keywords.length > 0;

  return useQuery(queryKey, {
    queryFn: () => client.symbolSearch(keywords),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled,
  });
}
