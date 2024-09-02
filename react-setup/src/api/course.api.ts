import axios from 'axios';
import {CourseType} from '../interfaces/domain';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class Course {
  getAllcourses = () => axios.get(`http://localhost:5000/course`);
}

export default new Course();