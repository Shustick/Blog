// export interface User {
//   email: string;
//   username: string;
//   image: string;
//   token: string;
// }

// export interface AuthState {
//   user: User | null;
// }
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
