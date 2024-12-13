import React, { useEffect, useState } from 'react';
import { LineChart } from 'lucide-react';
import { StockQuoteCard } from './components/StockQuote';
import { NewsCard } from './components/NewsCard';
import { getStockQuote, getMarketNews } from './utils/api';
import type { StockQuote, NewsItem } from './types/finnhub';

const WATCHED_STOCKS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];

function App() {
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch quotes for all watched stocks
        const quotesData = await Promise.all(
          WATCHED_STOCKS.map(async (symbol) => {
            const quote = await getStockQuote(symbol);
            return [symbol, quote];
          })
        );
        setQuotes(Object.fromEntries(quotesData));

        // Fetch market news
        const newsData = await getMarketNews();
        setNews(newsData.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin">
          <LineChart className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Stock Market Dashboard</h1>
      </header>

      <main className="max-w-7xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Watched Stocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WATCHED_STOCKS.map((symbol) => (
              <StockQuoteCard
                key={symbol}
                symbol={symbol}
                quote={quotes[symbol]}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Market News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;