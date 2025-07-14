import type { RootState } from '../../store';

export const selectCreateArticleIsLoading = (state: RootState) => state.createArticle.isLoading;
export const selectCreateArticleIsError = (state: RootState) => state.createArticle.error;
