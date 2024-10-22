import axios from 'axios';
import {CourseType} from '../interfaces/domain';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class Result {
  getAllResults = () => axios.get(`http://localhost:5000/result`);
  getStudentResults = (studentId:string) => axios.get(`http://localhost:5000/result/${studentId}`);
  uploadResults = (formData: FormData) =>  axios.post(`http://localhost:5000/result`,formData);
    
}

export default new Result();