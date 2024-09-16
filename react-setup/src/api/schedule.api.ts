import axios from 'axios';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

class Schedule {
  studentSchedule = (studentId: string) => axios.get(`${backendUrl}/schedule/student/${studentId}`);
  instructorSchedule = (instructorId: string) => axios.get(`${backendUrl}/schedule/instructor/${instructorId}`);
  roomSchedule = (roomId: string) => axios.get(`${backendUrl}/schedule/room/${roomId}`);
  allSchedules = () => axios.get(`${backendUrl}/schedule/getAllStudents`);
}

export default new Schedule();
