import { LISTING_DATA_FETCHING } from '../actions/action.d';
import { IAction } from '../../interfaces/domain';

const initState = {
  company: [],
};

const listingDataReducser = (state = initState, action : IAction) => {
  switch (action.type) {
    case LISTING_DATA_FETCHING:
      return { ...state, company: action.payload };
    default:
      return state;
  }
};

export default listingDataReducser;
