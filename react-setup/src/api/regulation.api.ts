import axios from 'axios';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`Backend URL: ${backendUrl}`);
const token=localStorage.getItem('token')
const config={
  headers:{
    Authorization:`Bearer ${token}`
  }
}

class Regulation {
 
  viewAllRegulations = () => axios.get(`http://localhost:5000/bylaw/`,config);
  viewRegulationDetails = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/${regulationId}`,config);
  viewRegulationRules = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/limits/${regulationId}`,config);
  viewRegulationCourses = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/course/${regulationId}`,config);
}

export default new Regulation();
