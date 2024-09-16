import axios from 'axios';
import InstructorType from '../interfaces/domain/instructor';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class Instructor {
  addInstructor = (instructor : InstructorType) => axios.post(`http://localhost:5000/instructor/createInstructor`, instructor);
  getAllTAs = () => axios.get(`http://localhost:5000/instructor/getAllTAs`);
  getAllDoctors = () => axios.get(`http://localhost:5000/instructor/getAllDoctors`);
  getAdvisorStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students`);
  getPendingStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/pendingStudents`);
  getselfStudyStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students/selfstudy`);
  getOverLoadStudents = (id:string) => axios.get(`http://localhost:5000/instructor/${id}/students/overload`);

}

export default new Instructor();