import axios from 'axios';
import {CourseType} from '../interfaces/domain';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)
const token=localStorage.getItem('token')
const config={
  headers:{
    Authorization:`Bearer ${token}`
  }
}

class Course {
  addCourse = (course:CourseType) => axios.post(`http://localhost:5000/course`,course,config);
  getAllcourses = () => axios.get(`http://localhost:5000/course`,config);
  getcourseBylevel = (level:number) => axios.get(`http://localhost:5000/course/level/${level}`,config);
  getcourseDetails = (CourseId:string,bylawId:string) => axios.get(`http://localhost:5000/course/${CourseId}/bylaw/${bylawId}`,config);
  getcoursePrerequisite = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/prerequisites`,config);
  getcourseDepentant = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/dependants`,config);
  deletecourseWithBylawAndDpartment = (CourseId:string,bylawId :string,departmentId:string) => axios.delete(`http://localhost:5000/course/${CourseId}/bylaw/${bylawId}/department/${departmentId || ''}`,config);
  getcourseInstrucrors = (CourseId:string) => axios.get(`http://localhost:5000/course/${CourseId}/professors`,config);
}

export default new Course();