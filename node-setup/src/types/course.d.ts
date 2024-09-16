type CourseType = {
  id?: string;
  code: string;
  name: string;
  credit_Hours: number;
  level: 1 | 2 | 3 | 4|5;
  min_GPA: number;
  minEarnedHours: number
};

export type CoursewithRegistedStudentsType = {
  Course:CourseType,
 approvedRegularCount:number,
 pendingRegularCount:number

};

export default CourseType;
