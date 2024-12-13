const FINNHUB_API_KEY = 'cte68rhr01qt478l5sggcte68rhr01qt478l5sh0';
const BASE_URL = 'https://finnhub.io/api/v1';

export async function getStockQuote(symbol: string) {
  const response = await fetch(
    `${BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
  );
  return response.json();
}

export async function getMarketNews() {
  const response = await fetch(
    `${BASE_URL}/news?category=general&token=${FINNHUB_API_KEY}`
  );
  return response.json();
}