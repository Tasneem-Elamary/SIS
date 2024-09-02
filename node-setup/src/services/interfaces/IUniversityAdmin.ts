import { UserType } from '../../types';

interface universityAdminRepo {
    createFacultyAdmin(FacultyAdmin:UserType): Promise<UserType | undefined>;
}

export default universityAdminRepo;
