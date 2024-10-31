import { Op } from 'sequelize';
import models, {
  CourseEnrollment, Grade, Result, Student, StudentSchedule, User,
} from '../../models';
import { StudentRepo } from '../Repositories';
import {
  StudentType, UserType, BylawType, CourseType,
} from '../../types';
import { UserDataAccess } from '.';
import { db } from '../../../config/postgresDB.config';
import { hashPassword } from '../../util/hashing';
import { passwordGenerator } from '../../util/passwordGenerator';
import { sendEmail } from '../../util/sendEmail';

interface StudentWithUser extends StudentType {
  User: {
    email: string;
  };
}
class StudentDataAccess implements StudentRepo {
  private async getBylawIdByCode(bylawCode: string|undefined): Promise<string | undefined> {
    const bylaw = await models.Bylaw.findOne({ where: { code: bylawCode } });
    console.log('Debugging***', bylaw?.getDataValue('id'));
    return bylaw ? bylaw.getDataValue('id') : undefined;
  }

  public registerSchedule = async (StudentId: string, ScheduleId: string): Promise<void> => {
    const transaction = await db.transaction();

    try {
      console.log('StudentId:', StudentId);
      console.log('ScheduleId:', ScheduleId);

      if (!StudentId) {
        throw new Error('StudentId is missing or undefined');
      }

      if (!ScheduleId) {
        throw new Error('ScheduleId is missing or undefined');
      }

      const student = await Student.findOne({ where: { id: StudentId }, transaction });
      if (!student) {
        throw new Error('Student not found');
      }

      const schedule = await models.Schedule.findByPk(ScheduleId, { transaction });
      // const schedule = await Schedule.findByPk(ScheduleId, { transaction });
      if (!schedule) {
        throw new Error('Schedule not found');
      }

      const courseId = schedule.getDataValue('CourseId');
      if (!courseId) {
        throw new Error('CourseId is missing in the schedule');
      }

      await StudentSchedule.create({ StudentId, ScheduleId }, { transaction });

      await CourseEnrollment.create({
        StudentId,
        CourseId: courseId,
        enrollmentType: 'regular',
        hasPaidFees: false,
        approvalStatus: 'pending',
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to register schedule:', error);
      throw new Error('Failed to register the schedule, please try again!');
    }
  };

  public registerSchedules = async (StudentId: string, scheduleIds: string[]): Promise<void> => {
    try {
      for (const ScheduleId of scheduleIds) {
        console.log('singleId', ScheduleId);
        await this.registerSchedule(StudentId, ScheduleId);
      }
    } catch (error) {
      console.log('Error encountered while creating schedules', error);

      throw Error('Error encountered while creating schedules');
    }
  };

  public unregisterSchedule = async (studentId: string, scheduleId: string): Promise<void> => {
    const transaction = await db.transaction();

    try {
      const student = await models.Student.findByPk(studentId, { transaction });
      if (!student) {
        throw new Error('Student not found');
      }

      const schedule = await models.Schedule.findByPk(scheduleId, { transaction });
      if (!schedule) {
        throw new Error('Schedule not found');
      }

      await models.StudentSchedule.destroy({
        where: { studentId, scheduleId },
        transaction,
      });

      const courseId = schedule.getDataValue('CourseId');
      await models.CourseEnrollment.destroy({
        where: { studentId, courseId },
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error('Failed to unregister schedule:', error);
      throw new Error('Failed to unregister the schedule, please try again!');
    }
  };

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
        'Your Academic Account Credentials',
        `
          Dear ${student.name},
          
          Welcome to the academic portal. Your account has been successfully created.
          
          Below are your login details:
          
          - **Email**: ${student.email}
          - **Password**: ${password}
          
          Please keep this information secure and do not share it with others. You may log in to your account and change your password once logged in.
          
          If you have any questions, feel free to reach out to the academic support team.
          
          Best regards,
          Academic Support Team
        `,
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
      const studentModels = await models.Student.findAll({
        include: [
          {
            model: models.User,
            attributes: ['email'],
          },
        ],
      });

      const students = studentModels.map((studentModel) => {
        const studentData = studentModel.get({ plain: true }) as StudentWithUser;

        const email = studentData.User?.email || '';

        return { ...studentData, email };
      });

      return students;
    } catch (error) {
      console.error('Error:', error);
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

  // findStudentsForSpecificBylaw = async(BylawId: string):Promise<(StudentType&string)[]>=>{
  getStudentsForSpecificBylaw = async (BylawId: string):Promise<StudentType[]> => {
    try {
      const students = await Student.findAll({ where: { BylawId }, include: [{ model: User, attributes: ['email'] }] });
      return students.map((student) => student.get({ plain: true }));
    } catch (error) {
      console.log('Failed to find bylaw students due to error: ', error);
      throw Error('Failed to find bylaw students');
    }
  };

  getFailedUnenrolledStudents = async (courseId: string):Promise<StudentType[]> => {
    try {
      const failedUnenrolledStudents = await Student.findAll({
        include: [
          {
            model: Result,
            required: false,
            where: {
              CourseId: courseId,
            },
            include: [
              {
                model: Grade,
                where: { letter: 'F' },
                required: false,
              },
            ],
          },
        ],
        attributes: ['name', 'gainedHours', 'GPA'],
      });

      return failedUnenrolledStudents.map((student) => student.get({ plain: true }));
    } catch (error) {
      console.error('Error fetching failed or unenrolled students:', error);
      return [];
    }
  };

  getEnrolledCoursesByStudent = async (studentId: string): Promise<StudentType> => {
    try {
      const student:any = await models.Student.findOne({
        where: { id: studentId },
        include: [
          {
            model: models.Course,
            as: 'Courses',
            through: { attributes: [], where: { approvalStatus: 'Approved' } }, // Include the enrolled courses
          },
        ],
      });

      if (!student) throw new Error('Student not found');

      return student.get();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get enrolled courses, please try again!');
    }
  };

  ApproveRegularRequest = async (studentId: string, scheduleCell: number): Promise<StudentType|undefined> => {
    const transaction = await db.transaction();
    try {
      const Targetedschedule = await models.Schedule.findOne({ where: { cell: scheduleCell } });
      const student :any = await models.Student.findOne({
        where: { id: studentId },
        include: [
          {
            model: models.Course,
            as: 'Courses',
            where: { id: Targetedschedule?.get().CourseId }, // Match the specific course
            through: {
              where: { approvalStatus: 'pending', hasPaidFees: true, enrollmentType: 'regular' },
              attributes: [], // Access through table attributes
            },
          },
          {
            model: models.Schedule,
            as: 'Schedules',
            where: { cell: scheduleCell }, // Match the specific schedule
            through: {
              where: { approvalStatus: 'pending' },
              attributes: [],

            },
          },
        ],
      });

      if (!student) {
        throw new Error('Student not found or no matching associations.');
      }

      // Get the associated course and schedule (if found)
      const course = student.Courses?.[0];
      const schedule = student.Schedules?.[0];

      // Update approvalStatus in CourseEnrollments
      if (course && schedule) {
        await student.addCourse(course, {
          through: { approvalStatus: 'Approved' },
          transaction,
        });

        await models.StudentSchedule.update(
          { approvalStatus: 'Approved' }, // The updated value
          {
            where: {
              StudentId: studentId,
              ScheduleId: Targetedschedule?.get().id,
            },
            transaction,
          },
        );
      } else {
        throw new Error('No matching StudentSchedules or studentCourses record found.');
      }
      await transaction.commit();
      return student ? student.get() : undefined;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error updating approval status');
    }
  };

  ApproveSelfstudyOROverloadRequest = async (studentId: string, courseCode: string, courseType:string): Promise<StudentType|undefined> => {
    try {
      // Find the student by ID
      const targetedcourse = await models.Course.findOne({ where: { code: courseCode } });
      const student :any = await models.Student.findOne({
        where: { id: studentId },
        include: [
          {
            model: models.Course,
            as: 'Courses',
            where: { id: targetedcourse?.get().id }, // Match the specific course
            through: {
              where: { approvalStatus: 'pending', hasPaidFees: true, enrollmentType: courseType },
              attributes: [], // Access through table attributes
            },
          },

        ],
      });

      if (!student) {
        throw new Error('Student not found or no matching associations.');
        return;
      }

      // Get the associated course and schedule (if found)
      const course = student.Courses?.[0];

      // Update approvalStatus in CourseEnrollments
      if (course) {
        await student.addCourse(course, {
          through: { approvalStatus: 'Approved' }, // Update the approval status
        });
      } else {
        throw new Error('No matching  or studentCourses record found.');
      }

      return student ? student.get() : undefined;
    } catch (error) {
      throw new Error('Error updating approval status');
    }
  };

  RejectRegularRequest = async (studentId: string, scheduleCell: number) : Promise<StudentType|undefined> => {
    const transaction = await db.transaction();
    try {
      const Targetedschedule = await models.Schedule.findOne({ where: { cell: scheduleCell } });
      const student :any = await models.Student.findOne({
        where: { id: studentId },
        include: [
          {
            model: models.Course,
            as: 'Courses',
            where: { id: Targetedschedule?.get().CourseId }, // Match the specific course
            through: {
              where: { approvalStatus: 'pending', enrollmentType: 'regular' },
              attributes: [], // Access through table attributes
            },
          },
          {
            model: models.Schedule,
            as: 'Schedules',
            where: { cell: scheduleCell }, // Match the specific schedule
            through: {
              where: { approvalStatus: 'pending' },
              attributes: [],

            },
          },
        ],
      });

      if (!student) {
        throw new Error('Student not found or no matching associations.');
        return;
      }

      // Get the associated course and schedule (if found)
      const course = student.Courses?.[0];
      const schedule = student.Schedules?.[0];

      // Update approvalStatus in CourseEnrollments
      if (course && schedule) {
        await student.addCourse(course, {
          through: { approvalStatus: 'unApproved' },
          transaction, // Update the approval status
        });

        await models.StudentSchedule.destroy(
          // The updated value
          {
            where: {
              StudentId: studentId,
              ScheduleId: Targetedschedule?.get().id,
            },
            transaction,
          },
        );
      } else {
        throw new Error('No matching StudentSchedules or studentCourses record found.');
      }
      await transaction.commit();
      return student ? student.get() : undefined;
    } catch (error) {
      await transaction.rollback();
      throw new Error('Error updating approval status');
    }
  };

  RejectSelfstudyRequestOROverload = async (studentId: string, courseCode: string, courseType:string): Promise<StudentType|undefined> => {
    try {
      // Find the student by ID
      const targetedcourse = await models.Course.findOne({ where: { code: courseCode } });
      const student :any = await models.Student.findOne({
        where: { id: studentId },
        include: [
          {
            model: models.Course,
            as: 'Courses',
            where: { id: targetedcourse?.get().id }, // Match the specific course
            through: {
              where: { approvalStatus: 'pending', enrollmentType: courseType },
              attributes: [], // Access through table attributes
            },
          },

        ],
      });

      if (!student) {
        throw new Error('Student not found or no matching associations.');
        return;
      }

      // Get the associated course and schedule (if found)
      const course = student.Courses?.[0];

      // Update approvalStatus in CourseEnrollments
      if (course) {
        await student.addCourse(course, {
          through: { approvalStatus: 'unApproved' }, // Update the approval status
        });
      } else {
        throw new Error('No matching  or studentCourses record found.');
      }

      return student ? student.get() : undefined;
    } catch (error) {
      throw new Error('Error updating approval status');
    }
  };

  getTopStudentsByGPA = async (prefix: string, limit: number, level?: number): Promise<StudentType[] | undefined> => {
    try {
      const whereClause: any = {
        studentCode: { [Op.startsWith]: prefix }, // Filter by studentCode prefix
      };

      if (level !== undefined) {
        whereClause.level = level; // Add the level condition if it is provided
      }

      const students = await models.Student.findAll({
        where: whereClause,
        order: [['GPA', 'DESC']],
        limit,
      });

      return students.length > 0 ? (students.map((student) => student.get()) as StudentType[]) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve top students, please try again!');
    }
  };

  getStudentRank = async (studentCode: string): Promise<number | undefined> => {
    try {
      // Step 1: Parse the studentCode (e.g., "23CSL3-001" or "23L3-001")
      const admissionYear = studentCode.slice(0, 2); // "23"
      let departmentCode = '';
      const levelIndex = studentCode.indexOf('L');

      // Check if there is something between the admissionYear and 'L'
      if (levelIndex > 2) {
        departmentCode = studentCode.slice(2, levelIndex); // "CS" if it exists
      }

      const level = parseInt(studentCode.charAt(levelIndex + 1), 10);
      const sequentialNumber = studentCode.split('-')[1]; // "001" (if needed later)

      // Step 2: Fetch the student by studentCode to get their GPA
      const student = await this.getStudentByCode(studentCode);
      if (!student) {
        return undefined; // If the student doesn't exist
      }

      const studentGPA = student.GPA;

      // Step 3: Build the studentCode condition, with or without departmentCode
      let studentCodeCondition;
      if (departmentCode) {
        // If departmentCode exists
        studentCodeCondition = { studentCode: { [Op.startsWith]: `${admissionYear}${departmentCode}L${level}` } };
      } else {
        // If no departmentCode
        studentCodeCondition = { studentCode: { [Op.startsWith]: `${admissionYear}L${level}` } };
      }

      // Step 4: Count students in the same level, year, (and optionally department) with a higher GPA
      const rank = await models.Student.count({
        where: {
          [Op.and]: [
            studentCodeCondition, // Match AdmissionYear + (optional DepartmentCode) + Level
            { GPA: { [Op.gt]: studentGPA } }, // Count those with higher GPA
          ],
        },
      });

      // Step 5: The rank is the number of students with a higher GPA + 1
      return rank + 1;
    } catch (error) {
      console.error('Error fetching student rank:', error);
      throw new Error('Failed to retrieve student rank, please try again!');
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
