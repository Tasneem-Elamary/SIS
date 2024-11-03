import { LISTING_DATA_FETCHING ,LOGGED_USER} from '../actions/action.d';
import { IAction } from '../../interfaces/domain';

const initState = {
  token: '',
  user:{}
};

const userReducser = (state = initState, action : IAction) => {
  switch (action.type) {
    case LISTING_DATA_FETCHING:
      return { ...state, company: action.payload };
    case LOGGED_USER:
      return { ...state, token: action.payload.token,user:action.payload.user };
    default:
      return state;
  }
};

export default userReducser;
