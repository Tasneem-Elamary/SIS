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
}

export default new Instructor()
