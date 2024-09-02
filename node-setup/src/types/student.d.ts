type StudentType ={
  id?:string,
  studentCode: string,
  name: string,
  birthDate?: Date,
  gender?: 'Male'|'Female',
  profilePhoto?: string,
  phone?: string,
  gainedHours?: number,
  GPA?: number,
  UserId?:string|undefined,
  DepartmentId?:string,
  bylawCode?:string|undefined,
  BylawId?:string|undefined,
};

export default StudentType;
