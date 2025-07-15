import type { IArticle, IArticlesResponse } from './articlesType';

const API_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticlesAPI = async ({
  pageSize,
  currentPage,
}: {
  pageSize: number;
  currentPage: number;
}): Promise<IArticlesResponse> => {
  const offset = (currentPage - 1) * pageSize;

  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/articles?limit=${pageSize}&offset=${offset}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Token ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error('Loading Articles Error');

  return res.json();
};

export const fetchArticleBySlug = async (slug: string): Promise<{ article: IArticle }> => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/articles/${slug}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Token ${token}` } : {}),
    },
  });

  if (!res.ok) throw new Error('Loading Article Error');
  return res.json();
};
