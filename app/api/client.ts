import {API_KEY, API_URL} from '@env';
import {Asset, AssetSchema} from '../models/Asset';
import {SearchResultSchema} from '../models/SearchResult';
import {
  GlobalQuoteResponse,
  OverviewResponse,
  SymbolSearchResponse,
} from './types';

export async function symbolSearch(keywords: string) {
  const response = await fetch(
    `${API_URL}/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`,
  );

  const {bestMatches}: SymbolSearchResponse = await response.json();

  return bestMatches.map(match =>
    SearchResultSchema.parse({
      currency: match['8. currency'],
      name: match['2. name'],
      region: match['4. region'],
      symbol: match['1. symbol'],
      type: match['3. type'],
    }),
  );
}

export async function getAsset(symbol: string) {
  const [globalQuoteResponse, overviewResponse] = await Promise.all([
    fetch(
      `${API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
    ),
    fetch(
      `${API_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`,
    ),
  ]);

  const [globalQuoteJson, overviewJson] = await Promise.all([
    globalQuoteResponse.json() as Promise<GlobalQuoteResponse>,
    overviewResponse.json() as Promise<OverviewResponse>,
  ]);

  return AssetSchema.parse({
    change: Number(globalQuoteJson['Global Quote']['09. change']),
    changePercent: Number(
      globalQuoteJson['Global Quote']['10. change percent'].split('%')[0],
    ),
    name: overviewJson.Name,
    price: Number(globalQuoteJson['Global Quote']['05. price']),
    symbol: globalQuoteJson['Global Quote']['01. symbol'],
    type: overviewJson.AssetType,
    currency: overviewJson.Currency,
  } as Asset);
}
