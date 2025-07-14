import type { RootState } from '../../store';

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserName = (state: RootState) => state.auth.user?.username;

export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
