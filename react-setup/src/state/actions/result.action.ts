import { Dispatch } from 'redux';
import { courseApi } from '../../api';
import { statusAction, fetchAction } from '.';
import { InstructorType } from '../../interfaces/domain';
import resultApi from '../../api/result.api';

class Result {
    getAllResultsAction = () => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, results } } = await resultApi.getAllResults();
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return results;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    getStudentResultsAction = (studentId:string) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message, results } } = await resultApi.getStudentResults(studentId);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return results;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
    deleteResultsAction = (Id:string) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            const { data: { message } } = await resultApi.deletResult(Id);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
   

    uploadResults = (formdata:FormData) => async (dispatch: Dispatch) => {
        try {
            dispatch(statusAction.clearStatus());
            dispatch(fetchAction.fetchingTime());
            console.log(formdata)
            const { data: { message, results } } = await resultApi.uploadResults(formdata);
            dispatch(statusAction.addSuccessStatus(message));
            dispatch(fetchAction.fetchingFailed());
            return results;
        } catch (e) {
            dispatch(fetchAction.fetchingFailed());
            dispatch(statusAction.addErrorStatus(e as Error));
            return [];
        }
    };
   
}

export default new Result()
