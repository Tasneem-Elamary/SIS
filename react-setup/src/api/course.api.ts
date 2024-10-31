import axios from 'axios';
import {CourseType} from '../interfaces/domain';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,   },
};
console.log(`mmmmmmmmmm${backendUrl}`)

class Course {
  getAllcourses = () => axios.get(`http://localhost:5000/course`,config);
  getcourseBylevel = (level:number) => axios.get(`http://localhost:5000/course/level/${level}`,config);
  getcourseDetails = (CourseId:string,bylawId:string) => axios.get(`http://localhost:5000/course/${CourseId}/bylaw/${bylawId}`,config);
  getcoursePrerequisite = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/prerequisites`,config);
  getcourseDepentant = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/dependants`,config);
}

export default new Course();