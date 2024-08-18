type InstructorType = {
  id?: number,
  firstName: string,
  lastName: string,
  birthDate: Date,
  gender: 'Male'|'Female',
  type: 'Professor'|'TA',
  employmentType: string,
  profilePhoto?: string,
  phone: string,
  userId:string,
  departmentId:string,

};
export default InstructorType;
