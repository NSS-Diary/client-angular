export interface ClassroomAddRequest {
  classroomName: string;
  adminName: string;
}
export interface ClassroomInfoRequest {
  classroom_code: string;
}
export interface AddNotificationRequest {
  title: string;
  classroom_code: string;
  description: string;
}
