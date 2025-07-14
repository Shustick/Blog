const API_URL = 'https://blog-platform.kata.academy/api';

export const deleteArticleAPI = async (slug: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: slug,
  });

  if (!res.ok) {
    const statusText = `${res.status} ${res.statusText}`;
    const errorMessage = `Failed to load resource: the server responded with a status of ${statusText}`;
    throw new Error(errorMessage);
  }
  if (res.status === 204) return slug;
  return res.json();
};
