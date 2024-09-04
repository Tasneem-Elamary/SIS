import { NextFunction, Request, Response } from 'express';
import { Get, Route } from 'tsoa';
import { hashPassword, isPasswordValid } from '../util/hashing';
import { signUser } from '../util/auth.util';
import { FacultyAdmin } from '../services';
import { IfacultyAdmin } from '../services/interfaces';
import { DataAccess } from '../persistance';
import {
  UserType, InstructorType, CourseType, DepartmentType, StudentAdvisorType, GradeType, SemesterType,
} from '../types';
import { UserRepo } from '../persistance/Repositories';
// import { DataAccess } from '../persistance/postgresDBDataAccess';

const {
  UserDataAccess, InstructorDataAccess, CourseDataAcces, DepartmentDataAccess, FacultyDataAccess, GradesDataAccess, SemesterDataAccess,
} = DataAccess;

@Route('user')
class FacultyAdminController {
  private facultyAdmin: IfacultyAdmin;

  constructor() {
    const userDataAccess = new UserDataAccess();
    const instructorDataAccess = new InstructorDataAccess();
    const courseDataAcces = new CourseDataAcces();
    const departmentDataAccess = new DepartmentDataAccess();
    const gradeDataAccess = new GradesDataAccess();
    const semesterDataAccess = new SemesterDataAccess();
    this.facultyAdmin = new FacultyAdmin(
      userDataAccess,
      instructorDataAccess,
      courseDataAcces,
      departmentDataAccess,
      gradeDataAccess,
      semesterDataAccess,
    );
  }

  createInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const user: UserType = {
        email: body.email,
        password: hashPassword(body.password),
        role: body.role,

      };

      // Assuming these are the instructor-specific fields
      const instructor: Partial<InstructorType> = {
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        type: body.type,
        employmentType: body.employmentType,

        // Add other instructor-specific fields as necessary
      };
      const newInstructor = await this.facultyAdmin.createInstructor(user, instructor);

