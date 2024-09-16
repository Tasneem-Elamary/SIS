import models from '../../models';
import { StudentRepo } from '../Repositories';
import { StudentType, UserType, BylawType } from '../../types';
import { UserDataAccess } from '.';
import { db } from '../../../config/postgresDB.config';
import { hashPassword } from '../../util/hashing';
import { passwordGenerator } from '../../util/passwordGenerator';
import { sendEmail } from '../../util/sendEmail';

class StudentDataAccess implements StudentRepo {
  private async getBylawIdByCode(bylawCode: string|undefined): Promise<string | undefined> {
    const bylaw = await models.Bylaw.findOne({ where: { code: bylawCode } });
    console.log('Debugging***', bylaw?.getDataValue('id'));
    return bylaw ? bylaw.getDataValue('id') : undefined;
  }

  create = async (student: StudentType&UserType): Promise<StudentType | undefined> => {
    const {
      email, studentCode, name, bylawCode,
    } = student;
    const password = passwordGenerator();
    student = { ...student, password };
    const transaction = await db.transaction();
    try {
      const userDataAccess = new UserDataAccess();
      const user = await userDataAccess.create({ email, password: hashPassword(password), role: 'student' }, transaction);
      if (!user) {
        throw new Error('User creation failed');
      }
      console.log('BYylaww', bylawCode);
      const bylawId = await this.getBylawIdByCode(bylawCode);
      if (!bylawId) {
        throw new Error('Bylaw not found');
      }
      const newStudent = await models.Student.create(
        {
          studentCode,
          name,
          BylawId: bylawId,
          UserId: user.id,
        },
        { transaction },
      );
      await transaction.commit();
      sendEmail(
        student.email,
        'Academic account password',
        `Dear Student,/n/n here is your password ${password}`,
      ).catch(console.error);
      return newStudent.get();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw new Error('Fail to save the student user, Please try again !!');
    }
  };

  getById = async (id: string): Promise<StudentType | undefined> => {
    try {
      const student = await models.Student.findOne({ where: { id } });
      return student ? (student.get() as StudentType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to get the user, Please try again !!');
    }
  };

  getAll = async (): Promise<(StudentType & { email: string })[]> => {
    try {
      // Use Sequelize's include to join the User model and fetch the email
      const studentModels = await models.Student.findAll({
        include: [
          {
            model: models.User,

            attributes: ['email'], // Only select the email attribute from the User model
          },
        ],
      });

      // Map over the result to combine Student and User data
      const students = studentModels.map((student) => {
        const studentData = student.get({ plain: true }) as StudentType;

        const email = (student as any).User?.email || '';

        return { ...studentData, email };
      });

      return students;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the students, please try again!');
    }
  };

  getByUserId = async (UserId: string|undefined): Promise<StudentType | undefined> => {
    try {
      const student = await models.Student.findOne({ where: { UserId } });
      return student ? (student.get() as StudentType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Fail to get student data, Please try again !!');
    }
  };

  getStudentByCode = async (studentCode: string): Promise<StudentType | undefined> => {
    try {
      const student = await models.Student.findOne({
        where: { studentCode },

      });

      if (!student) throw new Error('Student not found!');
      return student ? (student.get() as StudentType) : undefined;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  update = async (studentId: string, updateData: Partial<(StudentType)>): Promise<(StudentType) | undefined> => {
    const transaction = await db.transaction();

    try {
      const student = await models.Student.findByPk(studentId, { transaction });

      if (!student) {
        console.error('Student not found');
        await transaction.rollback();
        return undefined;
      }

      if (updateData.bylawCode) {
        const bylawId = await this.getBylawIdByCode(updateData.bylawCode);
        if (bylawId) {
          updateData.BylawId = bylawId;
        } else {
          throw new Error('Bylaw not found');
        }
      }
      await student.update(updateData, { transaction });
      await transaction.commit();

      return student.get() as StudentType;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to update student:', error);
      throw new Error('Fail to update the student, Please try again !!');
    }
  };

  delete = async (studentId: string) => {
    const transaction = await db.transaction();

    try {
      const student = await models.Student.findByPk(studentId, { transaction });
      if (!student) {
        console.error('Student not found');
        await transaction.rollback();
        return false;
      }

      const userDataAccess = new UserDataAccess();

      const deleteUserSuccess = await userDataAccess.delete(student.getDataValue('UserId'), transaction);

      if (!deleteUserSuccess) {
        await transaction.rollback();
        return false;
      }

      await student.destroy({ transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to delete student:', error);
      throw new Error('Fail to delete the student, Please try again !!');
    }
  };

//   getByEmail = async (email: string): Promise<StudentType | undefined> => {
//     try {
//       const user = await Student.findOne({ where: { email } });
//       return user ? (user.get() as UserType) : undefined;
//     } catch (error) {
//       console.error(error);
//       throw new Error('Fail to get the user, Please try again !!');
//     }
//   };
}

export default StudentDataAccess;
