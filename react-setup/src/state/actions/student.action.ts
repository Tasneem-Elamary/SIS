import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import { StudentType } from '../../interfaces/domain';
import studentApi from '../../api/student.api';
import scheduleApi from '../../api/schedule.api';
import CourseEnrollmentType from '../../interfaces/domain/courseEnrollment';

class Student {
  private studentId=localStorage.getItem('id')??''
  addStudentAction = (student: StudentType) => async (dispatch: Dispatch) => {
   

    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { msg } } = await studentApi.addStudent(student);
      dispatch(statusAction.addSuccessStatus(msg));
      dispatch(fetchAction.fetchingFailed());
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
    }
  };
  addStudentsAction = (formData: FormData) => async (dispatch: Dispatch) => {
   

    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { msg } } = await studentApi.addStudents(formData);
      dispatch(statusAction.addSuccessStatus(msg));
      dispatch(fetchAction.fetchingFailed());
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
    }
  };
  getAllStudentsAction = () => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAction.clearStatus());
        dispatch(fetchAction.fetchingTime());
        const {data} = await studentApi.getAllStudents();
        //dispatch(statusAction.addSuccessStatus(message));//need to update in back-end to send a message
        dispatch(fetchAction.fetchingFailed());
        return data;
    } catch (e) {
        dispatch(fetchAction.fetchingFailed());
        dispatch(statusAction.addErrorStatus(e as Error));
        return [];
    }
};
getAllowedCoursesAction = (studentId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());
    const { data: {  data,message } } = await studentApi.getAllowedCourses(studentId);
    dispatch(statusAction.addSuccessStatus(message));
    dispatch(fetchAction.fetchingFailed());
    console.log("allowed courses 2",data)
    return data;
  } catch (e: any) {
    console.error('Error fetching allowed courses:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
    return [];
  }
};

getRegisterScheduleAction = (studentId: string) => async (dispatch: Dispatch) => {
  try {
 
    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());

 
    const { data:{message,schedules:schedules} } = await scheduleApi.getStudentSchedulesToRegister(studentId);

  
    console.log('Schedules data:', schedules);
 
    dispatch(fetchAction.fetchingFailed());
    
     
    return schedules || [];

  } catch (e: any) {
    
    console.error('Error fetching schedules:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
        return [];
  }
};
getPendingScheduleAction = (studentId: string) => async (dispatch: Dispatch) => {
  try {
 
    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());

 
    const { data:{message,schedules:schedules} } = await scheduleApi.getStudentPendingSchedules(studentId);

  
    console.log('Schedules data:', schedules);
 
    dispatch(fetchAction.fetchingFailed());
    
     
    return schedules || [];

  } catch (e: any) {
    
    console.error('Error fetching schedules:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
        return [];
  }
};
getStudnetScheduleAction = (studentId: string) => async (dispatch: Dispatch) => {
  try {
 
    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());

 
    const { data:{message,schedules:schedules} } = await scheduleApi.studentSchedule(studentId);

  
    console.log('Schedules data:', schedules);
 
    dispatch(fetchAction.fetchingFailed());
    
     
    return schedules || [];

  } catch (e: any) {
    
    console.error('Error fetching schedules:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
        return [];
  }
};
registerScheduleAction = ( scheduleId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());
 
    const { data: { message } } = await studentApi.registerSchedule({
      StudentId: this.studentId,
      ScheduleId: scheduleId
    });
 
    console.log('Register schedule message:', message);
    dispatch(statusAction.addSuccessStatus(message));
 
    dispatch(fetchAction.fetchingFailed());
    
  } catch (e: any) {
    
    console.error('Error registering schedule:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
  }
};
requestEnrollmentAction = (enrollmentData:CourseEnrollmentType) => async (dispatch: Dispatch) => {
  try {

    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());
    const { data: { message } } = await studentApi.requestEnrollment(enrollmentData);
    console.log('Enrollment request message:', message);
    dispatch(statusAction.addSuccessStatus(message));
    dispatch(fetchAction.fetchingFailed());
  } catch (e: any) {

    console.error('Error requesting enrollment:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
  }
};
requestEnrollmentByStudentCodeAction = (enrollmentData:CourseEnrollmentType) => async (dispatch: Dispatch) => {
  try {

    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());
    const { data: { message } } = await studentApi.requestEnrollmentByStudentCode(enrollmentData);
    console.log('Enrollment request message:', message);
    dispatch(statusAction.addSuccessStatus(message));
    dispatch(fetchAction.fetchingFailed());
  } catch (e: any) {

    console.error('Error requesting enrollment:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
  }
};

registerSchedulesAction = ( studentId:string,scheduleIds: string[]) => async (dispatch: Dispatch) => {
  try {
    dispatch(statusAction.clearStatus());
    dispatch(fetchAction.fetchingTime());
    console.log("Sending scheduleIds2:", scheduleIds);
 
    const { data: { message } } = await studentApi.registerSchedules(
      studentId, 
      scheduleIds
    );
 
    console.log('Register schedule message:', message);
    dispatch(statusAction.addSuccessStatus(message));
 
    dispatch(fetchAction.fetchingFailed());
    
  } catch (e: any) {
    
    console.error('Error registering schedule:', e);
    dispatch(fetchAction.fetchingFailed());
    dispatch(statusAction.addErrorStatus(e as Error));
  }
};
unregisterScheduleAction = (unregisteringData: { StudentId: string; ScheduleId: string }) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());

      const { data: { message } } = await studentApi.unregisterSchedule(unregisteringData);
      
      console.log('Unregister schedule message:', message);
      dispatch(statusAction.addSuccessStatus(message));
  } catch (e) {
      console.error('Error unregistering schedule:', e);
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
  }
};
getFailedOrUnenrolledCoursesAction = (courseId: string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());

      const { data: { success, data } } = await studentApi.getFailedOrUnenrolledCourses(courseId);
console.log("data",data)
      if (success) {
          dispatch(statusAction.addSuccessStatus('Successfully fetched failed or unenrolled courses.'));
          return data; 
      } else {
          dispatch(fetchAction.fetchingFailed());
          dispatch(statusAction.addErrorStatus(new Error('Failed to fetch courses')));
          return [];
      }
  } catch (e) {
      console.error('Error fetching failed or unenrolled courses:', e);
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};

getTopStudentsByGPA = (prefix: string, limit: number) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, students} } = await studentApi.getTopStudentsByGPA(prefix, limit);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return students;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};

getStudentRank = (studentCode: string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, rank} } = await studentApi.getStudentRank(studentCode);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return rank;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
}

export default new Student()
