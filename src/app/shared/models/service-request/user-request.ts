export interface UserListRequest {
  role: string;
  classroom_code?: string;
}
export interface UserAddRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  user_type: string;
}
