type StudentType ={
  id?:number,
  studentCode: string,
  firstName: string,
  lastName: string,
  birthDate: Date,
  gender: 'Male'|'Female',
  profilePhoto?: string,
  phone: string,
  gainedHours: number,
  GPA: number,
  UserId:string,
  DepartmentId:string,
  BylawId:string,
};

export default StudentType;
