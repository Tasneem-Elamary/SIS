type InstructorType = {
    id?: number,
    firstName: string,
    lastName: string,
    birthDate?: Date,
    gender: 'Male'|'Female',
    type: 'Professor'|'TA',
    employmentType: 'part time'|'full time',
    profilePhoto?: string,
    phone?: string,
    UserId?:string,
    DepartmentId?:string,
  
  };
  export default InstructorType;
  