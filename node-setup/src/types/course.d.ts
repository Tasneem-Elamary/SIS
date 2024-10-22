type CourseType = {
  id?: string;
  code: string;
  name: string;
  creditHours: number;
  level: number;
  min_GPA: number;
  minEarnedHours: number
};

export type CoursewithRegistedStudentsType = {
  Course:CourseType,
 approvedRegularCount:number,
 pendingRegularCount:number

};

export default CourseType;
