import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import { StudentType } from '../../interfaces/domain';
import studentApi from '../../api/student.api';

class Student {
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
        const { data: { message, instructors } } = await studentApi.getAllStudents();
        dispatch(statusAction.addSuccessStatus(message));
        dispatch(fetchAction.fetchingFailed());
        return instructors;
    } catch (e) {
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
