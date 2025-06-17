import type { IArticlesResponse } from './articlesType';

const API_URL = 'https://blog-platform.kata.academy/api';
//'https://blog-platform.kata.academy/api/articles'      GET статьи
// /articles?limit=500

export const fetchArticlesAPI = async ({
  pageSize,
  currentPage,
}: {
  pageSize: number;
  currentPage: number;
}): Promise<IArticlesResponse> => {
  const offset = (currentPage - 1) * pageSize;

  // console.log(`current: ${currentPage}, size: ${pageSize}, offset: ${offset}`);

  const res = await fetch(`${API_URL}/articles?limit=${pageSize}&offset=${offset}`);
  if (!res.ok) throw new Error('Ошибка загрузки статей');
  // const reult = await res.json();
  // console.log(reult);

  return res.json();
};
