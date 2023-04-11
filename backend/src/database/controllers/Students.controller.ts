import { Request, Response } from 'express';
import StudentService from '../services/students.service';
import IStudent from '../interfaces/IStudents';

const ERROR_500 = 'Internal server error';
const STUDENT_NOT_FOUND = 'Student not found';

export default class StudentController {
  public create = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const student: IStudent = req.body;
      const createdStudent = await StudentService.create(student);
      return res.status(201).json(createdStudent);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: ERROR_500 });
    }
  };

  public getAll = async (_req: Request, res: Response): Promise<void | Response> => {
    try {
      const students = await StudentService.findAll();
      return res.status(200).json(students);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: ERROR_500 });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const id = Number(req.params.id);
      const student = await StudentService.findById(id);

      if (!student) {
        return res.status(404).json({ error: STUDENT_NOT_FOUND });
      }

      return res.status(200).json(student);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: ERROR_500 });
    }
  };

  public update = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const id = Number(req.params.id);
      const updates: Partial<IStudent> = req.body;
      const success = await StudentService.update(id, updates);

      if (!success) {
        return res.status(404).json({ error: STUDENT_NOT_FOUND });
      }

      return res.status(200).json({ message: 'Student updated successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: ERROR_500 });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const id = Number(req.params.id);
      const success = await StudentService.delete(id);

      if (!success) {
        return res.status(404).json({ error: STUDENT_NOT_FOUND });
      }

      return res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: ERROR_500 });
    }
  };
}
