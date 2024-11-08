import jwt from 'jsonwebtoken';
import { IUser } from './interfaces';
import { UserType } from '../types';
import { UserRepo } from '../persistance/Repositories';
import { isPasswordValid } from '../util/hashing';
import { InstructorDataAccess, StudentDataAccess } from '../persistance/postgresDBDataAccess';
import Env from '../../config';

const { JWT_SECRET } = Env;
class UserService implements IUser {
  // eslint-disable-next-line no-useless-constructor
  constructor(protected userData: UserRepo) {}

  login = async (email: string, password: string) : Promise<{token:string, id:string|undefined, user:Partial<UserType>}> => {
    const user = await this.userData.getByEmail(email);
    console.log('Usssseeerr', user);
    if (!user) {
      throw new Error('Incorrect email or password');
    }

    const isMatch:boolean = isPasswordValid(user.password, password);

    if (!isMatch) {
      throw new Error('Incorrect email or password');
    }
    let { id } = user;
    try {
      if (user.role === 'student') {
        const student = await new StudentDataAccess().getByUserId(id);
        id = student?.id;
      } else if (user.role === 'teaching assistant' || user.role === 'professor') {
        const instrcutor = await new InstructorDataAccess().getByUserId(id as string);
        id = instrcutor?.id;
      }
    } catch {
      throw Error('Something went wrong, please try again ');
    }

    const payload = {
      id,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET as string, { expiresIn: '2d' });

    return {
      token,
      id,
      user: {
        id,
        email: user.email,
        role: user.role,
      },

    };
  };

  create = async (user: UserType):Promise<Partial<UserType> | undefined> => {
    try {
      return this.userData.create(user);
    } catch {
      throw new Error('Fail to get the user Data, Please try again !!');
    }
  };

  // getById = (id: string) => {
  //   try {
  //     return this.userData.getById(id);
  //   } catch {
  //     throw new Error('Fail to get the user Data, Please try again !!');
  //   }
  // };

  // getByEmail = (email: string) => {w
  //   try {
  //     return this.userData.getByEmail(email);
  //   } catch {
  //     throw new Error('Fail to get the user Data, Please try again !!');
  //   }
  // };
}

export default UserService;
