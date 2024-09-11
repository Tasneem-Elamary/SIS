import { Dispatch } from 'redux';
import { statusAction, fetchAction } from '.';
import regulationApi from '../../api/regulation.api'; // Ensure you have an API module for regulations

class Regulation {
  viewAllRegulationsAction = () => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, regulations } } = await regulationApi.getAllRegulations(); 
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return regulations;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return [];
    }
  };

  viewRegulationDetailsAction = (regulationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, regulationDetails } } = await regulationApi.getRegulationDetails(regulationId); // Adjust API call if different
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return regulationDetails;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };

  viewRegulationRulesAction = (regulationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, regulationRules } } = await regulationApi.getRegulationRules(regulationId); // Adjust API call if different
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return regulationRules;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };

  viewRegulationCoursesAction = (regulationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(statusAction.clearStatus());
      dispatch(fetchAction.fetchingTime());
      const { data: { message, regulationCourses } } = await regulationApi.getRegulationCourses(regulationId); // Adjust API call if different
      dispatch(statusAction.addSuccessStatus(message));
      dispatch(fetchAction.fetchingFailed());
      return regulationCourses;
    } catch (e) {
      dispatch(fetchAction.fetchingFailed());
      dispatch(statusAction.addErrorStatus(e as Error));
      return null;
    }
  };
}

export default new Regulation();
