import axios from 'axios';
import InstructorType from '../interfaces/domain/instructor';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class Instructor {
  addInstructor = (instructor : InstructorType) => axios.post(`http://localhost:5000/facultyAdmin/createInstructor`, instructor);
  getAllTAs = () => axios.get(`http://localhost:5000/facultyAdmin/getAllTAs`);
  getAllDoctors = () => axios.get(`http://localhost:5000/facultyAdmin/getAllDoctors`);

}

export default new Instructor();