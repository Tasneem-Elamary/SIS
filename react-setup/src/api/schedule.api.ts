import axios from 'axios';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`,   },
};
class Schedule {
  uploadSchedules=(formData: FormData)=>axios.post(`${backendUrl}/schedule/uploadCSVSchedule`,formData)
  deleteSchedules=(scheduleIds: string[])=>axios.delete(`${backendUrl}/schedule/deleteSchedules`,{data:{scheduleIds}})
  studentSchedule = (studentId: string) => axios.get(`${backendUrl}/schedule/student/${studentId}`,config);
  getStudentSchedulesToRegister= (studentId: string) => axios.get(`${backendUrl}/schedule/student/register/${studentId}`,config);
  getStudentPendingSchedules= (studentId: string) => axios.get(`${backendUrl}/schedule/student/pending/${studentId}`,config);
  instructorSchedule = (instructorId: string) => axios.get(`${backendUrl}/schedule/instructor/${instructorId}`,config);
  courseSchedule = (courseId: string) => axios.get(`${backendUrl}/schedule/course/${courseId}`,config);
  roomSchedule = (roomId: string) => axios.get(`${backendUrl}/schedule/room/${roomId}`,config);
  allSchedules = () => axios.get(`${backendUrl}/schedule/`,config);
}

export default new Schedule();
 