/* eslint-disable class-methods-use-this */
import axios from 'axios';
import IUser from '../interfaces/domain/user';
import vars from '../config/env.config';

const backendUrl = vars.get('backendUrl');

console.log(`mmmmmmmmmm${backendUrl}`)

class User {
  addUser = (user : IUser) => axios.post(`http://localhost:5000/user/addUser`, user);
}

export default new User();
