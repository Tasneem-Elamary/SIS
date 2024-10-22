import axios from 'axios';
import InstructorType from '../interfaces/domain/instructor';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class Instructor {
  addInstructor = (instructor : InstructorType) => axios.post(`http://localhost:5000/instructor`, instructor);
  getAllTAs = () => axios.get(`http://localhost:5000/instructor/TAs`);
  getAllDoctors = () => axios.get(`http://localhost:5000/instructor/Doctors`);
  getAdvisorStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students`);
  getPendingStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/pendingStudents`);
  getselfStudyStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students/selfstudy`);
  getOverLoadStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students/overload`);
  getDoctorCourses = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/courses`);
  approveRegularRequest = (StudentId:string,cell:number) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestAprroved/${cell}`);
  rejectRegularRequest = (StudentId:string,cell:number) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestRejected/${cell}`);
  approveselfstudyOROverloadRequest = (StudentId:string,courseCode:string,courseType:string) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestAprroved/${courseType}/${courseCode}`);
  rejectedselfstudyOROverloadRequest = (StudentId:string,courseCode:string,courseType:string) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestRejected/${courseType}/${courseCode}`);
}

export default new Instructor();