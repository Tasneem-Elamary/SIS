import axios from 'axios';
import StudentType from '../interfaces/domain/student';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');


console.log(`mmmmmmmmmm${backendUrl}`)

class Logistic {
  getRrooms = () => axios.get(`http://localhost:5000/room/`);

}

export default new Logistic();