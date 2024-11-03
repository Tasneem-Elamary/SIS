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
            console.log("courses",courses)
            return courses;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    getCourseByLevelAction = (level:number) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, courses } } = await courseApi.getcourseBylevel(level);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return courses;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    getcourseDetailsAction = (CourseId:string,bylawId:string) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, course } } = await courseApi.getcourseDetails(CourseId,bylawId);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return course;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    getcoursePrerequisitieAction = (CourseId:string) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, course } } = await courseApi.getcoursePrerequisite(CourseId);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return course;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    getcourseDependantAction = (CourseId:string) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, course } } = await courseApi.getcourseDepentant(CourseId);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return course;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    getCourseMappedToCourse = (CourseId:string) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, data:{Mapped} } } = await courseApi.getCourseMappedToCourse(CourseId);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return Mapped;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
}

export default new Course()
