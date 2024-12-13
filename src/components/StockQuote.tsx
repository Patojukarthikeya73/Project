import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { StockQuote } from '../types/finnhub';

interface Props {
  symbol: string;
  quote: StockQuote;
}

export function StockQuoteCard({ symbol, quote }: Props) {
  const priceChange = quote.c - quote.pc;
  const percentageChange = (priceChange / quote.pc) * 100;
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{symbol}</h2>
        {isPositive ? (
          <ArrowUpCircle className="w-6 h-6 text-green-500" />
        ) : (
          <ArrowDownCircle className="w-6 h-6 text-red-500" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-500">Current Price</p>
          <p className="text-xl font-semibold">${quote.c.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Change</p>
          <p className={`text-xl font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange > 0 ? '+' : ''}{priceChange.toFixed(2)} ({percentageChange.toFixed(2)}%)
          </p>
        </div>
        <div>
          <p className="text-gray-500">High</p>
          <p className="text-xl font-semibold">${quote.h.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-500">Low</p>
          <p className="text-xl font-semibold">${quote.l.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}