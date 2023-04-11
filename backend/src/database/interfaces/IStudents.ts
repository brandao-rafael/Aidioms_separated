export default interface IStudent {
  id: number;
  name: string;
  email: string;
  birth: Date;
  class_id: number;
  difficult?: string;
  best_activities?: string;
  email_verified: boolean;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}
