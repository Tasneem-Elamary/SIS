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
  getAllcourses = () => axios.get(`${backendUrl}/course`,config);
  getcourseBylevel = (level:number) => axios.get(`${backendUrl}/course/level/${level}`,config);
  getcourseDetails = (CourseId:string,bylawId:string) => axios.get(`${backendUrl}/course/${CourseId}/bylaw/${bylawId}`,config);
  getcoursePrerequisite = (CourseId:string) => axios.get(`${backendUrl}/course/${CourseId}/prerequisites`,config);
  getcourseDepentant = (CourseId:string) => axios.get(`${backendUrl}/course/${CourseId}/dependants`,config);
  getCourseMappedToCourse = (CourseId:string) => axios.get(`${backendUrl}/mappedCourses/mappedCourse/${CourseId}`,config);
}

export default new Course();