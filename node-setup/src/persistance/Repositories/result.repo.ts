import { ResultType } from '../../types';

interface ResultRepo {
    bulkCreateResults(results: Partial<ResultType>[]): Promise<ResultType[]|undefined[]>;
    create (results: Partial<ResultType>): Promise<ResultType| undefined>
    getAll(): Promise<ResultType[]| undefined[]>;
    getByStudentId(studentId: string): Promise<ResultType[]|undefined[]>;
    getByCourseId(courseId: string): Promise<ResultType[]|undefined[]>;
    getByStudentIdAndCourseIdAndSemesterId(studentId: string, courseId: string, semesterId: string): Promise<ResultType|undefined>;
    geByStudentIdAndSemesterId(studentId: string, semesterId: string): Promise<ResultType[]|undefined[]>;

    updateResultById(id: string, updates: Partial<ResultType>): Promise<ResultType|undefined>;
    deleteResultById(id: string): Promise<boolean>;
  }

export default ResultRepo;
