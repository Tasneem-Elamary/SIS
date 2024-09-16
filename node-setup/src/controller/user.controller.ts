import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import UserService from '../services/user.service';
import { IUser } from '../services/interfaces';
import { DataAccess } from '../persistance';
import { UserType } from '../types';
import { UserRepo } from '../persistance/Repositories';

const { UserDataAccess } = DataAccess;

@Route('user')
class UserController {
  private user: UserService;

  constructor() {
    const userDataAccess = new UserDataAccess();
    this.user = new UserService(userDataAccess);
  }

  @Get('/{id}')
  public async getById(id: string): Promise<any> {
    // const user = await this.user.getById(id);
    // return user;
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    // console.log('debuggingg:- ', this.user);
    try {
      const { email, password } = req.body;

      const userData = await this.user.login(email, password);
      if (userData) {
        res.json({ userData });
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    } catch (error) {
      // res.status(400).json({ msg: 'Invalid Credentials' });
      next(error);
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
  // try {
  //   const { body } = req;
  //   console.log(body);

    //   const user = await this.user.create({ ...body, password: hashPassword(body.password) });

  //   res.send({
  //     msg: 'User added successfully', user,
  //   });
  // } catch (e) {
  //   next(e);
  // }
  };

  public async get(req: Request, res: Response, next: NextFunction) {
  // try {
  //   const { id } = req.user.user;
  //   const user = await this.user.getById(id);
  //   res.send({
  //     msg: 'User got successfully', user,
  //   });
  // } catch (e) {
  //   next(e);
  // }
  }

// login = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { body: { email, password } } = req;
  //     const user = await this.user.getByEmail(email);
  //     if (user && isPasswordValid(user.password, password)) {
  //       const token = signUser(user);
  //       res.send({
  //         msg: 'Signin successfully',
  //         token,
  //       });
  //     } else {
  //       throw new Error('Email and password not match, Please try again !!');
  //     }
  //   } catch (e) {
  //     next(e);
  //   }
  // };
// };
}
export default new UserController();
