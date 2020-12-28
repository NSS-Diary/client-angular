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
export interface AddActivityRequest {
  classroom_code: string;
  name: string;
  type: string;
  start_time: string;
  end_time: string;
}
export interface LockActivityRequest {
  activity_id: string;
  maxStudents: number;
}
export interface EnrollRequest {
  activity_id: string;
}
