import type { RootState } from '../../store';

export const selectArticles = (state: RootState) => state.articles.articles;
export const selectArticlesLoading = (state: RootState) => state.articles.isLoading;
export const selectArticlesError = (state: RootState) => state.articles.error;

export const selectArticlesCount = (state: RootState) => state.articles.articlesCount;
