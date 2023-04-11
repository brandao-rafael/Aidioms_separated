import IClass from '../interfaces/IClass';
import Class from '../model/class.model';

export default class ClassService {
  static async create(classData: IClass): Promise<IClass> {
    const createdClass = await Class.create(classData);
    return createdClass.toJSON() as IClass;
  }

  static async findAll(): Promise<IClass[]> {
    const classes = await Class.findAll();
    return classes.map((c) => c.toJSON() as IClass);
  }

  static async findById(id: number): Promise<IClass | null> {
    const c = await Class.findByPk(id);
    return c ? (c.toJSON() as IClass) : null;
  }

  static async update(id: number, updates: Partial<IClass>): Promise<boolean> {
    const [rowsAffected] = await Class.update(updates, { where: { id } });
    return rowsAffected > 0;
  }

  static async delete(id: number): Promise<boolean> {
    try {
      await Class.update({ deleted: true }, { where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