      res.status(201).json({ message: 'done', newInstructor });
    } catch (e) {
      next(e);
    }
  };

  getInstructorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const instructor = await this.facultyAdmin.getInstructorById(id);

      if (!instructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ instructor });
    } catch (e) {
      next(e);
    }
  };

  getInstructorByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;

      const instructor = await this.facultyAdmin.getInstructorByEmail(email);

      if (!instructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ instructor });
    } catch (e) {
      next(e);
    }
  };

  getAllInstructors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.facultyAdmin.getAllInstructors();
      res.status(200).json({ message: 'done', instructors });
    } catch (e) {
      next(e);
    }
  };

  getAllTAs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.facultyAdmin.getAllTAs();
      res.status(200).json({ message: 'done', instructors });
    } catch (e) {
      next(e);
    }
  };

  getAllDoctors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instructors = await this.facultyAdmin.getAllDoctors();
      res.status(200).json({ message: 'done', instructors });
    } catch (e) {
      next(e);
    }
  };

  // Update instructor
  updateInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<InstructorType> = req.body;
      console.log(updatedData);

      const updatedInstructor = await this.facultyAdmin.updateInstructor(id, updatedData);

      if (!updatedInstructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'Instructor updated', updatedInstructor });
    } catch (e) {
      next(e);
    }
  };

  // Delete instructor
  deleteInstructor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedInstructor = await this.facultyAdmin.deleteInstructor(id);

      if (!deletedInstructor) {
        res.status(404).json({ message: 'Instructor not found' });
      }

      res.status(200).json({ message: 'Instructor deleted' });
    } catch (e) {
      next(e);
    }
  };

  createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newCourse = await this.facultyAdmin.createCourse(body);

      if (!newCourse) {
        res.status(500).json({ message: 'Failed to create course' });
      }

      res.status(201).json({ message: 'Course created successfully', newCourse });
    } catch (e) {
      next(e);
    }
  };

  // Update course
  updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<CourseType> = req.body;

      const updatedCourse = await this.facultyAdmin.updateCourse(id, updatedData);

      if (!updatedCourse) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ message: 'Course updated successfully', updatedCourse });
    } catch (e) {
      next(e);
    }
  };

  // Delete course
  deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedCourse = await this.facultyAdmin.deleteCourse(id);

      if (!deletedCourse) {
        res.status(404).json({ message: 'Course not found' });
      }

      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

  createDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      console.log(body);

      const newDepartment = await this.facultyAdmin.createDepartment(body);

      res.status(201).json({ message: 'Department created successfully', newDepartment });
    } catch (e) {
      next(e);
    }
  };

  // Get Department by ID
  getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const department = await this.facultyAdmin.getDepartmentById(id);

      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ department });
    } catch (e) {
      next(e);
    }
  };

  // Get Department by Code
  getDepartmentByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;

      const department = await this.facultyAdmin.getDepartmentByCode(code);

      if (!department) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ department });
    } catch (e) {
      next(e);
    }
  };

  // Get All Departments
  getAllDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const departments = await this.facultyAdmin.getAllDepartments();
      res.status(200).json({ departments });
    } catch (e) {
      next(e);
    }
  };

  // Update Department
  updateDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<DepartmentType> = req.body;
      console.log(updatedData);

      const updatedDepartment = await this.facultyAdmin.updateDepartment(id, updatedData);

      if (!updatedDepartment) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department updated successfully', updatedDepartment });
    } catch (e) {
      next(e);
    }
  };

  // Delete Department
  deleteDepartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedDepartment = await this.facultyAdmin.deleteDepartment(id);

      if (!deletedDepartment) {
        res.status(404).json({ message: 'Department not found' });
      }

      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

  createGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newGrade = await this.facultyAdmin.createGrade(body);

      if (!newGrade) {
        res.status(500).json({ message: 'Failed to create grade' });
      }

      res.status(201).json({ message: 'Grade created successfully', newGrade });
    } catch (e) {
      next(e);
    }
  };

  // Update grade
  updateGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<GradeType> = req.body;

      const updatedGrade = await this.facultyAdmin.updateGrade(id, updatedData);

      if (!updatedGrade) {
        res.status(404).json({ message: 'Grade not found' });
      }

      res.status(200).json({ message: 'Grade updated successfully', updatedGrade });
    } catch (e) {
      next(e);
    }
  };

  // Delete grade
  deleteGrade = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedGrade = await this.facultyAdmin.deleteGrade(id);

      if (!deletedGrade) {
        res.status(404).json({ message: 'Grade not found' });
      }

      res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

  createSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      const newSemester = await this.facultyAdmin.createSemester(body);

      if (!newSemester) {
        res.status(500).json({ message: 'Failed to create semester' });
      }

      res.status(201).json({ message: 'Semester created successfully', newSemester });
    } catch (e) {
      next(e);
    }
  };

  updateSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updatedData: Partial<SemesterType> = req.body;

      const updatedSemester = await this.facultyAdmin.updateSemester(id, updatedData);

      if (!updatedSemester) {
        res.status(404).json({ message: 'Semester not found' });
      }

      res.status(200).json({ message: 'Semester updated successfully', updatedSemester });
    } catch (e) {
      next(e);
    }
  };

  deleteSemester = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const deletedSemester = await this.facultyAdmin.deleteSemester(id);

      if (!deletedSemester) {
        res.status(404).json({ message: 'Semester not found' });
      }

      res.status(200).json({ message: 'Semester deleted successfully' });
    } catch (e) {
      next(e);
    }
  };

  addStudentToAdvisor = async (req: Request, res: Response): Promise<void> => {
    const { instructorId, studentId } = req.body;
    try {
      await this.facultyAdmin.addStudentAdvisor(instructorId, studentId); // Call service method
      res.status(201).json({ message: 'Student added to advisor successfully' });
    } catch (error) {
      console.error('Error adding student to advisor:', error);
      res.status(500).json({ message: 'Failed to add student to advisor' });
    }
  };

  // Method to remove a student from an advisor
  removeStudentFromAdvisor = async (req: Request, res: Response): Promise<void> => {
    const { instructorId, studentId } = req.params;

    try {
      await this.facultyAdmin.deleteStudentAdvisor(studentId, instructorId); // Call service method
      res.status(200).json({ message: 'Student removed from advisor successfully' });
    } catch (error) {
      console.error('Error removing student from advisor:', error);
      res.status(500).json({ message: 'Failed to remove student from advisor' });
    }
  };

  // Method to update a student-advisor relationship
  updateStudentAdvisor = async (req: Request, res: Response): Promise<void> => {
    const { instructorId, studentId } = req.params;
    const { newInstructorId } = req.body;

    try {
      await this.facultyAdmin.updateStudentAdvisor(instructorId, studentId, newInstructorId); // Call service method
      res.status(200).json({ message: 'Student-advisor relationship updated successfully' });
    } catch (error) {
      console.error('Error updating student-advisor relationship:', error);
      res.status(500).json({ message: 'Failed to update student-advisor relationship' });
    }
  };
}
export default new FacultyAdminController();
