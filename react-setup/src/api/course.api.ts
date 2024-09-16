import axios from 'axios';
import {CourseType} from '../interfaces/domain';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class Course {
  getAllcourses = () => axios.get(`http://localhost:5000/course`);
  getcourseBylevel = (level:number) => axios.get(`http://localhost:5000/course/level/${level}`);
  getcourseDetails = (CourseId:string,bylawId:string) => axios.get(`http://localhost:5000/course/${CourseId}/bylaw/${bylawId}`);
  getcoursePrerequisite = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/prerequisites`);
  getcourseDepentant = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/dependants`);
}

export default new Course();