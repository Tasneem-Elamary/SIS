import {

  SemesterType,
} from '../../types';

    interface semsterRepo {

        createSemester(semester: SemesterType): Promise<SemesterType | undefined>;
        updateSemester(id: string, updatedData: Partial<SemesterType>): Promise<SemesterType | undefined>;
        getCurrentSemester () : Promise<SemesterType| undefined>;
        deleteSemester(id: string): Promise<boolean>;

      }
export default semsterRepo;
