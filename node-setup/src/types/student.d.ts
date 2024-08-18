type StudentType ={
  studentID?:number,
  studentCode: string,
  firstName: string,
  lastName: string,
  birthDate: Date,
  gender: string,
  profilePhoto?: string,
  phone: string,
  gainedHours: number,
  GPA: number,
  userId:string,
  departmentID:string,
  BylawId:string,
};

export default StudentType;
