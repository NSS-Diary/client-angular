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
export interface ActivitiesListResponse {
  activity_id: string;
  classroom_code: string;
  name: string;
  type: string;
  Status: string;
  start_time: Date;
  end_time: Date;
}
