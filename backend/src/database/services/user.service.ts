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

    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
        }

        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #1E3B5B;
            color: #ffffff;
        }

        .header h1 {
            margin: 0;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .verification-code {
            background-color: #00AFD8;
            color: #ffffff;
            font-size: 2rem;
            font-weight: bold;
            padding: 20px;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
        }

        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 0.8rem;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>JETLabs A.I.Dioms</h1>
        </div>
        <div class="content">
            <p>Dear user,</p>
            <p>Thank you for choosing A.I.Dioms by JETLabs. Please find your verification code below:</p>
            <div class="verification-code">
                ${code}
            </div>
            <p>Please enter this code in the app to complete the verification process.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Best regards,</p>
            <p>The JETLabs Team</p>
        </div>
        <div class="footer">
            &copy; JETLabs, All Rights Reserved
        </div>
    </div>
</body>
</html>
    `

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Verification code',
      html: html,
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
    const user = await User.findOne({ where: { email } });
  
    if (!user) {
      return 'User not found';
    }
  
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + tokenExpirationTime);
  
    await UserCode.create({ userId: user.id, code: token, expires });

    const passwordResetLink = `http://localhost:3000/verify-token?token=${token}`;

    const htmlResetLink = `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
      body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
      }

      .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
      }

      .header {
          text-align: center;
          padding: 20px 0;
          background-color: #1E3B5B;
          color: #cce7f3;
      }

      .header h1 {
          margin: 0;
      }

      .content {
          padding: 20px;
          text-align: center;
      }

      .reset-link {
          background-color: #00AFD8;
          color: #ffffff;
          font-size: 1rem;
          font-weight: bold;
          padding: 10px 20px;
          border-radius: 5px;
          display: inline-block;
          margin: 20px 0;
          text-decoration: none;
      }

      .footer {
          text-align: center;
          padding: 20px 0;
          font-size: 0.8rem;
          color: #888888;
      }
  </style>
</head>
<body>
  <div class="container">
      <div class="header">
          <h1>JETLabs A.I.Dioms</h1>
      </div>
      <div class="content">
          <p>Dear user,</p>
          <p>We have received a password reset request for your A.I.Dioms account. To reset your password, please click the button below:</p>
          <a href=${passwordResetLink} class="reset-link">Reset Password</a>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,</p>
          <p>The JETLabs Team</p>
      </div>
      <div class="footer">
          &copy; JETLabs, All Rights Reserved
      </div>
  </div>
</body>
</html>
    `
  
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Password Reset',
      html: htmlResetLink,
      };
  
    await transporter.sendMail(mailOptions);
    return 'Password reset email sent';
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
