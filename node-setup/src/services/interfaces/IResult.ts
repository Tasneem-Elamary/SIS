import { ResultType } from '../../types';

interface resultRepo {
    uploadResults(results:any): Promise<ResultType[] | undefined[]>
    updateResultbyId(id: string, updatedData: Partial<ResultType>): Promise<ResultType | undefined>

    getStudentResult(studentId: string): Promise<ResultType[] | undefined[]>;

    getStudentCourseResult(studentId: string, courseId: string, semesterId: string): Promise<ResultType | undefined>;
    getStudentSemesterResult(studentId: string, semesterId: string): Promise<ResultType[] | undefined[]>;

    getAllResults(): Promise<ResultType[]| undefined[]>;
    deleteResultById(id: string): Promise<boolean>;
}

export default resultRepo;
