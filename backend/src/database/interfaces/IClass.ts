export default interface IClass {
  id?: number;
  class_name: string;
  user_id: number;
  book: string;
  unit: string;
  deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
