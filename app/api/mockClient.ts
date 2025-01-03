import {Asset, AssetSchema} from '../models/Asset';
import {AssetSearchResultSchema} from '../models/AssetSearchResult';
import {
  GlobalQuoteResponse,
  OverviewResponse,
  SymbolSearchResponse,
} from './types';

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

export async function getAsset(symbol: string) {
  console.log(`Mock fetching asset with symbol: ${symbol}`);

  const [globalQuoteResponse, overviewResponse] = await Promise.all([
    fetch(
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo',
    ),
    fetch(
      'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo',
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
    symbol: symbol,
    type: overviewJson.AssetType,
    currency: overviewJson.Currency,
  } as Asset);
}
