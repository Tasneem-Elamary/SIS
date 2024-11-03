import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import { scheduleApi } from '../../api';  
class Schedule {
  uploadCsvSchedules = (formData:FormData) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      console.log("HIIIActionsss")
      const response = await scheduleApi.uploadSchedules(formData); 
console.log (response)
        
      if (response) {
        
        dispatch(statusAction.addSuccessStatus(response.data)); 
        dispatch(fetchAction.fetchingFailed());       
        return {response};  
      }
    } catch (e) {
 
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };
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
  getInstructorSchedule = (instructorId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      
      const response = await scheduleApi.instructorSchedule(instructorId); 
            const data = response.data.data;
            console.log('fetching result.',response);

            const {instructorData,schedules} =data
            if (data.schedules.length === 0) {
                console.log('No schedules found for instructor.');
                          } else {
                            console.log("instructor result:",instructorData);
                            console.log("instructor code:",instructorData.code);
                           }
      if (response) {
        console.log('instructor Schedule:', data);
        dispatch(statusAction.addSuccessStatus(data.schedules));   
        dispatch(fetchAction.fetchingFailed());       
        return {schedules,instructorData};  
      }
    } catch (e) {
 
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };
  getCourseSchedule = (courseId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      
      const response = await scheduleApi.courseSchedule(courseId); 
            const data = response.data.data;
            console.log('fetching result.',response);

            const {courseData,schedules} =data
            if (data.schedules.length === 0) {
                console.log('No schedules found for instructor.');
                          } else {
                            console.log("CourseSchedule result:",courseData);
                            console.log("CourseSchedule code:",courseData.code);
                           }
      if (response) {
        console.log('Course Schedules:', data);
        dispatch(statusAction.addSuccessStatus(data.schedules));   
        dispatch(fetchAction.fetchingFailed());       
        return {schedules,courseData};  
      }
    } catch (e) {
 
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };
  getAllSchedules = () => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      
      const response = await scheduleApi.allSchedules(); 
            const data = response.data;
            const {schedules} =data
            if (data.schedules.length === 0) {
                console.log('No schedules');
                          } 
      if (response) {
        console.log('Room Schedule:', data);
        dispatch(statusAction.addSuccessStatus(data.schedules));   
        dispatch(fetchAction.fetchingFailed());       
        return {schedules};  
      }
    } catch (e) {
 
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };
}

export default new Schedule();
