export interface UserListResponse {
  username: string;
  name: string;
  email: string;
  farm_hours?: number;
  social_hours?: number;
}

export interface UserMeResponse {
  user: {
    username: string;
    name: string;
    email: string;
    user_type: string;
  };
  metadata: {
    farm_hours: number;
    social_hours: number;
    classroom_code: string;
  };
}
