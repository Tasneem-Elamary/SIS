import axios from 'axios';
import vars from '../config/env.config';
import RegulationType from '../interfaces/regulation';
import RegulationRuleType from '../interfaces/domain/regulationRules';
import GradeType from '../interfaces/domain/regulaionGrade';

const backendUrl = vars.get('backendUrl');

console.log(`Backend URL: ${backendUrl}`);
const role=localStorage.getItem('role')
console.log('role: ',role)
const token=localStorage.getItem('token')
const config={
  headers:{
    Authorization:`Bearer ${token}`
  }
}
class Regulation {
 
  viewAllRegulations = () => axios.get(`${backendUrl}/bylaw/`,config);
  viewRegulationDetails = (regulationId: string) => axios.get(`${backendUrl}/bylaw/${regulationId}`,config);
  viewRegulationRules = (regulationId: string) => axios.get(`${backendUrl}/bylaw/limits/${regulationId}`,config);
  viewRegulationCourses = (regulationId: string) => axios.get(`${backendUrl}/bylaw/${regulationId}/courses`,config);
  viewRegulationStudents = (regulationId: string) => axios.get(`${backendUrl}/student/BylawStudents/${regulationId}`,config);
  addRegulationDetails = (FacultyId:string,regulationDetail:RegulationType) => axios.post(`${backendUrl}/bylaw//createBylaw`,{...regulationDetail,FacultyId},config);
  addRegulationLimits = (regulationId: string,limits:RegulationRuleType[]) => axios.post(`${backendUrl}/bylaw/${regulationId}/limits`,limits,config);
  addRegulationGrades = (regulationId: string,grades:GradeType[]) => axios.post(`${backendUrl}/bylaw/${regulationId}/grades`,grades,config);
}

export default new Regulation();
