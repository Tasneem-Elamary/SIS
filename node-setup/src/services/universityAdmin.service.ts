import FacultyAdmin from './facultyAdmin.service';
import { IUniversityAdmin } from './interfaces';
import { UserRepo } from '../persistance/Repositories';
import { UserType } from '../types';

class UniversityAdmin extends FacultyAdmin implements IUniversityAdmin {
  // constructor(private userData:UserRepo) {
  //   super(userData);
  // }

  createFacultyAdmin = async (facultyAdmin:UserType): Promise<void> => {
    // implementation here
  };
}

export default UniversityAdmin;
