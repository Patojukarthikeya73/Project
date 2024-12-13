import React from 'react';
import type { NewsItem } from '../types/finnhub';

interface Props {
  news: NewsItem;
}

export function NewsCard({ news }: Props) {
  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={news.image}
        alt={news.headline}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{news.headline}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">{news.summary}</p>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{news.source}</span>
          <span>{new Date(news.datetime * 1000).toLocaleDateString()}</span>
        </div>
      </div>
    </a>
  );
}