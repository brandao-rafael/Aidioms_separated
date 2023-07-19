import IStudent from '../interfaces/IStudents';
import Student from '../database/model/students.model';

export default class StudentService {
  static async create(student: IStudent): Promise<IStudent> {
    const createdStudent = await Student.create(student);
    return createdStudent.toJSON() as IStudent;
  }

  static async findAll(): Promise<IStudent[]> {
    const students = await Student.findAll();
    return students.map((student) => student.toJSON() as IStudent);
  }

  static async findById(id: number): Promise<IStudent | null> {
    const student = await Student.findByPk(id);
    return student ? (student.toJSON() as IStudent) : null;
  }

  static async update(id: number, updates: Partial<IStudent>): Promise<boolean> {
    const [rowsAffected] = await Student.update(updates, { where: { id } });
    return rowsAffected > 0;
  }

  static async delete(id: number): Promise<boolean> {
    try {
      await Student.update({ deleted: true }, { where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
