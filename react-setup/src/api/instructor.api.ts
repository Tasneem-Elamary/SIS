import axios from 'axios';
import InstructorType from '../interfaces/domain/instructor';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,   },
};
console.log(`mmmmmmmmmm${backendUrl}`)
console.log(localStorage.getItem('role'))
class Instructor {
  addInstructor = (instructor : InstructorType) => axios.post(`http://localhost:5000/instructor`, instructor,config);
  getAllTAs = () => axios.get(`http://localhost:5000/instructor/TAs`,config);
  getAllDoctors = () => axios.get(`http://localhost:5000/instructor/Doctors`,config);
  getAdvisorStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students`,config);
  getselfStudyStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students/selfstudy`,config);
  getOverLoadStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students/overload`,config);
  getDoctorCourses = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/courses`,config);
  approveRegularRequest = (StudentId:string,cell:number) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestAprroved/${cell}`,config);
  rejectRegularRequest = (StudentId:string,cell:number) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestRejected/${cell}`,config);
  approveselfstudyOROverloadRequest = (StudentId:string,courseCode:string,courseType:string) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestAprroved/${courseType}/${courseCode}`,config);
  rejectedselfstudyOROverloadRequest = (StudentId:string,courseCode:string,courseType:string) => axios.patch(`http://localhost:5000/student//${StudentId}/RequestRejected/${courseType}/${courseCode}`,config);
}

export default new Instructor();