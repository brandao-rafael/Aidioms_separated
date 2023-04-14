/* eslint-disable max-lines-per-function */
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import IUserRegister from '../interfaces/IUserRegister';
import User from '../model/users.model';
import 'dotenv/config';
import UserCode from '../model/userCode';
import transporter from '../model/config/transporter';

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

type TokenName = {
  token: string,
  userName: string
}

const saltRounds = 10;
const tokenExpirationTime = 30 * 60 * 1000;

export default class UserService {
  private static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private static getVerificationCode(): number {
    return Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
  }

  public static async createUser(userData: IUserRegister): Promise<string | object> {
    const { name, email, phone, password, birth } = userData;
    const hash = await this.hashPassword(password);
    const users = await User.findOne({ where: { email } });
    const code = this.getVerificationCode();

    if (users) {
      return 'User already exists';
    }

    const birthDate = new Date(birth);
    const created = await User.create({ name, email, password: hash, phone, birth: birthDate });

    await UserCode.create({
      userId: created.id,
      code: code.toString(),
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Verification code',
      html: `Your verification code is ${code}`,
    };

    await transporter.sendMail(mailOptions);
    return created;
  }

  public static async getById(id: string) {
    const result = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    return result;
  }

  public static async validateUser(email:string, validationCode:number) {
    const user = await User.findOne({ where: { email } });
    const code = await UserCode.findOne({ where: { userId: user?.id } });

    if (Number(code?.code) !== validationCode) return null;

    await Promise.all([
      UserCode.update({ deleted: true }, { where: { id: code?.id } }),
      User.update({ emailVerified: true }, { where: { id: user?.id } }),
    ]);

    return 'Ok';
  }

  public static async login(email: string, password: string): Promise<TokenName | string | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) return null;
    if (user?.isVerified) return 'Verify your email';
    if (!bcrypt.compareSync(password, user.password)) return null;

    const token = jwt
      .sign({ userId: user.id }, process.env.JWT_SECRET as string, jwtConfig as object);
    return { token, userName: user.name };
  }

  public static async verify(email: string, validationCode: number): Promise<boolean> {
    const result = await User.findOne({
      where: { email },
      include: [{ model: UserCode, where: { code: validationCode } }],
    });
    return Boolean(result);
  }

  public static removeUser(id: string): Promise<object | null> {
    return User.update({ deleted: true }, { where: { id } });
  }

  public static async update(id:string, payload: object): Promise<object | null> {
    if ('email_verified' in payload) {
      return null;
    }
    return User.update({ ...payload }, { where: { id } });
  }

  public static async sendPasswordResetEmail(email: string): Promise<string | undefined> {
    try {
      const user = await User.findOne({ where: { email } });
    
      if (!user) {
        return 'User not found';
      }
    
      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + tokenExpirationTime);
    
      await UserCode.create({ userId: user.id, code: token, expires });
    
      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: 'Password Reset',
        html: `Click the link to reset your password: <a href="http://localhost:3000/verify-token?token=${token}">Reset Password</a>`,
      };
    
      await transporter.sendMail(mailOptions);
      return 'Password reset email sent';
    } catch (error) {
      console.log(error);
    }
  }
  
  public static async verifyResetToken(token: string): Promise<User | null> {
    const passwordResetToken = await UserCode.findOne({ where: { code: token } });

    if (passwordResetToken?.expires === null) {
      return null;
    }
  
    if (!passwordResetToken || Number(passwordResetToken.expires) < Date.now()) {
      return null;
    }
  
    const user = await User.findByPk(passwordResetToken.userId);
    return user;
  }
  
  public static async resetPassword(userId: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(newPassword);
    const result = await User.update({ password: hashedPassword }, { where: { id: userId } });
  
    if (result) {
      await UserCode.destroy({ where: { userId } });
      return true;
    } else {
      return false;
    }
  }
}
