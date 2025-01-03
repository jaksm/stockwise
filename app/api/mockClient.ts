import {AssetSearchResultSchema} from '../models/AssetSearchResult';
import {SymbolSearchResponse} from './types';

export async function symbolSearch(keywords: string) {
  console.log(`Mock search with keywords: ${keywords}`);

  const response = await fetch(
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo',
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
