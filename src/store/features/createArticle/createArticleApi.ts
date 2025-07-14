const API_URL = 'https://blog-platform.kata.academy/api';

export interface ArticleData {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

export const createArticleAPI = async (articleData: ArticleData) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: articleData }),
  });

  if (!res.ok) {
    const statusText = `${res.status} ${res.statusText}`;
    const errorMessage = `Failed to load resource: the server responded with a status of ${statusText}`;
    throw new Error(errorMessage);
  }
  console.log(token);
  return res.json();
};
