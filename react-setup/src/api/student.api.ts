import axios from 'axios';
import StudentType from '../interfaces/domain/student';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');


console.log(`mmmmmmmmmm${backendUrl}`)

class Student {
  addStudent = (student : StudentType) => axios.post(`http://localhost:5000/student/createStudent`, student);
  addStudents = (formData: FormData) => axios.post(`http://localhost:5000/student/uploadCSVStudents`, formData);
  getAllStudents = () => axios.get(`http://localhost:5000/student/getAllStudents`);
}

export default new Student();