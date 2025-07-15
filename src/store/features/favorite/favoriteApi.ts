const API_URL = 'https://blog-platform.kata.academy/api';

export const favoriteApi = async (slug: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    const statusText = `${res.status} ${res.statusText}`;
    const errorMessage = `Failed to load resource: the server responded with a status of ${statusText}`;
    throw new Error(errorMessage);
  }

  return res.json();
};
