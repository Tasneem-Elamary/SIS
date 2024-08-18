import {UserType} from "../../types"

interface universityAdminRepo {
    createFacultyAdmin(FacultyAdmin:UserType ): Promise<void>; 
}

export default universityAdminRepo;