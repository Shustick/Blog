import type { IAuthResponse } from './authType';

const API_URL = 'https://blog-platform.kata.academy/api';

export const registerAPI = async (userData: {
  username: string;
  email: string;
  password: string;
}): Promise<IAuthResponse> => {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userData }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error.errors));
  }

  return res.json();
};

export const loginAPI = async (userData: { email: string; password: string }): Promise<IAuthResponse> => {
  const res = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: userData }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error.errors));
  }

  return res.json();
};

export const getCurrentUserAPI = async (token: string): Promise<IAuthResponse> => {
  const res = await fetch(`${API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Не удалось получить данные пользователя');
  }

  return res.json();
};

export const updateProfileAPI = async (
  userData: { email: string; username: string; password?: string; image?: string; bio?: string },
  token: string
): Promise<IAuthResponse> => {
  const res = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: userData }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(JSON.stringify(error.errors));
  }

  return res.json();
};
