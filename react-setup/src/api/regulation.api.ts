import axios from 'axios';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`Backend URL: ${backendUrl}`);

class Regulation {
 
  viewAllRegulations = () => axios.get('http://localhost:5000/bylaw/');
  viewRegulationDetails = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/${regulationId}`);
  viewRegulationRules = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/limits/${regulationId}`);
  viewRegulationCourses = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/${regulationId}`);
}

export default new Regulation();
