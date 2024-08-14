/* eslint-disable class-methods-use-this */
import { ERROR_STATUS_ADDED, SUCCESS_STATUS_ADDED, STATUS_CLEARED } from './action.d';
import axios from 'axios';

class Status {
  addErrorStatus = (e: unknown) => {
    if (axios.isAxiosError(e)) {
      const error = e.response?.data as string ;
      return { type: ERROR_STATUS_ADDED, payload: error };
    } else {
      return { type: ERROR_STATUS_ADDED, payload: "An unknown error occurred" };
    }
  };

  addSuccessStatus = (message : string) => ({
    type: SUCCESS_STATUS_ADDED, payload: message,
  });

  clearStatus = () => ({ type: STATUS_CLEARED });
}

export default new Status();
