import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import {logisticsApi} from '../../api'; 

class Logistics {
  
  getAllRoomsAction = () => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      
      
      const response= await logisticsApi.getRrooms();
      const data  = response.data;
      
      if(response)
      console.log(data)
      dispatch(statusAction.addSuccessStatus(data));
      dispatch(fetchAction.fetchingFailed()); 
      return data;
    } catch (e) {
      // Dispatch fetch failed and error status
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      
      return [];
    }
  };

//   // Add room 
//   addRoomAction = (roomData: any) => async (dispatch: Dispatch) => {
//     try {
//       dispatch(statusAction.clearStatus());
//       dispatch(fetchAction.fetchingTime());
      
//       // Assuming there's an API call in Logistic for adding a room
//       const { data: { message } } = await logisticsApi.addRoom(roomData);
      
//       dispatch(statusAction.addSuccessStatus(message));
//       dispatch(fetchAction.fetchingFailed()); // Adjust this as needed
//     } catch (e) {
//       dispatch(fetchAction.fetchingFailed());
//       dispatch(statusAction.addErrorStatus(e as Error));
//     }
//   };
}

export default new Logistics();
