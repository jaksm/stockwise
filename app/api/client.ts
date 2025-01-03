import {API_KEY, API_URL} from '@env';
import {AssetSearchResultSchema} from '../models/AssetSearchResult';
import {SymbolSearchResponse} from './types';

export async function symbolSearch(keywords: string) {
  const response = await fetch(
    `${API_URL}/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`,
  );

  const {bestMatches}: SymbolSearchResponse = await response.json();

  return bestMatches.map(match =>
    AssetSearchResultSchema.parse({
      currency: match['8. currency'],
      name: match['2. name'],
      region: match['4. region'],
      symbol: match['1. symbol'],
      type: match['3. type'],
    }),
  );
}
