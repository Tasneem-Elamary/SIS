import { Dispatch } from 'redux';
import { courseApi } from '../../api';
import { statusAction, fetchAction } from '.';
import { InstructorType } from '../../interfaces/domain';

class Course {
    getCourseAction = () => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, courses } } = await courseApi.getAllcourses();
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return courses;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
}

export default new Course()
