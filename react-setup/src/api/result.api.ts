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


class Result {
  getAllResults = () => axios.get(`http://localhost:5000/result`,config);
  getStudentResults = (studentId:string) => axios.get(`http://localhost:5000/result/${studentId}`,config);
  uploadResults = (formData: FormData) =>  axios.post(`http://localhost:5000/result`,formData,config);
  deletResult= (id:string) => axios.delete(`http://localhost:5000/result/${id}`,config);
  deleteResults= (ids:string[]) => axios.delete(`http://localhost:5000/result/delete`,{...config,data:{ids},});
    
}

export default new Result();