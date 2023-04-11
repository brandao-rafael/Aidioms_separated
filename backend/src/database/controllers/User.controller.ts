import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public create = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const data = req.body;
      const created = await UserService.createUser(data);
      switch (created) {
        case 'User already exists':
          return res.status(409).json({ message: created });
        case null:
          return res.status(500).end();
        default:
          return res.status(201).end();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };

  public getById = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { userId } = req.body;
      const user = await UserService.getById(userId);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).end();
    }
  };

  public login = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body;
      const tokenName = await UserService.login(email, password);
      if (!tokenName) return res.status(401).json({ message: 'Invalid email or password' });
      if (typeof tokenName === 'string') {
        return res.status(401).json({ message: 'Verify your account' });
      }
      
      return res.status(200).json({ token: tokenName.token, userName: tokenName.userName });
    } catch (error) {
      return res.status(500).end();
    }
  };

  public validate = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, validationCode } = req.body;
      const validated = await UserService.validateUser(email, Number(validationCode));
      if (validated) {
        return res.status(204).json({ message: 'ok' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid Validation Code' });
    }
  };

  public update = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const updated = await UserService.update(id, payload);
      if (!updated) {
        return res.status(400).end();
      }
      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  };

  public delete = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const deleted = UserService.removeUser(id);
      if (!deleted) return res.status(400).end();
      return res.status(204).end();
    } catch (error) {
      return res.status(500).end();
    }
  };
}
