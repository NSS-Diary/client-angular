export interface SignInResponse {
  user: User;
  token: string;
}
export interface User {
  username: string;
  name: string;
  email: string;
  user_type: string;
}
