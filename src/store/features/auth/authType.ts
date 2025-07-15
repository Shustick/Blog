export interface IUser {
  email: string;
  username: string;
  bio: string | null;
  image: string;
  token: string;
}

export interface IAuthResponse {
  user: IUser;
}
