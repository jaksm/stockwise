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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function symbolSearch(keywords: string) {
  const response = await fetch(
    'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo',
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
        'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo',
      ),
      fetch(
        'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo',
      ),
      fetch(
        'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo',
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
    symbol: symbol,
    type: overviewJson.AssetType,
    currency: overviewJson.Currency,
    timeSeriesMonthly: formatTimeSeriesResponse(
      timeSeriesMonthlyJson['Monthly Time Series'],
      'month',
    ),
    open: Number(globalQuoteJson['Global Quote']['02. open']),
    high: Number(globalQuoteJson['Global Quote']['03. high']),
    low: Number(globalQuoteJson['Global Quote']['04. low']),
    volume: Number(globalQuoteJson['Global Quote']['06. volume']),
    close: Number(globalQuoteJson['Global Quote']['08. previous close']),
    latestTradingDay: new Date(
      globalQuoteJson['Global Quote']['07. latest trading day'],
    ).toISOString(),
  } as Asset);
}

export async function getNews(symbol: string) {
  const response = await fetch(
    'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo',
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
    `https://www.alphavantage.co/query?function=${
      TIME_SERIES_FUNCTION[options.interval]
    }&symbol=IBM&apikey=demo`,
  );

  const json = await response.json();

  return formatTimeSeriesResponse(
    json[TIME_SERIES_POINTS_ACCESSOR[options.interval]],
    options.interval,
  );
}
