import { Dispatch } from 'redux';
import { instructorApi } from '../../api';
import { statusAction, fetchAction } from '.';
import { InstructorType } from '../../interfaces/domain';

class Instructor {
  addInstructorAction = (instructor: InstructorType) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message} } = await instructorApi.addInstructor(instructor);
      // console.log({ data: { message } })
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
    }
  };
  getTAAction = () => async (dispatch: Dispatch) => {
    try {
        dispatch(statusAction.clearStatus());
        dispatch(fetchAction.fetchingTime());
        const { data: { message, instructors } } = await instructorApi.getAllTAs();
        dispatch(statusAction.addSuccessStatus(message));
        dispatch(fetchAction.fetchingFailed());
        return instructors;
    } catch (e) {
        dispatch(fetchAction.fetchingFailed());
        dispatch(statusAction.addErrorStatus(e as Error));
        return [];
    }
};
getDoctorAction = () => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, instructors } } = await instructorApi.getAllDoctors();
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instructors;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
getAdvisorStudentsAction = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, instuctor} } = await instructorApi.getAdvisorStudents(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instuctor;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
getTASystemlogAction = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, audits} } = await instructorApi.getTASystemLog(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return audits;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
getInstructorByIdAction = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message,instructor} } = await instructorApi.getInstructorById(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instructor;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};

getPendingStudentsAction = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, instuctor} } = await instructorApi.getPendingStudents(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instuctor;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
getselfStudyStudentsAction = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, instuctor} } = await instructorApi.getselfStudyStudents(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instuctor;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
getOverloadStudentsAction = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, instuctor} } = await instructorApi.getOverLoadStudents(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instuctor;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
getDoctorCourses = (id:string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, instructor} } = await instructorApi.getDoctorCourses(id);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return instructor;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
approveRegularRequest = (StudentId: string, cell: number) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, student} } = await instructorApi.approveRegularRequest(StudentId,cell);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return student;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
rejectedselfstudyOROverloadRequest = (StudentId: string, courseId: string, courseType: string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, student} } = await instructorApi.rejectedselfstudyOROverloadRequest(StudentId,courseId,courseType);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return student;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
approveselfstudyOROverloadRequest = (StudentId: string, courseId: string, courseType: string) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, student} } = await instructorApi.approveselfstudyOROverloadRequest(StudentId,courseId,courseType);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return student;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
rejectRegularRequest = (StudentId: string, cell: number) => async (dispatch: Dispatch) => {
  try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, student} } = await instructorApi.rejectRegularRequest(StudentId,cell);
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return student;
  } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
  }
};
}

export default new Instructor()
