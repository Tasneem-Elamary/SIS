import axios from 'axios';
import StudentType from '../interfaces/domain/student';
import vars from '../config/env.config';
import CourseEnrollmentType from '../interfaces/domain/courseEnrollment';

const backendUrl = vars.get('backendUrl');

console.log(`Backend URL: ${backendUrl}`);

const token=localStorage.getItem('token')
const config={
  headers:{
    Authorization:`Bearer ${token}`
  }
}

class Student {
  addStudent = (student: StudentType) => axios.post(`${backendUrl}/student/createStudent`, student);
  addStudents = (formData: FormData) => axios.post(`${backendUrl}/student/uploadCSVStudents`, formData);
  getAllStudents = () => axios.get(`${backendUrl}/student/getAllStudents`);
  deleteStudents = (studentIds:string[]) => axios.delete(`${backendUrl}/student/deleteStudents`,{data:{studentIds}});
  
  getTopStudentsByGPA = (prefix: string, limit: number) => axios.get(`${backendUrl}/student/${prefix}/topStudents/${limit}`);
  getStudentRank = (studentCode: string) => axios.get(`${backendUrl}/student/${studentCode}/rank`);
  requestEnrollmentByStudentCode=(enrollmentData: CourseEnrollmentType) =>axios.post(`${backendUrl}/enrollment/requestByStudentCode`,enrollmentData,config);
  requestEnrollment=(enrollmentData: CourseEnrollmentType) =>axios.post(`${backendUrl} /enrollemnt/request`,enrollmentData);
  
  registerSchedule = (registeringData: { StudentId: string; ScheduleId: string }) => 
    axios.post(`${ backendUrl } /student/registerSchedule`, registeringData);
  registerSchedules = ( studentId:string,scheduleIds: string[] ) => 
   

    axios.post(`${ backendUrl } /student/registerSchedules / ${ studentId } `, {scheduleIds});
  
  unregisterSchedule = (unregisteringData: { StudentId: string; ScheduleId: string }) => 
    axios.post(`${ backendUrl } /student/unregisterSchedule`, unregisteringData); 
   
  getFailedOrUnenrolledCourses = (courseId: string) => 
    axios.get(`${ backendUrl }/student/course/${ courseId }/failed-or-unenrolled`);
  getAllowedCourses = (studentId: string) => 
    axios.get(`${backendUrl}/enrollment/${studentId}/allowed-courses`);

}

export default new Student();
