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
}

export default new Instructor()
