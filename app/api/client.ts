import {API_KEY, API_URL} from '@env';
import {Article, ArticleSchema} from '../models/Article';
import {Asset, AssetSchema} from '../models/Asset';
import {SearchResultSchema} from '../models/SearchResult';
import {
  formatTimeSeriesResponse,
  parseCompactDateTime,
} from '../utils/formatter';
import {
  GetStatsOptions,
  GlobalQuoteResponse,
  NewsSentimentResponse,
  OverviewResponse,
  SymbolSearchResponse,
  TIME_SERIES_FUNCTION,
  TIME_SERIES_POINTS_ACCESSOR,
  TimeSeriesMonthlyResponse,
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
  const [globalQuoteResponse, overviewResponse, timeSeriesMonthly] =
    await Promise.all([
      fetch(
        `${API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`,
      ),
      fetch(
        `${API_URL}/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`,
      ),
      fetch(
        `${API_URL}/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${API_KEY}`,
      ),
    ]);

  const [globalQuoteJson, overviewJson, timeSeriesMonthlyJson] =
    await Promise.all([
      globalQuoteResponse.json() as Promise<GlobalQuoteResponse>,
      overviewResponse.json() as Promise<OverviewResponse>,
      timeSeriesMonthly.json() as Promise<TimeSeriesMonthlyResponse>,
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
    timeSeriesMonthly: formatTimeSeriesResponse(
      timeSeriesMonthlyJson['Monthly Time Series'],
      'month',
    ),
  } as Asset);
}

export async function getNews(symbol: string) {
  const response = await fetch(
    `${API_URL}/query?function=NEWS_SENTIMENT&tickers=${symbol}&apikey=${API_KEY}`,
  );

  const {feed}: NewsSentimentResponse = await response.json();

  return feed.map(article =>
    ArticleSchema.parse({
      publishedAt: parseCompactDateTime(article.time_published).toISOString(),
      source: article.source,
      summary: article.summary,
      symbol,
      title: article.title,
      url: article.url,
    } as Article),
  );
}

export async function getStats(symbol: string, options: GetStatsOptions) {
  const response = await fetch(
    `${API_URL}/query?function=${
      TIME_SERIES_FUNCTION[options.interval]
    }&symbol=${symbol}&apikey=${API_KEY}`,
  );

  const json = await response.json();

  return formatTimeSeriesResponse(
    json[TIME_SERIES_POINTS_ACCESSOR[options.interval]],
    options.interval,
  );
}
