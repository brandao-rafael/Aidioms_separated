import { Request, Response } from 'express';
import ClassService from '../services/class.service';

export default class ClassController {
  public getAll = async (_req: Request, res: Response): Promise<void | Response> => {
    const classes = await ClassService.findAll();
    return res.status(200).json(classes);
  };

  public getOne = async (req: Request, res: Response): Promise<void | Response> => {
    const id = Number(req.params.id);
    const classItem = await ClassService.findById(id);
    if (classItem) {
      return res.status(200).json(classItem);
    }
    return res.status(404).send();
  };

  public create = async (req: Request, res: Response): Promise<void | Response> => {
    const classData = req.body;
    const createdClass = await ClassService.create(classData);
    return res.status(201).json(createdClass);
  };

  public update = async (req: Request, res: Response): Promise<void | Response> => {
    const id = Number(req.params.id);
    const updates = req.body;
    const success = await ClassService.update(id, updates);
    if (success) {
      return res.status(200).send();
    }
    return res.status(404).send();
  };

  public delete = async (req: Request, res: Response): Promise<void | Response> => {
    const id = Number(req.params.id);
    const success = await ClassService.delete(id);
    if (success) {
      return res.status(200).send();
    }
    return res.status(404).send();
  };
}
