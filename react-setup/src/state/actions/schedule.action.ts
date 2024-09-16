import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import { scheduleApi } from '../../api';  
class Schedule {
   
  getRoomSchedule = (roomId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      
      const response = await scheduleApi.roomSchedule(roomId); 
            const data = response.data;
            const {schedules,roomData} =data
            if (data.schedules.length === 0) {
                console.log('No schedules found for this room.');
                          } else {
                            console.log("room result:",roomData);
                            console.log("room code:",roomData.code);
                           }
      if (response) {
        console.log('Room Schedule:', data);
        dispatch(statusAction.addSuccessStatus(data.schedules));   
        dispatch(fetchAction.fetchingFailed());       
        return {schedules,roomData};  
      }
    } catch (e) {
 
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };
}

export default new Schedule();
