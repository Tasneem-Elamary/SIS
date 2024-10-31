import axios from 'axios';
import vars from '../config/env.config';
import RegulationType from '../interfaces/regulation';
import RegulationRuleType from '../interfaces/domain/regulationRules';
import GradeType from '../interfaces/domain/regulaionGrade';

const backendUrl = vars.get('backendUrl');

console.log(`Backend URL: ${backendUrl}`);
const role=localStorage.getItem('role')
console.log('role: ',role)
class Regulation {
 
  viewAllRegulations = () => axios.get(`http://localhost:5000/bylaw/`);
  viewRegulationDetails = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/${regulationId}`);
  viewRegulationRules = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/limits/${regulationId}`);
  viewRegulationCourses = (regulationId: string) => axios.get(`http://localhost:5000/bylaw/${regulationId}/courses`);
  addRegulationDetails = (FacultyId:string,regulationDetail:RegulationType) => axios.post(`http://localhost:5000/bylaw//createBylaw`,{...regulationDetail,FacultyId});
  addRegulationLimits = (regulationId: string,limits:RegulationRuleType[]) => axios.post(`http://localhost:5000/bylaw/${regulationId}/limits`,limits);
  addRegulationGrades = (regulationId: string,grades:GradeType[]) => axios.post(`http://localhost:5000/bylaw/${regulationId}/grades`,grades);
}

export default new Regulation();
