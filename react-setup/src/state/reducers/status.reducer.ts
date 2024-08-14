import { ERROR_STATUS_ADDED, SUCCESS_STATUS_ADDED, STATUS_CLEARED } from '../actions/action.d';
import { IAction } from '../../interfaces/domain';

const initState = {
  message: '',
  type: '',
};

const errorReducser = (state = initState, action:IAction) => {
  switch (action.type) {
    case ERROR_STATUS_ADDED:
      return { ...state, message: action.payload, type: 'error' };
    case SUCCESS_STATUS_ADDED:
      return { ...state, message: action.payload, type: 'success' };
    case STATUS_CLEARED:
      return initState;
    default:
      return state;
  }
};

export default errorReducser;
