export interface ClassroomListResponse {
  classroom_code: string;
  name: string;
  admin_name: string;
}
export interface NotificationListResponse {
  notification_id: string;
  title: string;
  description: string;
  created_at: Date;
  classroom_code: string;
}
