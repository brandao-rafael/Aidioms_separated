export default interface IStudentCode {
  id: number;
  user_id: number;
  student_id: number;
  code: number;
  deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
