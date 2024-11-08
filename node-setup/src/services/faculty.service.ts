import User from './user.service';
import { Ifaculty } from './interfaces';
import { FacultyRepo } from '../persistance/Repositories';
import {
  FacultyType,
} from '../types';

class Faculty implements Ifaculty {
  constructor(private facultyData: FacultyRepo) {
  }

  createFaculty = async (faculty: FacultyType): Promise<FacultyType | undefined> => {
    try {
      const newFaculty = await this.facultyData.create(faculty);
      if (!newFaculty) {
        throw new Error('Failed to create faculty.');
      }

      return newFaculty;
    } catch {
      throw new Error('Failed to create faculty.');
    }
  };

  // Method to get a faculty by ID
  getFacultyById = async (id: string): Promise<FacultyType | undefined> => {
    try {
      const faculty = await this.facultyData.getById(id);

      return faculty;
    } catch {
      throw new Error('Failed to get the faculty.');
    }
  };

  // Method to get a faculty by code
  getFacultyByCode = async (code: string): Promise<FacultyType | undefined> => {
    try {
      const faculty = await this.facultyData.getByFacultyCode(code);

      return faculty;
    } catch {
      throw new Error('Failed to get the faculty by code.');
    }
  };

  // Method to get all faculties
  getAllFaculties = async (): Promise<FacultyType[] | undefined[]> => {
    try {
      const faculties = await this.facultyData.getAll();

      return faculties;
    } catch {
      throw new Error('Failed to get all faculties.');
    }
  };

  // Method to update a faculty
  updateFaculty = async (id: string, updatedData: Partial<FacultyType>): Promise<FacultyType | undefined> => {
    try {
      const updatedFaculty = await this.facultyData.update(id, updatedData);

      return updatedFaculty;
    } catch {
      throw new Error('Failed to update the faculty.');
    }
  };

  // Method to delete a faculty
  deleteFaculty = async (id: string): Promise<boolean> => {
    try {
      const facultyDeleted = await this.facultyData.delete(id);

      if (!facultyDeleted) {
        throw new Error('Failed to delete the faculty.');
      }

      return true;
    } catch {
      throw new Error('Failed to delete the faculty.');
    }
  };
}

export default Faculty;
